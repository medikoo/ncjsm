// Whether given error is an error thrown by require internals in case module
// (at given path) was not found

"use strict";

var pathToken = ":path", pattern;

var resolveMessage = function (error) {
	var newLineIndex = error.message.indexOf("\n");
	return newLineIndex > 0 ? error.message.slice(0, newLineIndex) : error.message;
};

try { require(pathToken); }
catch (error) { pattern = resolveMessage(error); }

module.exports = function (error, path) {
	return resolveMessage(error) === pattern.replace(pathToken, path);
};
