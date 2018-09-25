//事件对象
class event2D {

    constructor (event, callback) {
        //事件类型
		this.event = event

        //事件回调
        this.callback = callback
    }

}

//添加事件
export function addEvent (event, callback) {
    return new event2D(event, callback)
}
