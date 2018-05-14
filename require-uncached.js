"use strict";

var aFrom          = require("es5-ext/array/from")
  , objForEach     = require("es5-ext/object/for-each")
  , isObject       = require("es5-ext/object/is-object")
  , ensureFunction = require("es5-ext/object/ensure-plain-function")
  , ensureString   = require("es5-ext/object/validate-stringifiable-value");

module.exports = function (moduleIds, callback) {
	// 1. Validate & resolve input
	if (isObject(moduleIds)) {
		moduleIds = aFrom(moduleIds);
		if (!moduleIds) throw new TypeError("Minimum one moduleId is required");
	} else {
		moduleIds = [ensureString(moduleIds)];
	}
	ensureFunction(callback);

	// 2. Cache currently cached module values
	var cache = {};
	moduleIds.forEach(function (moduleId) {
		if (!hasOwnProperty.call(require.cache, moduleId)) return;
		cache[moduleId] = require.cache[moduleId];
		delete require.cache[moduleId];
	});

	try {
		// 3. Run callback
		return callback();
	} finally {
		// 4. Bring back cached values
		objForEach(cache, function (value, moduleId) { require.cache[moduleId] = value; });
	}
};
