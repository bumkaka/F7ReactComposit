'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Notify = (function () {
	function Notify(props) {
		_classCallCheck(this, Notify);

		this.settings = $.extend({}, this.defaults, props || {});
	}

	_createClass(Notify, [{
		key: 'show',
		value: function show(msg) {
			var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

			if (typeof msg === 'string') {
				if (!callback) {
					callback = function () {};
				}
				var el = App.F7.addNotification({
					title: msg,
					onClose: callback
				});
				this.closeOnDelay(el);
				return;
			}

			var el = App.F7.addNotification(msg);
			this.closeOnDelay(el);
			return;
		}
	}, {
		key: 'success',
		value: function success(msg, callback) {
			msg = '<span class="color-green"><i class="fa fa-circle" ></i> ' + msg + '</span>';
			this.show(msg, callback);
		}
	}, {
		key: 'error',
		value: function error(msg, callback) {
			msg = '<span class="color-red"><i class="fa fa-exclamation-circle" ></i> ' + msg + '</span>';
			this.show(msg, callback);
		}
	}, {
		key: 'closeOnDelay',
		value: function closeOnDelay(el) {
			var _this = this;
			var $el = $(el);
			setTimeout(function () {
				$el.css('opacity', 0);
				setTimeout(function () {
					App.F7.closeNotification($el);
				}, 450);
			}, _this.settings.timeout);
		}
	}]);

	return Notify;
})();

Notify.prototype.defaults = {
	timeout: 5000
};

exports['default'] = Notify;
module.exports = exports['default'];