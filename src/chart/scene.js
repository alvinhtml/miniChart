import MovieClip from './movieclip'



//场景
export default class Scene {

    constructor (canvas, width = 0, height = 0) {

        this.canvas = canvas

        this.width = width
        this.height = height

        this.context = canvas.getContext('2d')

        //舞台上的影片剪辑
        this.movieclipList = []

        //舞台上的影片剪辑数量
        this.length = 0
    }

    static init (container, width, height) {

        //创建 Canvas，并添加到场景
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        container.appendChild(canvas)

        return new Scene(canvas, width, height)
    }

    addChild (id, name, pattern) {
        const mc = new MovieClip(pattern)
		      mc.name = name
		      mc.id = id

		this.movieclipList.push(mc)
        this.length ++

		return mc;
    }
}
