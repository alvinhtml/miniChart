import {Chart} from './chart/chart'



export default class miniChart {

    constructor (container) {
        //版本
        this.version = '1.0'


        this.chart = new Chart(container)
    }



    setOption () {
        
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
    static init (container) {
        return new miniChart(container);
    }
}
