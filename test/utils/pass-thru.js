"use strict";

module.exports = function (T, a) {
	var passThru = new T("foo");
	a(passThru.value, "foo");
	a(
		passThru.then(function (value) {
			return value + "bar";
		}).value,
		"foobar"
	);
};
