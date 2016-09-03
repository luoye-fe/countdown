(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.CountDown = factory();
})(this, function() {
	var _erro = function(err) {
		throw new Error(err);
	};

	var _mixin = function(source, target) {
		for (var i in target) {
			if (target.hasOwnProperty(i)) {
				source[i] = target[i];
			}
		}
		return source;
	};

	var _startMs = null;
	var _endMs = null;

	var _diff;

	var _result = {};

	var timeMsMap = {
		day: 24 * 60 * 60 * 1000,
		hour: 60 * 60 * 1000,
		minute: 60 * 1000,
		second: 1000
	};

	var _formatTimeByUnit = function(sMs, eMs, unit) {
		_result = {};
		var hasGone = 0;
		if (unit.day) {
			_result.day = Math.floor((eMs - sMs - hasGone) / timeMsMap.day);
			hasGone += _result.day * timeMsMap.day;
		}
		if (unit.hour) {
			_result.hour = Math.floor((eMs - sMs - hasGone) / timeMsMap.hour);
			hasGone += _result.hour * timeMsMap.hour;
		}
		if (unit.minute) {
			_result.minute = Math.floor((eMs - sMs - hasGone) / timeMsMap.minute);
			hasGone += _result.minute * timeMsMap.minute;
		}
		if (unit.second) {
			_result.second = Math.floor((eMs - sMs - hasGone) / timeMsMap.second);
			hasGone += _result.second * timeMsMap.second;
		}
		return _result;
	};

	var countDown = function(params) {
		this.params = {};
		this.params = _mixin(this.params, params);
		this.params.startTime = this.params.startTime ? new Date(this.params.startTime) : Date.now();
		this.params.endTime = this.params.endTime ? new Date(this.params.endTime) : null;
		this.params.unit = this.params.unit ? _mixin({
			day: false,
			hour: false,
			minute: false,
			second: true
		}, this.params.unit) : {
			day: false,
			hour: false,
			minute: false,
			second: true
		};
		if (this.params.startTime.toString() === 'Invalid Date' || (this.params.endTime === null ? 0 : this.params.endTime.toString() === 'Invalid Date')) {
			_erro('Invalid Date in parmas!');
		}
		_startMs = Date.parse(this.params.startTime);
		_diff = this.params.endTime === null ? 1000 : -1000;
		_endMs = this.params.endTime === null ? Date.now() : Date.parse(this.params.endTime);
		this.running = false;
		this.paste = false;
	};

	countDown.prototype.init = function() {
		var _this = this;
		_this.running = true;
		_this.start && _this.start();
		var timeOut = function() {
			if (!_this.running) {
				return;
			}
			if (_this.paste) {
				var timer = window.setInterval(function() {
					if (!_this.paste) {
						clearInterval(timer);
						timeOut();
					}
				}, 50);
				return;
			} else {
				var _s = Date.now();
				var value = _formatTimeByUnit(_startMs, _endMs, _this.params.unit);
				_endMs = _endMs + _diff;
				var _e = Date.now();
				var diffPerFunc = _e - _s;
				var timer = window.setTimeout(function() {
					if (_endMs < _startMs) {
						_this.change && _this.change(value);
						_this.stop && _this.stop();
						clearTimeout(timer);
						return;
					} else {
						_this.change && _this.change(value);
						timeOut();
					}
				}, 1000 - diffPerFunc);
			}
		};
		timeOut();
	};
	countDown.prototype.toggle = function() {
		this.paste = !this.paste;
	};
	countDown.prototype.start = function() {
		this.params.onStart && this.params.onStart();
	};
	countDown.prototype.change = function(value) {
		this.params.onChange && this.params.onChange(value);
	};
	countDown.prototype.stop = function() {
		this.running = this.paste = false;
		this.params.onStop && this.params.onStop();
	};
	return {
		init: function(params) {
			var c = new countDown(params);
			c.init();
			return c;
		}
	};
});
