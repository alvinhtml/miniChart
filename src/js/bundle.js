webpackJsonp([0],{

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _minichart = __webpack_require__(0);

var _minichart2 = _interopRequireDefault(_minichart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myChart = document.getElementById('mychart');

var chart = _minichart2.default.init(myChart);

chart.setOption({
    scale: true, //是否允许缩放
    type: 'pie',
    name: '访问来源',
    radius: '60%',
    center: ['50%', '50%'],
    data: [{ value: 335, name: '直接访问' }, { value: 810, name: '邮件营销' }, { value: 234, name: '联盟广告' }, { value: 135, name: '视频广告' }, { value: 548, name: '搜索引擎' }, { value: 448, name: '搜索引擎' }, { value: 548, name: '搜索引擎2' }, { value: 348, name: '搜索引擎3' }]
});

chart.addEventListener('click', function (e) {
    console.log(e.name, e.value);
});

/***/ })

},[12]);