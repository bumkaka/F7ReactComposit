"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
Event = function (object) {
	object.listeners = [];

	object.on = function (name, callback) {
		this.listeners.push({ name: name, callback: callback });
	};

	object.trigger = function (name, scope) {
		var result = false;
		this.listeners.forEach(function (event) {
			if (event.name == name) {
				result = event.callback.call(scope, scope);
			}
		});
		return result;
	};
};

exports["default"] = Event;
module.exports = exports["default"];