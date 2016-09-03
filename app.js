
var htmlToDate = function(inputs){
	var result = '';
	var splitSign = ['-','-',' ',':',':',':',''];
	for(var i = 0;i < inputs.length;i++){
		if(inputs[i].value !== ''){
			result += inputs[i].value + splitSign[i];
		}
	}
	return result;
}

var htmlToUnit = function(inputs){
	var unit = {};
	for(var i = 0;i < inputs.length;i++){
		unit[inputs[i].id] = inputs[i].checked;
	}
	return unit;
}

var countdown;

var init = function(){
	var options = {
		onStart: function() {
			console.log('start!');
		},
		onChange: function(value) {
			// console.log(value)
		},
		onStop: function() {
			console.log('stop!');
		}
	};

	// 解析开始结束时间
	var startInputs = document.querySelectorAll('.input_con')[0].querySelectorAll('input');
	options.startTime = htmlToDate(startInputs);
	var endInputs = document.querySelectorAll('.input_con')[1].querySelectorAll('input');
	htmlToDate(endInputs) === '' ? null : options.endTime = htmlToDate(endInputs);

	var unitInputs = document.querySelectorAll('.input_con')[2].querySelectorAll('input');
	options.unit = htmlToUnit(unitInputs);

	try{
		countdown.stop();
	}catch(e){};

	countdown = CountDown.init(options);

	countdown.change = function(value){
		console.log(value);
		document.querySelectorAll('.timer')[0].innerHTML = value.day + '天' + value.hour + '时' + value.minute + '分' + value.second + '秒';
		document.querySelectorAll('.code')[0].innerHTML = '参数：' + JSON.stringify(options);
		document.querySelectorAll('.code')[1].innerHTML = '结果：' + JSON.stringify(value);
	}
}

