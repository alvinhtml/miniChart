import miniChart  from './minichart.js'


const myChart = document.getElementById('mychart')

console.log(miniChart);

const chart2D = miniChart.init(myChart)

chart2D.setOption({
    type: 'pie',
    name: '访问来源',
    radius : '55%',
    center: ['50%', '60%'],
    data:[
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'},
        {value:1548, name:'搜索引擎'}
    ],
})
/*

你好，你同事什么时候可以和我谈OFFER的事情，我已经等待一周了，如果确定可以给我OFFER，我再等待一段时间也没关系，如果不能给我OFFER，希望可以早点告诉我，我也好做其它打算。

 */
