//引入渲染优化方法
import Render from './render'

//引入场景对象
import Scene from './scene'

//引入图表对象
import Chart from './chart'

//引入事件对象
import {Event} from './event'

//引入常量名
import {
	EVENT_MOUSE_DOWN
} from '../constants'

let lastIDOMHighResTimeStamp = 0;

//引入工具函数
import {offsetTop, offsetLeft} from '../tools/tool.js'

//last iDOMHighResTimeStamp
let lastTimestamp = 0;

//舞台
export default class Stage {

    constructor (container) {

        //容器, canvas 元素的 parent
        this.container = container

        this.container.style.position = 'relative'

        //前景容器
        //this.foregroundList = []

        //背景容器
        //this.backdropList = []

        //图表容器
        this.chartList = []

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

        this.pixelRatio = pixelRatio

        console.log("windowRatio", this.ratio)

        //鼠标X
    	this.mouseX = 0

    	//鼠标Y
    	this.mouseY = 0

        //鼠标X
    	this.mouseClickX = 0

    	//鼠标Y
    	this.mouseClickY = 0

    	//鼠标相对于页面X
    	this.pageX = 0

    	//鼠标相对于页面Y
    	this.pageY = 0

        //当前帧距离上一帧的时间间隔
        this.interval = 0

        //等待播放动画元素的个数
        this.animaterNumber = 0

        //添加事件监听
		document.addEventListener("mouseup", function(e) {
			//coreStage2d.stageMouseUp(e)
		}, false)

		container.addEventListener("mousedown", function(e) {
			//coreStage2d.stageMouseDown(e)
		}, false)

		container.addEventListener("mousemove", (e) => {
        	this.pageX = e.pageX
        	this.pageY = e.pageY
            this.mouseX = (e.pageX - this.offset.left) * this.pixelRatio
            this.mouseY = (e.pageY - this.offset.top) * this.pixelRatio
		}, false)

        //缩放事件
        container.addEventListener("DOMMouseScroll", (e) => {
            //缩放，暂时禁用
            //this.stageScroll(e)
		}, false)
        //兼容FF
		container.onmousewheel = (e) => {
            //缩放，暂时禁用
            //this.stageScroll(e)
		}

    }

    //创建一个场景
    createScene (type) {
        //初始化一个场景，并绑定当前舞台
        let scener = Scene.init(this)

        return scener
    }

    //添加一个图表
    addChart (chart) {
        chart.init(this)
        this.chartList.push(chart)
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


    //背景绘制
    backdropPaint () {
        this.chartList.forEach((scener) => {

        })
    }


    //前景绘制
    foregroundPaint () {


        this.chartList.forEach((chart) => {
            chart.foregroundPaint()
        })


        //此处计算 this.interval


        //DOMHighResTimeStamp 是一个double类型，用于存储时间值。该值可以是离散的时间点或两个离散时间点之间的时间差，单位为毫秒
        Render((iDOMHighResTimeStamp) => {
            //计算每次绘制的时间间隔
            this.interval = iDOMHighResTimeStamp - lastTimestamp
            lastTimestamp = iDOMHighResTimeStamp
            this.foregroundPaint()
        })
    }

    //开始绘制
    startPaint () {

        Render((iDOMHighResTimeStamp) => {

            //计算每次绘制的时间间隔
            this.interval = iDOMHighResTimeStamp - lastTimestamp
            lastTimestamp = iDOMHighResTimeStamp

            //背景只绘制一次
            this.backdropPaint()

            //前景一般需要重复绘制
            this.foregroundPaint()
        })
    }
}
