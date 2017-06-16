"use strict";

var path          = require("path")
  , resolve       = path.resolve
  , playgroundDir = resolve(__dirname, "../__playground");

module.exports = function (t, a) {
	a(t(playgroundDir, "./foo"), resolve(playgroundDir + "/foo.js"));
	a(t(playgroundDir, "./foo.js"), resolve(playgroundDir + "/foo.js"));
	a(t(playgroundDir, "./foo.json"), null);
	a(t(playgroundDir, "./other"), resolve(playgroundDir + "/other.js"));
	a(t(playgroundDir, "./other/"), resolve(playgroundDir + "/other/index.js"));
	a(t(playgroundDir, "./samename"), resolve(playgroundDir + "/samename"));
	a(t(playgroundDir, "./samename.js"), resolve(playgroundDir + "/samename.js"));
	a(t(playgroundDir, "./samename.json"), resolve(playgroundDir + "/samename.json"));
	a(t(playgroundDir, "./samename"), resolve(playgroundDir + "/samename"));
	a(t(playgroundDir, "./dir"), resolve(playgroundDir + "/dir/lorem.js"));
	a(t(playgroundDir, "./dir/lorem"), resolve(playgroundDir + "/dir/lorem.js"));
	a(t(playgroundDir, "./dir/subdir/bar"), resolve(playgroundDir + "/dir/subdir/bar.js"));
	a(t(playgroundDir + "/dir", "."), resolve(playgroundDir + "/dir/lorem.js"));
	a(t(playgroundDir + "/dir", "./"), resolve(playgroundDir + "/dir/lorem.js"));
	a(t(playgroundDir + "/dir", "./lorem"), resolve(playgroundDir + "/dir/lorem.js"));
	a(t(playgroundDir + "/dir", "../other"), resolve(playgroundDir + "/other.js"));
	a(t(playgroundDir + "/dir", "../other/"), resolve(playgroundDir + "/other/index.js"));
	a(t(playgroundDir + "/dir/subdir", "../"), resolve(playgroundDir + "/dir/lorem.js"));
	a(t(playgroundDir + "/dir/subdir", "../../foo"), resolve(playgroundDir + "/foo.js"));

	a(t(playgroundDir, "outer"), resolve(playgroundDir + "/node_modules/outer/raz.js"));
	a(t(playgroundDir, "outer/boo"), resolve(playgroundDir + "/node_modules/outer/boo.js"));
	a(t(playgroundDir, "outer/boo.json"), null);
	a(t(playgroundDir, "outer3"), resolve(playgroundDir + "/node_modules/outer3/index.js"));
	a(t(playgroundDir, "nested/elo"), null);
	a(
		t(playgroundDir + "/node_modules/outer", "outer3"),
		resolve(playgroundDir + "/node_modules/outer3/index.js")
	);
	a(t(playgroundDir + "/node_modules/outer", "project/foo"), null);
	a(
		t(playgroundDir + "/node_modules/outer", "nested/elo"),
		resolve(playgroundDir + "/node_modules/outer/node_modules/nested/elo.js")
	);
	a(t(playgroundDir + "/node_modules/outer/node_modules/nested", "project/foo"), null);
	a(
		t(playgroundDir + "/node_modules/outer/node_modules/nested", "outer"),
		resolve(playgroundDir + "/node_modules/outer/raz.js")
	);
	a(
		t(playgroundDir + "/node_modules/outer/node_modules/nested", "outer/boo"),
		resolve(playgroundDir + "/node_modules/outer/boo.js")
	);
	a(
		t(playgroundDir + "/node_modules/outer/node_modules/nested", "outer3"),
		resolve(playgroundDir + "/node_modules/outer3/index.js")
	);
};
