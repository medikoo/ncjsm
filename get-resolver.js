// Returns CJS module (sync or async) resolver

'use strict';

var dirname = function (path) { return path.slice(0, path.lastIndexOf('/')) || '/'; };
var join = function (a, b) { return (a === '/') ? a + b : a + '/' + b; };

module.exports = function (extensions, confirmFile, resolvePackageMain, passThru) {
	var resolveFile = function (path, extIndex) {
		return confirmFile(path + ((extIndex != null) ? extensions[extIndex] : ''))(function (result) {
			if (result) return passThru(result);
			if (extIndex == null) extIndex = 0;
			else ++extIndex;
			if (!extensions[extIndex]) return passThru(null);
			return resolveFile(path, extIndex);
		});
	};
	var resolveDirectory = function (path) {
		return resolvePackageMain(path)(function (result) {
			if (result) return resolveFile(join(path, result));
			return resolveFile(join(path, 'index'), 0);
		});
	};
	var resolveLocal = function (path) {
		var pathChar = path.charAt(path.length - 1);
		if (pathChar === '/') return resolveDirectory(path);
		if (pathChar === '.') {
			pathChar = path.charAt(path.length - 2);
			if (pathChar === '/') return resolveDirectory(path);
			if (pathChar === '.') {
				if (path.charAt(path.length - 3) === '/') return resolveDirectory(path);
			}
		}
		return resolveFile(path)(function (result) {
			return result ? passThru(result) : resolveDirectory(path);
		});
	};
	var resolveExternal = function (cwd, path) {
		return resolveLocal(join(cwd, 'node_modules') + '/' + path)(function (result) {
			if (result) return passThru(result);
			if (cwd === '/') return passThru(null);
			return resolveExternal(dirname(cwd), path);
		});
	};
	return function (cwd, path) {
		var pathChar;
		if (path.charAt(0) === '/') return resolveLocal(path);
		if (path.charAt(0) === '.') {
			pathChar = path.charAt(1);
			if (!pathChar || (pathChar === '/')) return resolveLocal(join(cwd, path));
			if (pathChar === '.') {
				pathChar = path.charAt(2);
				if (!pathChar || (pathChar === '/')) return resolveLocal(join(cwd, path));
			}
		}
		return resolveExternal(cwd, path);
	};
};
