

// var countdown1 = CountDown.init({
// 	ele: ele1,
//     startTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
//     endTime: Date.now(),
// })



var countdown2 = CountDown.init({
    startTime: '2016-01-01 19:39:11:666',
    endTime: '2016-04-17 23:59:00:666',
    unit: {
    	year: false,
    	month: false,
    	day: false,
    	hour: false,
    	minute: false,
    	second: true
    },
    onStart: function() {

    },
    onChange: function(value) {
    	// console.log(111)
    },
    onEnd: function() {

    }
})

