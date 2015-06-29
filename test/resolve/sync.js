'use strict';

var path = require('path')

  , resolve = path.resolve

  , playgroundDir = resolve(__dirname, '../__playground');

module.exports = function (t, a) {
	a(t(playgroundDir, './foo'), playgroundDir + '/foo.js');
	a(t(playgroundDir, './foo.js'), playgroundDir + '/foo.js');
	a(t(playgroundDir, './foo.json'), null);
	a(t(playgroundDir, './other'), playgroundDir + '/other.js');
	a(t(playgroundDir, './other/'), playgroundDir + '/other/index.js');
	a(t(playgroundDir, './samename'), playgroundDir + '/samename');
	a(t(playgroundDir, './samename.js'), playgroundDir + '/samename.js');
	a(t(playgroundDir, './samename.json'), playgroundDir + '/samename.json');
	a(t(playgroundDir, './samename'), playgroundDir + '/samename');
	a(t(playgroundDir, './dir'), playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir, './dir/lorem'), playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir, './dir/subdir/bar'), playgroundDir + '/dir/subdir/bar.js');
	a(t(playgroundDir + '/dir', '.'), playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir + '/dir', './'), playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir + '/dir', './lorem'), playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir + '/dir', '../other'), playgroundDir + '/other.js');
	a(t(playgroundDir + '/dir', '../other/'), playgroundDir + '/other/index.js');
	a(t(playgroundDir + '/dir/subdir', '../'), playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir + '/dir/subdir', '../../foo'), playgroundDir + '/foo.js');

	a(t(playgroundDir, 'outer'), playgroundDir + '/node_modules/outer/raz.js');
	a(t(playgroundDir, 'outer/boo'), playgroundDir + '/node_modules/outer/boo.js');
	a(t(playgroundDir, 'outer/boo.json'), null);
	a(t(playgroundDir, 'outer3'), playgroundDir + '/node_modules/outer3/index.js');
	a(t(playgroundDir, 'nested/elo'), null);
	a(t(playgroundDir + '/node_modules/outer', 'outer3'),
		playgroundDir + '/node_modules/outer3/index.js');
	a(t(playgroundDir + '/node_modules/outer', 'project/foo'), null);
	a(t(playgroundDir + '/node_modules/outer', 'nested/elo'),
		playgroundDir + '/node_modules/outer/node_modules/nested/elo.js');
	a(t(playgroundDir + '/node_modules/outer/node_modules/nested', 'project/foo'), null);
	a(t(playgroundDir + '/node_modules/outer/node_modules/nested', 'outer'),
		playgroundDir + '/node_modules/outer/raz.js');
	a(t(playgroundDir + '/node_modules/outer/node_modules/nested', 'outer/boo'),
		playgroundDir + '/node_modules/outer/boo.js');
	a(t(playgroundDir + '/node_modules/outer/node_modules/nested', 'outer3'),
		playgroundDir + '/node_modules/outer3/index.js');
};
