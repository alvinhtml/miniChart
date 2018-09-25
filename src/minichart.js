import {Chart} from './chart/chart'

//引入事件对象
import {addEvent} from './chart/event'

//引入常量名
import {
	EVENT_MOUSE_DOWN
} from './constants'



export default class miniChart {

    constructor () {
        //版本
        this.version = '1.0'
    }

    /*!
     * [init 初始化图表]
     * @return {[Object]} [图表句柄]
     */
    /*!
     * [init description]
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    init (element) {
        console.log(f, Chart)
        return new chart(element);
    }
}
