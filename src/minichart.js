import Stage from './chart/stage'

import {ChartPie, Chart} from './chart/chart'



export default class miniChart {

    constructor (container) {
        //版本
        this.version = '1.0'

        this.container = container

    }



    setOption (option) {

        let stage2d = new Stage(this.container)

        //创建一个饼状图图表，传入配置信息
        let chartPie2d = new ChartPie(option)


        stage2d.addChart(chartPie2d)

        stage2d.startPaint()

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
