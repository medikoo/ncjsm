"use strict";

var uniq           = require("es5-ext/array/#/uniq")
  , ensureString   = require("es5-ext/object/validate-stringifiable-value")
  , Set            = require("es6-set")
  , deferred       = require("deferred")
  , pathUtils      = require("path")
  , readFile       = require("fs2/read-file")
  , findRequires   = require("find-requires")
  , builtinModules = new Set(require("builtin-modules"))
  , cjsResolve     = require("./resolve");

var nonLocalChar = new Set([".", "/"]);
var resolve = pathUtils.resolve, dirname = pathUtils.dirname;

var getDirectDependencies = function (modulePath) {
	return readFile(modulePath)(function (content) {
		var dir = dirname(modulePath);
		return deferred.map(uniq.call(findRequires(content)), function (depPath) {
			if (!nonLocalChar.has(depPath[0]) && builtinModules.has(depPath.split("/")[0])) {
				return null;
			}
			return cjsResolve(dir, depPath)(function (path) {
				if (path) return path;
				throw new Error(
					"Could not resolve " +
						JSON.stringify(depPath) +
						" module, required in " +
						JSON.stringify(modulePath)
				);
			});
		})(function (paths) { return uniq.call(paths).filter(Boolean); });
	});
};

module.exports = function (programPath) {
	programPath = resolve(ensureString(programPath));
	var paths = Object.create(null);
	return (function self(modulePath) {
		if (paths[modulePath]) return null;
		return (paths[modulePath] = getDirectDependencies(modulePath).map(self));
	}(programPath))(function () { return Object.keys(paths); });
};
