'use strict';

var ensureString = require('es5-ext/object/validate-stringifiable-value')
  , getResolver  = require('../get-resolver')
  , resolve      = require('path').resolve;

module.exports = function (confirmFile, resolvePackageMain) {
	var resolveModule = getResolver(['.js', '.json', '.node'], confirmFile, resolvePackageMain);
	return function (cwd, path) {
		cwd = resolve(ensureString(cwd));
		path = ensureString(path);
		if (!path) throw new TypeError("Empty string is not a valid require path");
		return resolveModule(cwd, path);
	};
};
