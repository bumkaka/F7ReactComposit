'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = {

	set: function set(name, value) {
		switch (true) {
			case typeof value === 'object':
				localStorage.setItem(name, JSON.stringify(value));
				break;

			default:
				localStorage.setItem(name, value);
				break;
		}
	},

	get: function get(name) {
		try {
			return JSON.parse(localStorage.getItem(name));
		} catch (e) {
			return localStorage.getItem(name);
		}
	},

	remove: function remove(name) {
		localStorage.removeItem(name);
	}
};
module.exports = exports['default'];