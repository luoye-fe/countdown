var ele1 = document.getElementById('count_down1');
var ele2 = document.getElementById('count_down2');

// var countdown1 = CountDown.init({
// 	ele: ele1,
//     startTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
//     endTime: Date.now(),
// })



var countdown2 = CountDown.init({
    startTime: Date.now() - 8 * 24 * 60 * 60 * 1000,
    endTime: Date.now(),
    onStart: function() {

    },
    onChange: function(value) {

    },
    onEnd: function() {

    }
})

countdown2.change = function(value) {
    console.log("!");
}
