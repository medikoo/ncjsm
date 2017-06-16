"use strict";

var uniq         = require("es5-ext/array/#/uniq")
  , ensureString = require("es5-ext/object/validate-stringifiable-value")
  , deferred     = require("deferred")
  , pathUtils    = require("path")
  , readFile     = require("fs2/read-file")
  , findRequires = require("find-requires")
  , cjsResolve   = require("./resolve");

var resolve = pathUtils.resolve, dirname = pathUtils.dirname;

var getDirectDependencies = function (modulePath) {
	return readFile(modulePath)(function (content) {
		var dir = dirname(modulePath);
		return deferred.map(uniq.call(findRequires(content)), function (depPath) {
			return cjsResolve(dir, depPath)(function (path) {
				if (path) return path;
				throw new Error(
					"Could not find " + JSON.stringify(depPath) + " in dir " + JSON.stringify(dir)
				);
			});
		})(function (paths) {
			return uniq.call(paths);
		});
	});
};

module.exports = function (programPath) {
	programPath = resolve(ensureString(programPath));
	var paths = Object.create(null);
	return (function self (modulePath) {
		if (paths[modulePath]) return null;
		return paths[modulePath] = getDirectDependencies(modulePath).map(self);
	}(programPath))(function () {
		return Object.keys(paths);
	});
};
