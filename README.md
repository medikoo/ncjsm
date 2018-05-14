[![Build status][nix-build-image]][nix-build-url]
[![Windows status][win-build-image]][win-build-url]
![Transpilation status][transpilation-image]
[![npm version][npm-image]][npm-url]

# cjs-module

## CJS (Node.js) modules resolver

Environment agnostic CJS (Node.js) modules resolver.  
It implements a _strict_ version of Node.js modules resolution logic, differences are as follows:

*   [Loading from global folders](https://nodejs.org/api/all.html#all_loading_from_the_global_folders) is not supported
*   Only Unix path separators (`/`) are supported in require's _path_ arguments (_Background: even though Node.js internally seems to follow Windows path separator in Windows environment, it won't work in \*nix environments, and even in Window env it's [not reliable](https://github.com/nodejs/node/issues/6049) so by all means should be avoided_)
*   There's no awareness of node.js [core modules](https://nodejs.org/api/all.html#all_core_modules)
    e.g. `resolve(dir, 'fs')` will naturally result with _null_

### Installation

    $ npm install cjs-module

### API

#### getResolver(extensions, confirmFile, resolvePackageMain)

For provided configuration, returns a CJS modules resolver:

*   **extensions** - List of supported file extensions in order of singificance, e.g. for Node.js it would be `['.js', '.json', '.node']`
*   **confirmFile** - a `confirmFile(filepath)` function. Confirms whether there's a module at provided (not normalized, absolute) file path. Returns promise-like object which resolves with either normalized full path of a module or null (if there's no module for given path).  
    Although result is expected to be a promise-like object, resolution can be synchronous.
*   **resolvePackageMain** - a `resolvePackageMain(dirpath)` function. Returns value of _package.json_'s `main` property for given path. Returns promise-like object which resolves with either resolved value, or null, when either `package.json` file was not found, or it didn't have _main_ property.  
    Same as with `confirmFile` resolution can be synchronous.

#### resolve(dir, path)

_Node.js resolver_

Asynchronously resolves module path against provided directory path.
Returns promise. If no matching module was found, promise resolves with `null` otherwise
full module path becomes a resolved value.

```javascript
var resolve = require("cjs-module/resolve");

// Asynchronously resolve path for 'foo' module against current path
resolve(__dirname, "foo").done(function(fooModulePath) {
	if (!fooModulePath) {
		// 'foo' module doesn't exist
	} else {
		// 'foo' module found at fooModulePath
	}
});
```

#### resolveSync(dir, path)

_Node.js resolver_

Synchronously resolves module path against provided directory path.
If matching module was found then full module path is returned, otherwise `null`.

```javascript
var resolveSync = require("cjs-module/resolve/sync");

// Synchronously resolve path for 'foo' module against current path
var fooModulePath = resolveSync(__dirname, "foo");
if (!fooModulePath) {
	// 'foo' module doesn't exist
} else {
	// 'foo' module found
}
```

#### isPackageRoot(dirPath)

Whether provided path is a root of a package

```javascript
var isPackageRoot = require("cjs-module/is-package-root");

isPackageRoot(dirPath).done(function(isRoot) {
	if (isRoot) {
		// Provided path is package root
	}
});
```

#### resolvePackageRoot(dirPath)

Resolve package root path for provided path. It is about resolution of first upper package root

```javascript
var resolvePackageRoot = require("cjs-module/resolve-package-root");

resolvePackageRoot(dirPath).done(function(root) {
	if (!root) {
		// Provided path is not located in any package
	}
});
```

#### resolveProjectRoot(dirPath)

Resolve project root path for provided path. It is about resolution of topmost package root for given path

```javascript
var resolveProjectRoot = require("cjs-module/resolve-project-root");

resolveProjectRoot(dirPath).done(function(root) {
	if (!root) {
		// Provided path is not located in any project
	}
});
```

#### getDependecies(modulePath)

Resolve all module dependencies. Returns promise that resolves with an array of paths, that includes path to input module and paths to all its dependencies (it includes deep dependencies, so also dependencies of the dependencies)

```javascript
var getDependencies = require("cjs-module/get-dependencies");

getDependencies(modulePath).done(function(deps) {
	console.log(deps); // e.g. [pathToModulePath, pathToDep1, pathToDep2, ...pathToDepn]
});
```

## Tests [![Build Status](https://travis-ci.org/medikoo/cjs-module.svg)](https://travis-ci.org/medikoo/cjs-module)

    $ npm test

[nix-build-image]: https://semaphoreci.com/api/v1/medikoo-org/cjs-module/branches/master/shields_badge.svg
[nix-build-url]: https://semaphoreci.com/medikoo-org/cjs-module
[win-build-image]: https://ci.appveyor.com/api/projects/status/i68ocohu91ejv77k?svg=true
[win-build-url]: https://ci.appveyor.com/project/medikoo/cjs-module
[transpilation-image]: https://img.shields.io/badge/transpilation-free-brightgreen.svg
[npm-image]: https://img.shields.io/npm/v/cjs-module.svg
[npm-url]: https://www.npmjs.com/package/cjs-module
