//获取元素相对于窗口左边的距离
export function offsetTop(elements) {
    let top = elements.offsetTop
    let parent = elements.offsetParent
    while (parent != null) {
        top += parent.offsetTop
        parent = parent.offsetParent
    }
    return top
}

//获取元素相对于窗口顶端边的距离
export function offsetLeft(elements) {
    let left = elements.offsetLeft
    let parent = elements.offsetParent
    while (parent != null) {
        left += parent.offsetLeft
        parent = parent.offsetParent
    }
    return left
}


//防抖和节流
export class throttler {
    constructor (delay = 100) {
        this.delay = delay
        this.lastTime = new Date().getTime()
    }

    static delay (delay) {
        return new throttler(delay)
    }

    throttle (fn) {
        const currentTime = new Date().getTime()
        if (currentTime - this.lastTime > this.delay) {
            console.log(currentTime-this.lastTime, this.delay);
            this.lastTime = currentTime
            fn()
        }
    }
}
