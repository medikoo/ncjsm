"use strict";

const uniq                 = require("es5-ext/array/#/uniq")
    , ensureString         = require("es5-ext/object/validate-stringifiable-value")
    , deferred             = require("deferred")
    , { dirname, resolve } = require("path")
    , readFile             = require("fs2/read-file")
    , findRequires         = require("find-requires")
    , builtinModules       = new Set(require("builtin-modules"))
    , cjsResolve           = require("./resolve");

const nonLocalChar = new Set([".", "/"]);

const getDirectDependencies = function (modulePath) {
	return readFile(modulePath)(content => {
		const dir = dirname(modulePath);
		return deferred.map(uniq.call(findRequires(content)), depPath => {
			if (!nonLocalChar.has(depPath[0]) && builtinModules.has(depPath.split("/")[0])) {
				return null;
			}
			return cjsResolve(dir, depPath)(path => {
				if (path) return path;
				throw new Error(
					`Could not resolve ${ JSON.stringify(depPath) } module, required in ${
						JSON.stringify(modulePath)
					}`
				);
			});
		})(paths => uniq.call(paths).filter(Boolean));
	});
};

module.exports = function (programPath) {
	programPath = resolve(ensureString(programPath));
	const paths = Object.create(null);
	return (function self(modulePath) {
		if (paths[modulePath]) return null;
		return (paths[modulePath] = getDirectDependencies(modulePath).map(self));
	})(programPath)(() => Object.keys(paths));
};
