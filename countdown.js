(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.CountDown = factory();
})(this, function() {

    var _formatTime = function(timeStr, format) {

    }

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


    var _startMs = _endMs = null;
    var _diff;

    
    var countDown = function(params) {
        this.params = {};
        _mixin(this.params, params);
        this.params.startTime = this.params.startTime ? new Date(this.params.startTime) : Date.now();
        this.params.endTime = this.params.endTime ? new Date(this.params.endTime) : null;
        if (this.params.startTime.toString() === 'Invalid Date' || this.params.endTime === null ? 0 : this.params.endTime.toString() === 'Invalid Date') {
            _erro('Invalid Date in parmas!');
        }
        _startMs = Date.parse(this.params.startTime.toString());
        _endMs = this.params.endTime === null ? Number.POSITIVE_INFINITY : Date.parse(this.params.endTime.toString());
        if(_startMs > _endMs){
            // _diff = 
        }
        console.log(_startMs,_endMs);
        this.running = false;
        this.paste = false;
    }

    countDown.prototype.init = function() {
        var _this = this;
        var count = 0;
        _this.running = true;
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
                count++;
                var _e = Date.now();
                var diff = _e - _s;
                setTimeout(function() {
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


    countDown.prototype.formatTime = _formatTime;

    return {
        init: function(params) {
            var c = new countDown(params);
            c.init();
            return c;
        }
    }
})
