// Generates module path resolver for Node.js
// Used to generate both sync and async version

"use strict";

const ensureString = require("type/string/ensure")
    , getResolver  = require("../get-resolver")
    , { resolve }  = require("path");

module.exports = function (confirmFile, resolvePackageMain) {
	const resolveModule = getResolver([".js", ".json", ".node"], confirmFile, resolvePackageMain);
	return function (dir, path) {
		dir = resolve(ensureString(dir));
		path = ensureString(path);
		if (!path) throw new TypeError("Empty string is not a valid require path");
		return resolveModule(dir, path);
	};
};
