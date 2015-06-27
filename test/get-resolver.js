'use strict';

var identity = require('es5-ext/function/identity')
  , resolve  = require('path').resolve;

var existingFiles = [
	'/project/foo.js',
	'/project/other.js',
	'/project/other/index.js',
	'/project/samename',
	'/project/samename.js',
	'/project/samename.json',
	'/project/dir/subdir/bar.js',
	'/project/dir/lorem.js',
	'/project/otherdir/esli.js',
	'/project/node_modules/outer/boo.js',
	'/project/node_modules/outer/raz.js',
	'/project/node_modules/outer/node_modules/nested/elo.js',
	'/project/node_modules/outer3/index.js'
];
existingFiles.includes = require('es5-ext/array/#/contains');

var existingMains = {
	'/project/dir': 'lorem',
	'/project/node_modules/outer': 'raz'
};

var passThru = function (value) { return function (fn) { return fn(value); }; };
var isFile = function (path) {
	path = resolve(path);
	return passThru(existingFiles.includes(path) ? path : null);
};

var resolvePackageMain = function (path) {
	return passThru(existingMains[resolve(path)]);
};

module.exports = function (t, a) {
	var resolver = t(['.js', '.json'], isFile, resolvePackageMain, passThru);
	a(resolver('/', 'elo')(identity), null);
	a(resolver('/', 'foo')(identity), null);
	a(resolver('/', 'outer/boo')(identity), null);
	a(resolver('/', './project/foo')(identity), '/project/foo.js');

	a(resolver('/project', './foo')(identity), '/project/foo.js');
	a(resolver('/project', './foo.js')(identity), '/project/foo.js');
	a(resolver('/project', './foo.json')(identity), null);
	a(resolver('/project', './other')(identity), '/project/other.js');
	a(resolver('/project', './other/')(identity), '/project/other/index.js');
	a(resolver('/project', './samename')(identity), '/project/samename');
	a(resolver('/project', './samename.js')(identity), '/project/samename.js');
	a(resolver('/project', './samename.json')(identity), '/project/samename.json');
	a(resolver('/project', './samename')(identity), '/project/samename');
	a(resolver('/project', './dir')(identity), '/project/dir/lorem.js');
	a(resolver('/project', './dir/lorem')(identity), '/project/dir/lorem.js');
	a(resolver('/project', './dir/subdir/bar')(identity), '/project/dir/subdir/bar.js');
	a(resolver('/project/dir', '.')(identity), '/project/dir/lorem.js');
	a(resolver('/project/dir', './')(identity), '/project/dir/lorem.js');
	a(resolver('/project/dir', './lorem')(identity), '/project/dir/lorem.js');
	a(resolver('/project/dir', '../other')(identity), '/project/other.js');
	a(resolver('/project/dir', '../other/')(identity), '/project/other/index.js');
	a(resolver('/project/dir/subdir', '../')(identity), '/project/dir/lorem.js');
	a(resolver('/project/dir/subdir', '../../foo')(identity), '/project/foo.js');

	a(resolver('/project', 'outer')(identity), '/project/node_modules/outer/raz.js');
	a(resolver('/project', 'outer/boo')(identity), '/project/node_modules/outer/boo.js');
	a(resolver('/project', 'outer/boo.json')(identity), null);
	a(resolver('/project', 'outer3')(identity), '/project/node_modules/outer3/index.js');
	a(resolver('/project', 'nested/elo')(identity), null);
	a(resolver('/project/node_modules/outer', 'outer3')(identity),
		'/project/node_modules/outer3/index.js');
	a(resolver('/project/node_modules/outer', 'project/foo')(identity), null);
	a(resolver('/project/node_modules/outer', 'nested/elo')(identity),
		'/project/node_modules/outer/node_modules/nested/elo.js');
	a(resolver('/project/node_modules/outer/node_modules/nested', 'project/foo')(identity), null);
	a(resolver('/project/node_modules/outer/node_modules/nested', 'outer')(identity),
		'/project/node_modules/outer/raz.js');
	a(resolver('/project/node_modules/outer/node_modules/nested', 'outer/boo')(identity),
		'/project/node_modules/outer/boo.js');
	a(resolver('/project/node_modules/outer/node_modules/nested', 'outer3')(identity),
		'/project/node_modules/outer3/index.js');
};
