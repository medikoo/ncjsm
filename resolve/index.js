// Async module resolver

"use strict";

const getResolver = require("../lib/get-node-resolver")
    , { resolve } = require("path")
    , stat        = require("fs2/stat")
    , readFile    = require("fs2/read-file");

const { parse } = JSON;

module.exports = getResolver(
	path => {
		path = resolve(path);
		return stat(path)(
			stats => (stats.isFile() ? path : null),
			e => {
				if (e.code === "ENOENT") return null;
				throw e;
			}
		);
	},
	path =>
		readFile(resolve(path, "package.json"))(
			data => {
				try { return parse(data).main; }
				catch (e) { return null; }
			},
			e => {
				if (e.code === "ENOENT") return null;
				throw e;
			}
		)
);
