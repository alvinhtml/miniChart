import chart from './chart/chart'

export class miniChart {

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
        return new chart(element);
    }
}
