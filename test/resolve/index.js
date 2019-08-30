"use strict";

const { resolve } = require("path");

const pgDir = resolve(__dirname, "../__playground");

module.exports = async (t, a) => {
	a(await t(pgDir, "./foo"), resolve(`${ pgDir }/foo.js`));
	a(await t(pgDir, "./foo.js"), resolve(`${ pgDir }/foo.js`));
	a(await t(pgDir, "./foo.json"), null);
	a(await t(pgDir, "./other"), resolve(`${ pgDir }/other.js`));
	a(await t(pgDir, "./other/"), resolve(`${ pgDir }/other/index.js`));
	a(await t(pgDir, "./samename"), resolve(`${ pgDir }/samename`));
	a(await t(pgDir, "./samename.js"), resolve(`${ pgDir }/samename.js`));
	a(await t(pgDir, "./samename.json"), resolve(`${ pgDir }/samename.json`));
	a(await t(pgDir, "./samename"), resolve(`${ pgDir }/samename`));
	a(await t(pgDir, "./dir"), resolve(`${ pgDir }/dir/lorem.js`));
	a(await t(pgDir, "./dir/lorem"), resolve(`${ pgDir }/dir/lorem.js`));
	a(await t(pgDir, "./dir/subdir/bar"), resolve(`${ pgDir }/dir/subdir/bar.js`));
	a(await t(`${ pgDir }/dir`, "."), resolve(`${ pgDir }/dir/lorem.js`));
	a(await t(`${ pgDir }/dir`, "./"), resolve(`${ pgDir }/dir/lorem.js`));
	a(await t(`${ pgDir }/dir`, "./lorem"), resolve(`${ pgDir }/dir/lorem.js`));
	a(await t(`${ pgDir }/dir`, "../other"), resolve(`${ pgDir }/other.js`));
	a(await t(`${ pgDir }/dir`, "../other/"), resolve(`${ pgDir }/other/index.js`));
	a(await t(`${ pgDir }/dir/subdir`, "../"), resolve(`${ pgDir }/dir/lorem.js`));
	a(await t(`${ pgDir }/dir/subdir`, "../../foo"), resolve(`${ pgDir }/foo.js`));
	a(await t(pgDir, "outer"), resolve(`${ pgDir }/node_modules/outer/raz.js`));
	a(await t(pgDir, "outer/boo"), resolve(`${ pgDir }/node_modules/outer/boo.js`));
	a(await t(pgDir, "outer/boo.json"), null);
	a(await t(pgDir, "outer3"), resolve(`${ pgDir }/node_modules/outer3/index.js`));
	a(await t(pgDir, "pkg-main-dir"), resolve(`${ pgDir }/node_modules/pkg-main-dir/lib/index.js`));
	a(await t(pgDir, "nested/elo"), null);
	a(
		await t(`${ pgDir }/node_modules/outer`, "outer3"),
		resolve(`${ pgDir }/node_modules/outer3/index.js`)
	);
	a(await t(`${ pgDir }/node_modules/outer`, "project/foo"), null);
	a(
		await t(`${ pgDir }/node_modules/outer`, "nested/elo"),
		resolve(`${ pgDir }/node_modules/outer/node_modules/nested/elo.js`)
	);
	a(await t(`${ pgDir }/node_modules/outer/node_modules/nested`, "project/foo"), null);
	a(
		await t(`${ pgDir }/node_modules/outer/node_modules/nested`, "outer"),
		resolve(`${ pgDir }/node_modules/outer/raz.js`)
	);
	a(
		await t(`${ pgDir }/node_modules/outer/node_modules/nested`, "outer/boo"),
		resolve(`${ pgDir }/node_modules/outer/boo.js`)
	);
	a(
		await t(`${ pgDir }/node_modules/outer/node_modules/nested`, "outer3"),
		resolve(`${ pgDir }/node_modules/outer3/index.js`)
	);

	// Symlink tests
	a(await t(pgDir, "./valid-link"), resolve(`${ pgDir }/valid-link.js`));
	a(await t(pgDir, "./deep-link"), resolve(`${ pgDir }/deep-link.js`));
	a(await t(pgDir, "./invalid-link"), null);
	a(
		await t(pgDir, "./invalid-link-with-a-fallback"),
		resolve(`${ pgDir }/invalid-link-with-a-fallback.json`)
	);
};
