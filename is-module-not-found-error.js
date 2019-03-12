// Whether given error is an error thrown by require internals in case module
// (at given path) was not found

"use strict";

const pathToken = ":path";

let pattern;

try { require(pathToken); }
catch (e) { pattern = e.message; }

module.exports = function (error, path) {
	return error.message === pattern.replace(pathToken, path);
};
