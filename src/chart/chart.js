//引入事件对象
import {Event} from './event'

//引入舞台对象
import Stage from './stage'

//引入常量名
import {
	EVENT_MOUSE_DOWN
} from '../constants'


export class Chart {

    constructor (container) {

		//DOM容器
		this.container = container

		//舞台
        this.stage = this.createStage(container)

		//配置选项
		this.option = null
    }

	/*!
	 * [createStage 创建场景]
	 */
    createStage (container) {
        return new Stage(container)
    }

	/*!
	 * [setOption 配置信息]
	 */
	setOption (option) {
		this.option = option
	}
}
