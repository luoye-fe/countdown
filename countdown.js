(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.CountDown = factory();
})(this, function() {

    var utils = {};
    utils.formatTime = function() {

    }

    var countDown = function(params) {
        this.params = params;
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
                    // _this.change && _this.change();
                    console.log(count);
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


    countDown.prototype.formatTime = utils.formatTime;

    return {
        init: function(params) {
            var c = new countDown(params);
            c.init();
            return c;
        }
    }
})
