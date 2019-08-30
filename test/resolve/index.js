"use strict";

const { resolve } = require("path");
const { setup, teardown } = require("../_lib/setup-playground-symlinks");

const playgroundDir = resolve(__dirname, "../__playground");

module.exports = async (t, a) => {
	a(await t(playgroundDir, "./foo"), resolve(`${ playgroundDir }/foo.js`));
	a(await t(playgroundDir, "./foo.js"), resolve(`${ playgroundDir }/foo.js`));
	a(await t(playgroundDir, "./foo.json"), null);
	a(await t(playgroundDir, "./other"), resolve(`${ playgroundDir }/other.js`));
	a(await t(playgroundDir, "./other/"), resolve(`${ playgroundDir }/other/index.js`));
	a(await t(playgroundDir, "./samename"), resolve(`${ playgroundDir }/samename`));
	a(await t(playgroundDir, "./samename.js"), resolve(`${ playgroundDir }/samename.js`));
	a(await t(playgroundDir, "./samename.json"), resolve(`${ playgroundDir }/samename.json`));
	a(await t(playgroundDir, "./samename"), resolve(`${ playgroundDir }/samename`));
	a(await t(playgroundDir, "./dir"), resolve(`${ playgroundDir }/dir/lorem.js`));
	a(await t(playgroundDir, "./dir/lorem"), resolve(`${ playgroundDir }/dir/lorem.js`));
	a(await t(playgroundDir, "./dir/subdir/bar"), resolve(`${ playgroundDir }/dir/subdir/bar.js`));
	a(await t(`${ playgroundDir }/dir`, "."), resolve(`${ playgroundDir }/dir/lorem.js`));
	a(await t(`${ playgroundDir }/dir`, "./"), resolve(`${ playgroundDir }/dir/lorem.js`));
	a(await t(`${ playgroundDir }/dir`, "./lorem"), resolve(`${ playgroundDir }/dir/lorem.js`));
	a(await t(`${ playgroundDir }/dir`, "../other"), resolve(`${ playgroundDir }/other.js`));
	a(await t(`${ playgroundDir }/dir`, "../other/"), resolve(`${ playgroundDir }/other/index.js`));
	a(await t(`${ playgroundDir }/dir/subdir`, "../"), resolve(`${ playgroundDir }/dir/lorem.js`));
	a(await t(`${ playgroundDir }/dir/subdir`, "../../foo"), resolve(`${ playgroundDir }/foo.js`));
	a(await t(playgroundDir, "outer"), resolve(`${ playgroundDir }/node_modules/outer/raz.js`));
	a(await t(playgroundDir, "outer/boo"), resolve(`${ playgroundDir }/node_modules/outer/boo.js`));
	a(await t(playgroundDir, "outer/boo.json"), null);
	a(await t(playgroundDir, "outer3"), resolve(`${ playgroundDir }/node_modules/outer3/index.js`));
	a(
		await t(playgroundDir, "pkg-main-dir"),
		resolve(`${ playgroundDir }/node_modules/pkg-main-dir/lib/index.js`)
	);
	a(await t(playgroundDir, "nested/elo"), null);
	a(
		await t(`${ playgroundDir }/node_modules/outer`, "outer3"),
		resolve(`${ playgroundDir }/node_modules/outer3/index.js`)
	);
	a(await t(`${ playgroundDir }/node_modules/outer`, "project/foo"), null);
	a(
		await t(`${ playgroundDir }/node_modules/outer`, "nested/elo"),
		resolve(`${ playgroundDir }/node_modules/outer/node_modules/nested/elo.js`)
	);
	a(await t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "project/foo"), null);
	a(
		await t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "outer"),
		resolve(`${ playgroundDir }/node_modules/outer/raz.js`)
	);
	a(
		await t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "outer/boo"),
		resolve(`${ playgroundDir }/node_modules/outer/boo.js`)
	);
	a(
		await t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "outer3"),
		resolve(`${ playgroundDir }/node_modules/outer3/index.js`)
	);

	// Symlink tests
	await setup();
	try {
		a(await t(playgroundDir, "./valid-link"), resolve(`${ playgroundDir }/valid-link.js`));
		a(await t(playgroundDir, "./deep-link"), resolve(`${ playgroundDir }/deep-link.js`));
		a(await t(playgroundDir, "./invalid-link"), null);
		a(
			await t(playgroundDir, "./invalid-link-with-a-fallback"),
			resolve(`${ playgroundDir }/invalid-link-with-a-fallback.json`)
		);
	} finally {
		await teardown();
	}
};
