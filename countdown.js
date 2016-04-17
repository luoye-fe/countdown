(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.CountDown = factory();
})(this, function() {

    var _warn = function(value) {
        console.warn(value);
    }

    var _erro = function(err) {
        throw new Error(err);
    }

    var _mixin = function(source, target) {
        for (var i in target) {
            if (target.hasOwnProperty(i)) {
                source[i] = target[i];
            }
        }
        return source;
    }

    var _daysPerMonth = function() {

    }

    var _daysPerYear = function() {

    }


    var _startMs = _endMs = null;
    var _diff;


    var _formatTimeByUnit = function(sMs, eMs, unit) {
        var diff = Math.abs(sMs - eMs);
        // console.log(diff);
        var ts;
    console.log(new Date(diff).getMonth());
        console.log(Math.floor(diff / (24 * 60 * 60 * 1000)));
    }

    var countDown = function(params) {
        this.params = {};
        var _unit = {};
        this.params = _mixin(this.params, params);
        this.params.startTime = this.params.startTime ? new Date(this.params.startTime) : Date.now();
        this.params.endTime = this.params.endTime ? new Date(this.params.endTime) : null;
        this.params.unit = this.params.unit ? _mixin(this.params.unit, {
            year: false,
            month: false,
            day: false,
            hour: false,
            minute: false,
            second: true
        }) : {
            year: false,
            month: false,
            day: false,
            hour: false,
            minute: false,
            second: true
        };
        console.log(this.params);
        if (this.params.startTime.toString() === 'Invalid Date' || this.params.endTime === null ? 0 : this.params.endTime.toString() === 'Invalid Date') {
            _erro('Invalid Date in parmas!');
        }
        _startMs = Date.parse(this.params.startTime);
        _endMs = this.params.endTime === null ? Number.POSITIVE_INFINITY : Date.parse(this.params.endTime);
        // _diff = _endMs === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : Math.abs(_endMs - _startMs);
        this.running = false;
        this.paste = false;
    }

    countDown.prototype.init = function() {
        var _this = this;
        _this.running = true;
        _this.start && _this.start();
        _this.params.onStart && _this.params.onStart();
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
            } else {
                var _s = Date.now();
                _endMs = _endMs === Number.POSITIVE_INFINITY ? _s : _endMs;
                _formatTimeByUnit(_startMs, _endMs, _this.params.unit);
                _endMs = _endMs === Number.POSITIVE_INFINITY ? _endMs + 1000 : _endMs - 1000;
                var _e = Date.now();
                var diff = _e - _s;
                var timer = window.setTimeout(function() {
                    _this.change && _this.change();
                    _this.params.onChange && _this.params.onChange();
                    timeOut();
                }, 1000 - diff);
            }
        }
        timeOut();
    }
    countDown.prototype.toggle = function() {
        this.paste = !this.paste;
    }

    countDown.prototype.stop = function() {
        this.running = this.paste = false;
    }


    countDown.prototype.formatTime = _formatTimeByUnit;

    return {
        init: function(params) {
            var c = new countDown(params);
            c.init();
            return c;
        }
    }
})
