"use strict";

var resolve = require("path").resolve
  , pgDir   = resolve(__dirname, "__playground");

module.exports = function (t, a, d) {
	t(resolve(pgDir, "other/index.js")).done(function (result) {
		a.deep(
			result.sort(),
			[
				resolve(pgDir, "other/index.js"),
				resolve(pgDir, "foo.js"),
				resolve(pgDir, "dir/subdir/bar.js"),
				resolve(pgDir, "dir/lorem.js"),
				resolve(pgDir, "node_modules/outer/raz.js"),
				resolve(pgDir, "node_modules/outer3/index.js")
			].sort()
		);
		d();
	}, d);
};
