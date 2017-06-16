"use strict";

var ensureString = require("es5-ext/object/validate-stringifiable-value")
  , deferred     = require("deferred")
  , resolve      = require("path").resolve
  , stat         = require("fs2/stat");

module.exports = function (path) {
	path = ensureString(path);
	return deferred.some([
		stat(resolve(path, "package.json"))(
			function (stats) {
				return stats.isFile();
			},
			function (e) {
				if (e.code === "ENOENT") return false;
				throw e;
			}
		),
		stat(resolve(path, "node_modules"))(
			function (stats) {
				return stats.isDirectory();
			},
			function (e) {
				if (e.code === "ENOENT") return false;
				throw e;
			}
		)
	]);
};
