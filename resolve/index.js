// Async module resolver

"use strict";

var getResolver = require("../lib/get-node-resolver")
  , resolve     = require("path").resolve
  , stat        = require("fs2/stat")
  , readFile    = require("fs2/read-file")
  , parse       = JSON.parse;

module.exports = getResolver(
	function (path) {
		path = resolve(path);
		return stat(path)(
			function (stats) {
				return stats.isFile() ? path : null;
			},
			function (e) {
				if (e.code === "ENOENT") return null;
				throw e;
			}
		);
	},
	function (path) {
		return readFile(resolve(path, "package.json"))(
			function (data) {
				try {
					return parse(data).main;
				} catch (e) {
					return null;
				}
			},
			function (e) {
				if (e.code === "ENOENT") return null;
				throw e;
			}
		);
	}
);
