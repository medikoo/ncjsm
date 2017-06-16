// Promise-like mock, to be used for sync resolution of modules

"use strict";

var PassThru = module.exports = function (value) {
 this.value = value;
};

PassThru.prototype.then = function (fn) {
	var result = fn(this.value);
	if (result instanceof PassThru) return result;
	return new PassThru(result);
};
