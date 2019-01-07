//引入工具函数
import {lighten, darken} from '../tools/tool.js'

//引入渲染优化方法
import Render from './render'

//引入工具函数
import {Pie} from './shape.js'


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





//
// NOTE: chart 对象类似导演，通过舞台布置场景

export class ChartPie {
	constructor (option) {

		this.option = option

		this.stage2d = null

		this.type = option.type

		//图例
		this.legend = ''

		//图形列表
		this.shapeList = []

		this.option = option

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


			let sAngle = 0,
				eAngle   = 0

			let shapeList = list.map((v, i) => {



				let shape = new Pie()

				// 饼形图
				shape.stage2d = this.stage2d
				shape.x = centerX
				shape.y = centerY
				shape.pattern = colors[i]
				shape.mouseOverPattern = lighten(colors[i])
		        shape.name = v.name
		        shape.value = v.value
		        shape.radius = radius
				shape.precent = v.value / total * 100

				eAngle += shape.precent / 50 * Math.PI

		        shape.sAngle = sAngle
		        shape.eAngle = sAngle

				sAngle = eAngle

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
			this.shapeList.forEach((shape) => {
				shape.paint(context)
			})
		})

	}

	//背景绘制 （坐标轴，图例等）
    backdropPaint (scene) {

    }

}
