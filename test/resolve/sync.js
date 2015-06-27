'use strict';

var path = require('path')

  , resolve = path.resolve

  , playgroundDir = resolve(__dirname, '../__playground');

module.exports = function (t, a) {
	a(t(playgroundDir, './foo').value, playgroundDir + '/foo.js');
	a(t(playgroundDir, './foo.js').value, playgroundDir + '/foo.js');
	a(t(playgroundDir, './foo.json').value, null);
	a(t(playgroundDir, './other').value, playgroundDir + '/other.js');
	a(t(playgroundDir, './other/').value, playgroundDir + '/other/index.js');
	a(t(playgroundDir, './samename').value, playgroundDir + '/samename');
	a(t(playgroundDir, './samename.js').value, playgroundDir + '/samename.js');
	a(t(playgroundDir, './samename.json').value, playgroundDir + '/samename.json');
	a(t(playgroundDir, './samename').value, playgroundDir + '/samename');
	a(t(playgroundDir, './dir').value, playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir, './dir/lorem').value, playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir, './dir/subdir/bar').value, playgroundDir + '/dir/subdir/bar.js');
	a(t(playgroundDir + '/dir', '.').value, playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir + '/dir', './').value, playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir + '/dir', './lorem').value, playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir + '/dir', '../other').value, playgroundDir + '/other.js');
	a(t(playgroundDir + '/dir', '../other/').value, playgroundDir + '/other/index.js');
	a(t(playgroundDir + '/dir/subdir', '../').value, playgroundDir + '/dir/lorem.js');
	a(t(playgroundDir + '/dir/subdir', '../../foo').value, playgroundDir + '/foo.js');

	a(t(playgroundDir, 'outer').value, playgroundDir + '/node_modules/outer/raz.js');
	a(t(playgroundDir, 'outer/boo').value, playgroundDir + '/node_modules/outer/boo.js');
	a(t(playgroundDir, 'outer/boo.json').value, null);
	a(t(playgroundDir, 'outer3').value, playgroundDir + '/node_modules/outer3/index.js');
	a(t(playgroundDir, 'nested/elo').value, null);
	a(t(playgroundDir + '/node_modules/outer', 'outer3').value,
		playgroundDir + '/node_modules/outer3/index.js');
	a(t(playgroundDir + '/node_modules/outer', 'project/foo').value, null);
	a(t(playgroundDir + '/node_modules/outer', 'nested/elo').value,
		playgroundDir + '/node_modules/outer/node_modules/nested/elo.js');
	a(t(playgroundDir + '/node_modules/outer/node_modules/nested', 'project/foo').value, null);
	a(t(playgroundDir + '/node_modules/outer/node_modules/nested', 'outer').value,
		playgroundDir + '/node_modules/outer/raz.js');
	a(t(playgroundDir + '/node_modules/outer/node_modules/nested', 'outer/boo').value,
		playgroundDir + '/node_modules/outer/boo.js');
	a(t(playgroundDir + '/node_modules/outer/node_modules/nested', 'outer3').value,
		playgroundDir + '/node_modules/outer3/index.js');
};
