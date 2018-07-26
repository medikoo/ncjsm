"use strict";

module.exports = function (t, a) {
	var pathA   = "./__playground/other"
	  , pathB   = "./__playground/samename"
	  , moduleA = require(pathA);

	var moduleA2;

	var innerModuleB = t([require.resolve(pathA), require.resolve(pathB)], function () {
		moduleA2 = require(pathA);
		a.not(moduleA2, moduleA);
		return require(pathB);
	});

	var moduleB = require(pathB);
	a(require(pathA), moduleA);
	a.not(moduleB, innerModuleB);

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
