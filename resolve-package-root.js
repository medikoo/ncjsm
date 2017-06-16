// Find top most package root

"use strict";

var resolveRoot = require("./lib/resolve-root");

module.exports = function (path) {
 return resolveRoot(path);
};
