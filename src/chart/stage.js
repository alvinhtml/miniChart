//舞台
export class Stage {
    constructor (element) {

        //容器
        this.container = element

        //图表数据
        this.option = undefined;
    }

    setOption() {
        console.log(this.option)
    }
}
