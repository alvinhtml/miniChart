//引入工具函数
import {lighten, darken} from '../tools/tool'

//引入事件对象
import Event2d from './event'

//引入工具函数
import {Pie} from './shape'


//图表默认配置信息

const colors = [
	'#fa5a64',
	'#1bbc9b',
	'#f48804',
	'#eb41a0',
	'#f1c40f',
	'#c3d72d',
	'#32c5d2',
	'#50d2fa',
	'#c87846',
	'#6e37e6',
	'#8c50c8',
]

// NOTE: chart 对象类似导演，通过舞台布置场景



class Chart {

	constructor (option) {

		//图表配置数据
		this.option = option

		this.stage2d = null

		this.type = option.type

		//图例
		this.legend = ''

		//图形列表
		this.shapeList = []

		//事件列表
		this.eventList = []

		//需要复原的动画
		this.recoverAnimateList = []

    }

	init (stage2d) {
		//将图表绑定到场景实例
		this.stage2d = stage2d

		//创建一个背景场景对象，用于绘制坐标轴，图例等只需绘制一次的内容
		this.backdropScene = stage2d.createScene("backdrop")

		//创建一个前景场景对象，用于绘制饼图
		this.foregroundScene = stage2d.createScene("foreground")


		this.setPie()
	}

	//添加一个等待复原的动画
	addRecoverAnimate (shape, option) {
		this.recoverAnimateList.push({
			shape,
			option
		})
	}

	//复原的动画
	recoverAnimate (shape, option) {
		this.recoverAnimateList.forEach((v) => {
			v.shape.animate(v.option)
		})
	}




	//绑定事件
    addEventListener (event, callback) {
        this.eventList.push(new Event2d(event, callback))
    }

}




export class ChartPie extends Chart {

	constructor (option) {
		super(option)
    }



	setPie () {

		const option = this.option

		const stage2d = this.stage2d

		//计算半径
		let radius = Math.min(stage2d.width, stage2d.height) / 2 * parseInt(option.radius.slice(0, -1)) / 100

		//计算饼的圆心坐标
		let centerX = stage2d.width * parseInt(option.center[0].slice(0, -1)) / 100
		let centerY = stage2d.height * parseInt(option.center[1].slice(0, -1)) / 100

		//计算饼图百分比
		if (Array.isArray(option.data) && option.data.length > 0) {

			const list = option.data

			//总计
			let total = 0

			for (let v of list) {
				total += v.value
			}


			let sAngle = -Math.PI / 2,
				eAngle = -Math.PI / 2

			let shapeList = list.map((v, i) => {

				//创建一个饼形图
				let shape = new Pie()

				//设置饼形图属性
				shape.stage2d = this.stage2d
				shape.chart2d = this
				shape.x = centerX
				shape.y = centerY
				shape.originalX = centerX
				shape.originalY = centerY
				shape.pattern = colors[i]
				shape.mouseOverPattern = lighten(colors[i])
		        shape.name = v.name
		        shape.value = v.value
		        shape.radius = radius
				shape.precent = Math.round(v.value / total * 100)

				eAngle += shape.precent / 50 * Math.PI

		        shape.sAngle = sAngle
		        shape.eAngle = sAngle

				sAngle = eAngle

				//执行一个动画
				shape.animate({
					eAngle
				})

				return shape
			})

			this.shapeList = shapeList
		}


	}

	//前景绘制（图表）
	foregroundPaint (scene) {
		this.foregroundScene.paint((context) => {

			//设置绘制时 canvas 默认属性
			context.strokeStyle = "#ffffff"
	        context.lineJoin = "bevel"
	        context.miterLimit = 1
	        context.textAlign = "center"
	        context.textBaseline = "middle"
	        context.font = "12px sans-serif"
			context.fillStyle = "#ffffff"

			//遍历并绘制
			this.shapeList.forEach((shape) => {
				shape.paint(context)
			})

		})
	}

	//背景绘制 （坐标轴，图例等）
    backdropPaint (scene) {

    }

}
