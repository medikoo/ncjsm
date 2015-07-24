// Find top most package root

'use strict';

var ensureValue   = require('es5-ext/object/valid-value')
  , deferred      = require('deferred')
  , stat          = require('fs2/stat')
  , path          = require('path')
  , isPackageRoot = require('./is-package-root')

  , resolve = path.resolve, sep = path.sep;

module.exports = function (path) {
	path = resolve(String(ensureValue(path)));
	return stat(path)(function (stats) {
		var tokens;
		if (!stats.isDirectory()) throw new Error("Provided path is not a directory path");
		tokens = path.split(sep);
		tokens.forEach(function (token, index) {
			if (!index) return;
			tokens[index] = tokens[index - 1] + sep + token;
		});
		tokens[0] = tokens[0] + sep;
		return deferred.find(tokens, function (path) { return isPackageRoot(path); })(function (path) {
			return (path === undefined) ? null : path;
		});
	});
};
