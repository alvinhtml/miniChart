//引入
import Render from './render'

import Scene from './scene'

import {offsetTop, offsetLeft} from '../tools/tool.js'

//舞台
export default class Stage {

    constructor (container) {

        //容器
        this.container = container

        //场景
        this.sceneList = []

        //舞台上的影片剪辑
        this.movieclipList = []



        //舞台的宽和高，既是容器的宽和高，实际也是canvas的宽和高
		this.width = container.clientWidth
		this.height = container.clientHeight


		//获取舞台相对于当前视窗的偏移，实际上也是canvas相对于当前视窗的偏移
        this.offset = {
			top: offsetTop(container),
			left: offsetLeft(container)
		}

        //侦听器容器
		this.eventlist = []

		//当前舞台的缩放
		this.scale = 1

        //当前舞台的偏移
		this.translateX = 0
		this.translateY = 0

        //创建并添加一个场景到当前舞台
        this.addScene(this.createScene())


        //缩放事件
        container.addEventListener("DOMMouseScroll", (e) => {
            this.stageScroll(e)
		}, false)
        //兼容FF
		container.onmousewheel = (e) => {
            this.stageScroll(e)
		}

        console.log("this.sceneList", this.sceneList);

        //渲染绘制图表
        Render(() => {
            this.paintScene()
        })
    }

    createScene () {
        return Scene.init(this.container, this.width, this.height)
    }

    addScene (scene) {
        this.sceneList.push(scene)
    }

    stageScroll (e) {

        //判定鼠标指针在画布内
		if (
            Math.abs(e.pageX) > this.offset.left
            && Math.abs(e.pageX) < this.offset.left + this.width
            && Math.abs(e.pageY) > this.offset.top
            && Math.abs(e.pageY) < this.offset.top + this.height

        ) {
            //阻止冒泡
            e.preventDefault()

			//计算出缩放前的鼠标在场景中的 X、Y
			var beforeX = ((e.pageX - this.offset.left) - this.translateX) / this.scale,
				beforeY = ((e.pageY - this.offset.top) - this.translateY) / this.scale


			if (e.detail > 0 || e.wheelDelta < 0) {
				if (this.scale > 0.2) this.scale -= .1
			} else {
				if (this.scale < 4) this.scale += .1
			}

            this.translateX = -beforeX * this.scale + (e.pageX - this.offset.left)
			this.translateY = -beforeY * this.scale + (e.pageY - this.offset.top)
		}

        console.log(this.scale);

	}



    paintScene () {

        for (let i = 0, len = this.sceneList.length; i < len; i++) {
            // console.log("this.sceneList[" + i + "]", this.sceneList[i])
            this.paint(this.sceneList[i].context)
        }

        Render(() => {
            this.paintScene()
        })
    }


    //重绘核心
    paint(context) {

        //清理画面
		context.clearRect(0, 0, this.width, this.height)

		//重置画布的透明度
		context.globalAlpha = 1

		context.save()

        //重新设定画布偏移和缩放
		context.translate(this.translateX, this.translateY)

        // console.log("this.scale", this.scale);
		context.scale(this.scale, this.scale)



        context.beginPath();
        context.arc(100,75,50,0,2*Math.PI);
        context.stroke();

        context.restore();

    }
}
