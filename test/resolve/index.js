"use strict";

const deferred    = require("deferred")
    , { resolve } = require("path");

const pgDir = resolve(__dirname, "../__playground");

module.exports = function (t, a, d) {
	deferred(
		t(pgDir, "./foo").then(value => { a(value, resolve(`${ pgDir }/foo.js`)); }),
		t(pgDir, "./foo.js").then(value => { a(value, resolve(`${ pgDir }/foo.js`)); }),
		t(pgDir, "./foo.json").then(value => { a(value, null); }),
		t(pgDir, "./other").then(value => { a(value, resolve(`${ pgDir }/other.js`)); }),
		t(pgDir, "./other/").then(value => { a(value, resolve(`${ pgDir }/other/index.js`)); }),
		t(pgDir, "./samename").then(value => { a(value, resolve(`${ pgDir }/samename`)); }),
		t(pgDir, "./samename.js").then(value => { a(value, resolve(`${ pgDir }/samename.js`)); }),
		t(pgDir, "./samename.json").then(value => {
			a(value, resolve(`${ pgDir }/samename.json`));
		}),
		t(pgDir, "./samename").then(value => { a(value, resolve(`${ pgDir }/samename`)); }),
		t(pgDir, "./dir").then(value => { a(value, resolve(`${ pgDir }/dir/lorem.js`)); }),
		t(pgDir, "./dir/lorem").then(value => { a(value, resolve(`${ pgDir }/dir/lorem.js`)); }),
		t(pgDir, "./dir/subdir/bar").then(value => {
			a(value, resolve(`${ pgDir }/dir/subdir/bar.js`));
		}),
		t(`${ pgDir }/dir`, ".").then(value => { a(value, resolve(`${ pgDir }/dir/lorem.js`)); }),
		t(`${ pgDir }/dir`, "./").then(value => { a(value, resolve(`${ pgDir }/dir/lorem.js`)); }),
		t(`${ pgDir }/dir`, "./lorem").then(value => {
			a(value, resolve(`${ pgDir }/dir/lorem.js`));
		}),
		t(`${ pgDir }/dir`, "../other").then(value => {
			a(value, resolve(`${ pgDir }/other.js`));
		}),
		t(`${ pgDir }/dir`, "../other/").then(value => {
			a(value, resolve(`${ pgDir }/other/index.js`));
		}),
		t(`${ pgDir }/dir/subdir`, "../").then(value => {
			a(value, resolve(`${ pgDir }/dir/lorem.js`));
		}),
		t(`${ pgDir }/dir/subdir`, "../../foo").then(value => {
			a(value, resolve(`${ pgDir }/foo.js`));
		}),
		t(pgDir, "outer").then(value => {
			a(value, resolve(`${ pgDir }/node_modules/outer/raz.js`));
		}),
		t(pgDir, "outer/boo").then(value => {
			a(value, resolve(`${ pgDir }/node_modules/outer/boo.js`));
		}),
		t(pgDir, "outer/boo.json").then(value => { a(value, null); }),
		t(pgDir, "outer3").then(value => {
			a(value, resolve(`${ pgDir }/node_modules/outer3/index.js`));
		}),
		t(pgDir, "pkg-main-dir").then(value => {
			a(value, resolve(`${ pgDir }/node_modules/pkg-main-dir/lib/index.js`));
		}),
		t(pgDir, "nested/elo").then(value => { a(value, null); }),
		t(`${ pgDir }/node_modules/outer`, "outer3").then(value => {
			a(value, resolve(`${ pgDir }/node_modules/outer3/index.js`));
		}),
		t(`${ pgDir }/node_modules/outer`, "project/foo").then(value => { a(value, null); }),
		t(`${ pgDir }/node_modules/outer`, "nested/elo").then(value => {
			a(value, resolve(`${ pgDir }/node_modules/outer/node_modules/nested/elo.js`));
		}),
		t(`${ pgDir }/node_modules/outer/node_modules/nested`, "project/foo").then(value => {
			a(value, null);
		}),
		t(`${ pgDir }/node_modules/outer/node_modules/nested`, "outer").then(value => {
			a(value, resolve(`${ pgDir }/node_modules/outer/raz.js`));
		}),
		t(`${ pgDir }/node_modules/outer/node_modules/nested`, "outer/boo").then(value => {
			a(value, resolve(`${ pgDir }/node_modules/outer/boo.js`));
		}),
		t(`${ pgDir }/node_modules/outer/node_modules/nested`, "outer3").then(value => {
			a(value, resolve(`${ pgDir }/node_modules/outer3/index.js`));
		})
	).done(() => { d(); }, d);
};
