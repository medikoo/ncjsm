"use strict";

var PassThru = require("../../utils/pass-thru");

var resolver = function () {
	return new PassThru(null);
};

module.exports = function (t, a) {
	var resolve = t(resolver, resolver);
	a.throws(function () {
		resolve();
	}, TypeError);
	a.throws(function () {
		resolve("asdfa");
	}, TypeError);
	a.throws(function () {
		resolve("asdfa", "");
	}, TypeError);
	a(resolve("asdfa", "elo").value, null);
};
