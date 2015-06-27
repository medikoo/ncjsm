'use strict';

var deferred = require('deferred')
  , path     = require('path')

  , resolve = path.resolve

  , playgroundDir = resolve(__dirname, '../__playground');

module.exports = function (t, a, d) {
	deferred(
		t(playgroundDir, './foo').then(function (value) { a(value, playgroundDir + '/foo.js'); }),
		t(playgroundDir, './foo.js').then(function (value) { a(value, playgroundDir + '/foo.js'); }),
		t(playgroundDir, './foo.json').then(function (value) { a(value, null); }),
		t(playgroundDir, './other').then(function (value) { a(value, playgroundDir + '/other.js'); }),
		t(playgroundDir, './other/')
			.then(function (value) { a(value, playgroundDir + '/other/index.js'); }),
		t(playgroundDir, './samename')
			.then(function (value) { a(value, playgroundDir + '/samename'); }),
		t(playgroundDir, './samename.js')
			.then(function (value) { a(value, playgroundDir + '/samename.js'); }),
		t(playgroundDir, './samename.json')
			.then(function (value) { a(value, playgroundDir + '/samename.json'); }),
		t(playgroundDir, './samename')
			.then(function (value) { a(value, playgroundDir + '/samename'); }),
		t(playgroundDir, './dir')
			.then(function (value) { a(value, playgroundDir + '/dir/lorem.js'); }),
		t(playgroundDir, './dir/lorem')
			.then(function (value) { a(value, playgroundDir + '/dir/lorem.js'); }),
		t(playgroundDir, './dir/subdir/bar')
			.then(function (value) { a(value, playgroundDir + '/dir/subdir/bar.js'); }),
		t(playgroundDir + '/dir', '.')
			.then(function (value) { a(value, playgroundDir + '/dir/lorem.js'); }),
		t(playgroundDir + '/dir', './')
			.then(function (value) { a(value, playgroundDir + '/dir/lorem.js'); }),
		t(playgroundDir + '/dir', './lorem')
			.then(function (value) { a(value, playgroundDir + '/dir/lorem.js'); }),
		t(playgroundDir + '/dir', '../other')
			.then(function (value) { a(value, playgroundDir + '/other.js'); }),
		t(playgroundDir + '/dir', '../other/')
			.then(function (value) { a(value, playgroundDir + '/other/index.js'); }),
		t(playgroundDir + '/dir/subdir', '../')
			.then(function (value) { a(value, playgroundDir + '/dir/lorem.js'); }),
		t(playgroundDir + '/dir/subdir', '../../foo')
			.then(function (value) { a(value, playgroundDir + '/foo.js'); }),

		t(playgroundDir, 'outer')
			.then(function (value) { a(value, playgroundDir + '/node_modules/outer/raz.js'); }),
		t(playgroundDir, 'outer/boo')
			.then(function (value) { a(value, playgroundDir + '/node_modules/outer/boo.js'); }),
		t(playgroundDir, 'outer/boo.json').then(function (value) { a(value, null); }),
		t(playgroundDir, 'outer3')
			.then(function (value) { a(value, playgroundDir + '/node_modules/outer3/index.js'); }),
		t(playgroundDir, 'nested/elo').then(function (value) { a(value, null); }),
		t(playgroundDir + '/node_modules/outer', 'outer3')
			.then(function (value) { a(value, playgroundDir + '/node_modules/outer3/index.js'); }),
		t(playgroundDir + '/node_modules/outer', 'project/foo')
			.then(function (value) { a(value, null); }),
		t(playgroundDir + '/node_modules/outer', 'nested/elo')
			.then(function (value) { a(value,
				playgroundDir + '/node_modules/outer/node_modules/nested/elo.js'); }),
		t(playgroundDir + '/node_modules/outer/node_modules/nested', 'project/foo')
			.then(function (value) { a(value, null); }),
		t(playgroundDir + '/node_modules/outer/node_modules/nested', 'outer')
			.then(function (value) { a(value, playgroundDir + '/node_modules/outer/raz.js'); }),
		t(playgroundDir + '/node_modules/outer/node_modules/nested', 'outer/boo')
			.then(function (value) { a(value, playgroundDir + '/node_modules/outer/boo.js'); }),
		t(playgroundDir + '/node_modules/outer/node_modules/nested', 'outer3')
			.then(function (value) { a(value, playgroundDir + '/node_modules/outer3/index.js'); })
	).done(function () { d(); }, d);
};
