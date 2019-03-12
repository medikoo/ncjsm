// Sync module resolver

"use strict";

const { resolve }                                = require("path")
    , { statSync: stat, readFileSync: readFile } = require("fs")
    , PassThru                                   = require("../utils/pass-thru")
    , getResolver                                = require("../lib/get-node-resolver");

const { parse } = JSON;

const resolver = getResolver(
	path => {
		let stats;
		path = resolve(path);
		try {
			stats = stat(path);
		} catch (e) {
			if (e.code === "ENOENT") return new PassThru(null);
			throw e;
		}
		return new PassThru(stats.isFile() ? path : null);
	},
	path => {
		let data, result;
		try {
			data = readFile(resolve(path, "package.json"));
		} catch (e) {
			if (e.code === "ENOENT") return new PassThru(null);
			throw e;
		}
		try { result = parse(data).main; }
		catch (e) { result = null; }
		return new PassThru(result);
	}
);

module.exports = function (dir, path) { return resolver(dir, path).value; };
