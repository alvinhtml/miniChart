import miniChart  from './minichart.js'


const myChart = document.getElementById('mychart')


const chart = miniChart.init(myChart)


// Pie
let pieOption = {

    type: 'pie',   // 'line', 'bar', 'radar', 'gauge'

    //样式
    style: {
        //颜色
        colors: ['#f2711c', '#fbbd08', '#b5cc18', '#21ba45', '#00b5ad', '#2185d0', '#6435c9', '#a333c8', '#e03997', '#a5673f'],

        //字体
        font: '12px sans-serif',

        /* 名称: 三种方案
         * 1 - 'none' , 表示不显示名称
         * 2 - '{a}:{b}({c}%)'
         *   a: 名称
         *   b: 值
         *   c: 百分比
         * 3 - (a, b, c) = { return a + ':' + b +'(' + c + '%)' }
        */
        nameStyle: (a, b, c) => {
            return a + '(' + b + ')'
        },

        //值, 配置方法同上
        valueStyle: '{c}%',

        //图例,
        legend: 'top' // 'top'

    },

    //半径
    radius : '60%', // 60% , 150

    //圆心位置
    center: ['50%', '50%'],  // ['50%', '50%'], [200, 200]

    //图例
    legend: ['台式电脑', '笔记本', '平板电脑', '手机', '交换机', '路由器', '服务器'],

    //图例对应的数据集
    data: [334, 211, 186, 412, 218, 162, 128]

}

// chart.setOption({
//     scale: true, //是否允许缩放
//     type: 'pie',
//     name: '访问来源',
//     radius : '60%',
//     center: ['50%', '50%'],
//     data:[
//         {value:335, name:'直接访问'},
//         {value:810, name:'邮件营销'},
//         {value:234, name:'联盟广告'},
//         {value:135, name:'视频广告'},
//         {value:548, name:'搜索引擎'},
//         {value:448, name:'搜索引擎'},
//         {value:548, name:'搜索引擎2'},
//         {value:348, name:'搜索引擎3'}
//     ],
// })

chart.setOption(pieOption)

chart.addEventListener('click', (e) => {
    console.log(e.name, e.value)
})
