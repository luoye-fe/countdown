

// var countdown1 = CountDown.init({
// 	ele: ele1,
//     startTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
//     endTime: Date.now(),
// })



var countdown2 = CountDown.init({
    startTime: '2016-01-01 19:39:11:666',
    endTime: Date.now(),
    onStart: function() {

    },
    onChange: function(value) {
    	console.log(111)
    },
    onEnd: function() {

    }
})

