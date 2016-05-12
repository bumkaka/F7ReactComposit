'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Ajax = (function () {
	function Ajax(props) {
		_classCallCheck(this, Ajax);

		this.settings = $.extend({}, this.defaults, props || {});
	}

	_createClass(Ajax, [{
		key: 'call',
		value: function call(props) {
			var option = $.extend({}, this.settings, props || {});
			option.headers.token = App.getToken();
			option.url = option.url || '';
			if (option.url.indexOf('://') == -1) option.url = option.baseURL + option.url.replace(/^\//, '');
			return $.ajax(option);
		}
	}]);

	return Ajax;
})();

Ajax.prototype.defaults = {
	type: 'post',
	baseURL: '/api/',
	//contentType: false,
	//processData: false,
	crossDomain: true,
	dataType: 'json',
	timeout: 5000,
	headers: {},
	beforeSend: function beforeSend() {
		App.F7.showIndicator();
	},
	complete: function complete(xhr, status) {
		App.F7.hideIndicator();
	},
	statusCode: {
		404: function _(xhr) {
			App.notify.error('Ops. Something went wrong :( ');
		},
		504: function _(xhr) {
			App.notify.error('Please check your internet connection.');
		},
		500: function _(xhr) {
			App.notify.error('Please try again later.');
		},
		error: function error(xhr, status) {
			App.F7.hideIndicator();
			App.notify.show('<span class="color-red"><i class="fa fa-exclamation-circle" ></i> Error</span>');
		}
	}
};

exports['default'] = Ajax;
module.exports = exports['default'];