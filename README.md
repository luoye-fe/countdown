CountDown 计时器
===================

### 完整参数配置

```js
/*
 * 说明：
 * 开始时间参数必须，结束时间不是必须
 * 如果没有结束时间，则初始化为计时器，时间递增，如果两个参数齐全，则初始化为倒计时
 */

{
	startTime: 'Date String',
	endTime: 'Date String',
	unit: {
		day: true,
		hour: true,
		minute: true,
		second: true
	},
	onStart: function(){
		// do something when start
	},
	onChange: function(value){
		// value -> object include formated time by unit in options
	},
	onStop: function(){
		// do something when stop
	}
}
```

### 调用

```js
// 支持所有的加载方式CommonJs、AMD、Script标签(没发布npm...发布的话可以直接npm安装调用)
// for example
var CountDown = require('CountDown');
var countDown = CountDown.init({
	startTime: '2016-01-01 19:35:11:0',
	unit: {
		day: true,
		hour: true,
		minute: true,
		second: true
	},
	onStart: function() {
		console.log('start!');
	},
	onChange: function(value) {
		// console.log(value)
		// like: { day: 107,hour: 20,minute: 41,second: 10 }
	},
	onStop: function() {
		console.log('stop!');
	}
});

countDown.start = function(){};  // 开始时触发事件
countDown.change = function(){};  // 改变时触发事件
countDown.toggle();  // 暂停或继续
countDown.stop();  // 停止
```