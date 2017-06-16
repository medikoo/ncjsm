// Sync module resolver

"use strict";

var resolve     = require("path").resolve
  , fs          = require("fs")
  , PassThru    = require("../utils/pass-thru")
  , getResolver = require("../lib/get-node-resolver")
  , stat        = fs.statSync
  , readFile    = fs.readFileSync
  , parse       = JSON.parse;

var resolver = getResolver(
	function (path) {
		var stats;
		path = resolve(path);
		try {
			stats = stat(path);
		} catch (e) {
			if (e.code === "ENOENT") return new PassThru(null);
			throw e;
		}
		return new PassThru(stats.isFile() ? path : null);
	},
	function (path) {
		var data, result;
		try {
			data = readFile(resolve(path, "package.json"));
		} catch (e) {
			if (e.code === "ENOENT") return new PassThru(null);
			throw e;
		}
		try {
			result = parse(data).main;
		} catch (e) {
			result = null;
		}
		return new PassThru(result);
	}
);

module.exports = function (dir, path) {
	return resolver(dir, path).value;
};
