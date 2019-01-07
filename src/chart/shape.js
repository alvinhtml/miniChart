import Render from './render'

//饼状图
export class Pie {
    constructor () {

        //类型
        this.type = 'pie'

        //形状的X坐标
        this.x = 0

        //形状的Y坐标
        this.y = 0

        //填充颜色或图案
        this.pattern = '#ffffff'

        //填充颜色或图案 mouseover
        this.mouseOverPattern = '#ffffff'

        //名称
        this.name = ''

        //值
        this.value = 0

        //半径
        this.radius = 0

        //百分比
        this.precent = 0

        //起始角，以弧度计
        this.sAngle = 0

        //结束角，以弧度计
        this.eAngle = 0

        //动画更新开关
        this.animationSwitch = false

        //动画变化量
        //changeValue = {}

        //动画时间轴
        //this.time = 0

    }

    //配置过渡动画
    animate (option, speed = 400) {

        //属性原始值
        let originalValues = {}

        //属性变化量
        let changeValues = {}

        for (let key in option) {
            if (key === 'eAngle') {
                originalValues[key] = this[key] * 100
                changeValues[key] = option[key] * 100 - originalValues[key]
            } else {
                originalValues[key] = this[key]
                changeValues[key] = option[key] - this[key]
            }
        }

        let time = 0

        let durationTime = speed / 1000


        const step = () => {

            time = time + this.stage2d.interval

            if (time > speed) {
                time = speed
            }

            for (let key in changeValues) {

                if (key === 'eAngle') {
                    //通过缓动函数求出某一属性在时间轴上对应的过度值
                    this[key] = this.easeOut(time / 1000, originalValues[key], changeValues[key], durationTime) / 100
                } else {
                    //通过缓动函数求出某一属性在时间轴上对应的过度值
                    this[key] = this.easeOut(time / 1000, originalValues[key], changeValues[key], durationTime)
                }

                // console.table([
                //     {
                //         time,
                //         originalValue: originalValues[key],
                //         changeValue: changeValues[key],
                //         speed,
                //         value: this[key],
                //         eAngel: option[key] * 100
                //     }
                // ])

            }

            if (time < speed) {
                Render(step)
            }
        }

        Render(step)
    }

    /*!
     * [easeOut 缓动函数]
     * @param  {[float]} t:timestamp [动画执行到当前帧所经过的时间] 如：0.3s
     * @param  {[float]} b:begining [起始值] 如：10
     * @param  {[float]} c:change [需要变化的量] 如：从 10 到 100，变化量是 90
     * @param  {[float]} d:duration [动画从开始到结束的总时长] 如：0.4s
     * @return {[float]}   [description] 时间轴上对应的过度值
     */
    easeOut(t,b,c,d) {
        return -c *(t/=d)*(t-2) + b;
    }

    //绘制饼形
    paintPie (context) {

        context.beginPath()

        //对于饼状图，xy是圆的中心
        context.moveTo(this.x, this.y)

        context.arc(this.x, this.y, this.radius, this.sAngle,  this.eAngle)


        context.closePath()

        if (context.isPointInPath(this.stage2d.mouseX, this.stage2d.mouseY)) {
            context.fillStyle = this.mouseOverPattern;
        } else {
            context.fillStyle = this.pattern
        }

        context.fill();

        context.stroke();

    }

    //绘制名称
    paintName (context, stage2d) {

    }

    paint (context) {


        //动画更新
        //this.stage2d.update(this)

        //绘制饼形
        context.save()

        context.strokeStyle = "#fdfdfd"
        context.lineJoin = "bevel"

        context.fillText("Hello World!",10,50);

        this.paintPie(context)



        context.restore()
    }
}
