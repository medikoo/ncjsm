// Find root, either first upper or topmost

"use strict";

var ensureValue   = require("es5-ext/object/valid-value")
  , deferred      = require("deferred")
  , stat          = require("fs2/stat")
  , pathUtils     = require("path")
  , isPackageRoot = require("../is-package-root");

var resolve = pathUtils.resolve, sep = pathUtils.sep;

module.exports = function (path, searchTopMost) {
	path = resolve(String(ensureValue(path)));
	return stat(path)(function (stats) {
		var tokens;
		if (!stats.isDirectory()) throw new Error("Provided path is not a directory path");
		tokens = path.split(sep);
		tokens.forEach(function (token, index) {
			if (!index) return;
			tokens[index] = tokens[index - 1] + sep + token;
		});
		tokens[0] += sep;
		if (!searchTopMost) tokens.reverse();
		return deferred.find(tokens, function (dirPath) {
			return isPackageRoot(dirPath);
		})(function (rootPath) {
			return rootPath === undefined ? null : rootPath;
		});
	});
};
