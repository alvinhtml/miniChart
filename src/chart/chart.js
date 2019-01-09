//引入工具函数
import {lighten, darken} from '../tools/tool'

//引入事件对象
import Event2d from './event'

//引入工具函数
import {Pie} from './shape'


//图表默认配置信息

// const colors = [
// 	'#fa5a64',
// 	'#1bbc9b',
// 	'#f48804',
// 	'#eb41a0',
// 	'#f1c40f',
// 	'#c3d72d',
// 	'#32c5d2',
// 	'#50d2fa',
// 	'#c87846',
// 	'#6e37e6',
// 	'#8c50c8',
// ]

// NOTE: chart 对象类似导演，通过舞台布置场景



class Chart {

	constructor (option) {

		//图表配置数据
		this.option = option

		this.stage2d = null

		this.type = option.type

		//图例
		this.legendList = []

		//图形列表
		this.shapeList = []

		//事件列表
		this.eventList = []

		//需要复原的动画
		this.recoverAnimateList = []

		//默认样式配置信息
		this.style = {
	        colors: ['#f2711c', '#fbbd08', '#b5cc18', '#21ba45', '#00b5ad', '#2185d0', '#6435c9', '#a333c8', '#e03997', '#a5673f'],
	        font: '12px sans-serif'
	    }

    }

	init (stage2d) {
		//将图表绑定到场景实例
		this.stage2d = stage2d

		//创建一个背景场景对象，用于绘制坐标轴，图例等只需绘制一次的内容
		this.backdropScene = stage2d.createScene()

		//创建一个前景场景对象，用于绘制饼图
		this.foregroundScene = stage2d.createScene()



		this.initOptions()
	}

	//


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

	//初始化图例信息
	initLegend () {
		let legendSection = []
		let offsetLeft = 0
		this.option.legend.forEach((v, i) => {

			let width = parseInt(this.foregroundScene.context.measureText(v).width) + 26
			if (offsetLeft + width > this.stage2d.width) {
				this.legendList.push(Array.from(legendSection))
				legendSection = []
				offsetLeft = 0
			}

			legendSection.push({
				name: v,
				width: width,
				height: 24,
				disable: 0,
				pattern: this.style.colors[i],
				offsetLeft
			})

			offsetLeft += width
		})

		if (legendSection.length > 0) this.legendList.push(Array.from(legendSection))

	}

	//图例
	paintLegend (context) {
		this.legendList.forEach((legendScetion, j) => {
			let lastLegend = legendScetion[legendScetion.length-1]
			let totalWidth = lastLegend.width + lastLegend.offsetLeft

			context.save()
			context.textAlign = 'left'
			context.lineWidth = 2
			context.fillStyle = "#000000"


			context.translate(Math.floor((this.stage2d.width - totalWidth + 16) / 2), 20 + 20*j )

			legendScetion.forEach((legend, i) => {
				context.save()
				context.strokeStyle = legend.pattern
		        context.beginPath()
				context.arc(legend.offsetLeft, 0, 5, 0, Math.PI * 2)

				if (context.isPointInPath(this.stage2d.mouseX, this.stage2d.mouseY)) {
					context.arc(legend.offsetLeft, 0, 6, 0, Math.PI * 2)
		        }

				context.closePath()

		        context.stroke()
				context.fillText(legend.name, legend.offsetLeft + 10, 0)
		        context.restore()
			})

			context.restore()

		})
	}




	//绑定事件
    addEventListener (event, callback) {
        this.eventList.push(new Event2d(event, callback))
    }

	//判断是否为数字
	isNumber (value) {
		return typeof value === 'number' ? true : false
	}

	//百分比转数字
	precentToFloat (value) {
		return value.slice(0, -1) / 100
	}

}




export class ChartPie extends Chart {

	constructor (option) {
		super(option)
    }



	initOptions () {

		const option = this.option

		const stage2d = this.stage2d

		//计算半径
		if (typeof option.radius === 'undefined') {
			option.radius = parseInt(Math.min(stage2d.width, stage2d.height) / 2 * 0.8)
		} else {
			if (!this.isNumber(option.radius)) {
				option.radius = parseInt(Math.min(stage2d.width, stage2d.height) / 2 * this.precentToFloat(option.radius))
			}
		}


		//计算饼的圆心坐标
		if (typeof option.center === 'undefined') {
			option.center = [parseInt(stage2d.width / 2), parseInt(stage2d.height / 2)]
		} else {
			if (!this.isNumber(option.center[0])) {
				option.center[0] = parseInt(stage2d.width * this.precentToFloat(option.center[0]))
			}
			if (!this.isNumber(option.center[1])) {
				option.center[1] = parseInt(stage2d.height * this.precentToFloat(option.center[1]))
			}
		}




		//初始化前景画布配置
		let context = this.foregroundScene.context
		context.strokeStyle = "#ffffff"
		context.lineJoin = "bevel"
		context.miterLimit = 1
		context.textAlign = "center"
		context.textBaseline = "middle"
		context.font = this.style.font
		context.fillStyle = "#ffffff"





		//图例宽和高，横排时计算宽，竖排时计算高
		this.legendWidth = 0
		this.legendHeight = 0

		//如果没有图例，将值做为图例
		if (typeof option.legend === 'undefined') {
			option.legend = option.data
		}

		//图例绘制所需数据
		this.initLegend()


		//创建饼图
		this.shapeList = []

		for (let i in option.data) {

			//创建一个饼形图
			let shape = new Pie()

			//设置饼形图属性
			shape.stage2d = this.stage2d
			shape.chart2d = this
			shape.x = option.center[0]
			shape.y = option.center[1]
			shape.originalX = option.center[0]
			shape.originalY = option.center[1]
			shape.pattern = this.style.colors[i]
			shape.mouseOverPattern = lighten(this.style.colors[i])
			shape.name = option.legend[i]
			shape.value = option.data[i]
			shape.radius = option.radius
			this.shapeList.push(shape)
		}

		this.setPie()
	}

	//计算饼形状绘制信息
	setPie () {

		//总计
		let total = 0

		this.shapeList.forEach((shape) => {
			if (shape.visible) {
				total += shape.value
			}
		})


		let sAngle = -Math.PI / 2,
			eAngle = -Math.PI / 2

		//计算起始和结束弧度
		this.shapeList.forEach((shape) => {
			//算出百分比
			shape.precent = Math.round(shape.value / total * 100)

			eAngle += shape.precent / 50 * Math.PI

			//先将结束弧度设为起始弧度，然后通过执行动画过度到结束弧度
			shape.sAngle = sAngle
			shape.eAngle = sAngle

			sAngle = eAngle

			//执行一个动画
			shape.animate({
				eAngle
			})
		})
	}

	//前景绘制（图表）
	foregroundPaint (scene) {
		this.foregroundScene.paint((context) => {

			//遍历并绘制
			this.shapeList.forEach((shape) => {
				shape.paint(context)
			})

			this.paintLegend(context)

		})
	}

	//背景绘制 （坐标轴，图例等）
    backdropPaint (scene) {
		this.backdropScene.paint((context) => {

		})
    }

}
