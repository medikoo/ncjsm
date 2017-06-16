"use strict";

var ensureString = require("es5-ext/object/validate-stringifiable-value");

module.exports = function (path) {
	var pathChar;
	path = ensureString(path);
	pathChar = path.charAt(0);
	if (pathChar === "/") return false;
	if (pathChar === ".") {
		pathChar = path.charAt(1);
		if (!pathChar || (pathChar === "/")) return false;
		if (pathChar === ".") {
			pathChar = path.charAt(2);
			if (!pathChar || (pathChar === "/")) return false;
		}
	}
	return true;
};
