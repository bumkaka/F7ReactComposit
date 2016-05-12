'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Panel = (function () {
	function Panel(props) {
		_classCallCheck(this, Panel);

		this.option = $.extend({}, this.defaults, props || {});
	}

	_createClass(Panel, [{
		key: 'open',
		value: function open(props) {
			var side = props.side || 'right';
			$('.panel-' + side).html(props.content);
			App.F7.openPanel(side);
		}
	}, {
		key: 'closes',
		value: function closes() {
			App.F7.closePanel();
		}
	}]);

	return Panel;
})();

Panel.prototype.defaults = {};

exports['default'] = Panel;
module.exports = exports['default'];