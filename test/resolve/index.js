/* eslint max-lines: "off" */

"use strict";

const noop                = require("es5-ext/function/noop")
    , { resolve }         = require("path")
    , { setup, teardown } = require("../_lib/setup-playground-file-symlinks");

const playgroundDir = resolve(__dirname, "../__playground");

module.exports = (t, a) =>
	Promise.all([
		t(playgroundDir, "./foo").then(value => {
			a(value, resolve(`${ playgroundDir }/foo.js`));
		}),
		t(playgroundDir, "./foo.js").then(value => {
			a(value, resolve(`${ playgroundDir }/foo.js`));
		}),
		t(playgroundDir, "./foo.json").then(value => { a(value, null); }),
		t(playgroundDir, "./other").then(value => {
			a(value, resolve(`${ playgroundDir }/other.js`));
		}),
		t(playgroundDir, "./other/").then(value => {
			a(value, resolve(`${ playgroundDir }/other/index.js`));
		}),
		t(playgroundDir, "./samename").then(value => {
			a(value, resolve(`${ playgroundDir }/samename`));
		}),
		t(playgroundDir, "./samename.js").then(value => {
			a(value, resolve(`${ playgroundDir }/samename.js`));
		}),
		t(playgroundDir, "./samename.json").then(value => {
			a(value, resolve(`${ playgroundDir }/samename.json`));
		}),
		t(playgroundDir, "./samename").then(value => {
			a(value, resolve(`${ playgroundDir }/samename`));
		}),
		t(playgroundDir, "./dir").then(value => {
			a(value, resolve(`${ playgroundDir }/dir/lorem.js`));
		}),
		t(playgroundDir, "./dir/lorem").then(value => {
			a(value, resolve(`${ playgroundDir }/dir/lorem.js`));
		}),
		t(playgroundDir, "./dir/subdir/bar").then(value => {
			a(value, resolve(`${ playgroundDir }/dir/subdir/bar.js`));
		}),
		t(`${ playgroundDir }/dir`, ".").then(value => {
			a(value, resolve(`${ playgroundDir }/dir/lorem.js`));
		}),
		t(`${ playgroundDir }/dir`, "./").then(value => {
			a(value, resolve(`${ playgroundDir }/dir/lorem.js`));
		}),
		t(`${ playgroundDir }/dir`, "./lorem").then(value => {
			a(value, resolve(`${ playgroundDir }/dir/lorem.js`));
		}),
		t(`${ playgroundDir }/dir`, "../other").then(value => {
			a(value, resolve(`${ playgroundDir }/other.js`));
		}),
		t(`${ playgroundDir }/dir`, "../other/").then(value => {
			a(value, resolve(`${ playgroundDir }/other/index.js`));
		}),
		t(`${ playgroundDir }/dir/subdir`, "../").then(value => {
			a(value, resolve(`${ playgroundDir }/dir/lorem.js`));
		}),
		t(`${ playgroundDir }/dir/subdir`, "../../foo").then(value => {
			a(value, resolve(`${ playgroundDir }/foo.js`));
		}),
		t(playgroundDir, "outer").then(value => {
			a(value, resolve(`${ playgroundDir }/node_modules/outer/raz.js`));
		}),
		t(playgroundDir, "outer/boo").then(value => {
			a(value, resolve(`${ playgroundDir }/node_modules/outer/boo.js`));
		}),
		t(playgroundDir, "outer/boo.json").then(value => { a(value, null); }),
		t(playgroundDir, "outer3").then(value => {
			a(value, resolve(`${ playgroundDir }/node_modules/outer3/index.js`));
		}),
		t(playgroundDir, "pkg-main-dir").then(value => {
			a(value, resolve(`${ playgroundDir }/node_modules/pkg-main-dir/lib/index.js`));
		}),
		t(playgroundDir, "nested/elo").then(value => { a(value, null); }),
		t(`${ playgroundDir }/node_modules/outer`, "outer3").then(value => {
			a(value, resolve(`${ playgroundDir }/node_modules/outer3/index.js`));
		}),
		t(`${ playgroundDir }/node_modules/outer`, "project/foo").then(value => {
			a(value, null);
		}),
		t(`${ playgroundDir }/node_modules/outer`, "nested/elo").then(value => {
			a(value, resolve(`${ playgroundDir }/node_modules/outer/node_modules/nested/elo.js`));
		}),
		t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "project/foo").then(
			value => { a(value, null); }
		),
		t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "outer").then(value => {
			a(value, resolve(`${ playgroundDir }/node_modules/outer/raz.js`));
		}),
		t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "outer/boo").then(value => {
			a(value, resolve(`${ playgroundDir }/node_modules/outer/boo.js`));
		}),
		t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "outer3").then(value => {
			a(value, resolve(`${ playgroundDir }/node_modules/outer3/index.js`));
		}),

		setup().then(() =>
			Promise.all([
				t(playgroundDir, "./valid-link").then(value => {
					a(value, resolve(`${ playgroundDir }/valid-link.js`));
				}),
				t(playgroundDir, "./deep-link").then(value => {
					a(value, resolve(`${ playgroundDir }/deep-link.js`));
				}),
				t(playgroundDir, "./invalid-link").then(value => a(value, null)),
				t(playgroundDir, "./invalid-link-with-a-fallback").then(value => {
					a(value, resolve(`${ playgroundDir }/invalid-link-with-a-fallback.json`));
				})
			]).then(teardown, error => teardown.then(() => { throw error; }))
		)
	]).then(noop);
