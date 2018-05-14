"use strict";

module.exports = function (t, a) {
	var pathA   = "./__playground/other"
	  , pathB   = "./__playground/samename"
	  , moduleA = require(pathA)
	  , moduleB = require(pathB);

	var moduleA2;

	t(require.resolve(pathA), function () {
		moduleA2 = require(pathA);
		a.not(moduleA2, moduleA);
		a(require(pathB), moduleB);
	});

	a(require(pathA), moduleA);

	t([require.resolve(pathA), require.resolve(pathB)], function () {
		var moduleA3 = require(pathA);
		a.not(moduleA3, moduleA);
		a.not(moduleA3, moduleA2);
		var moduleB3 = require(pathB);
		a.not(moduleB3, moduleB);
	});

	a(require(pathA), moduleA);
	a(require(pathB), moduleB);
};
