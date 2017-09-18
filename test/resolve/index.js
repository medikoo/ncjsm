"use strict";

var deferred = require("deferred")
  , path     = require("path")
  , resolve  = path.resolve
  , pgDir    = resolve(__dirname, "../__playground");

module.exports = function (t, a, d) {
	deferred(
		t(pgDir, "./foo").then(function (value) {
			a(value, resolve(pgDir + "/foo.js"));
		}),
		t(pgDir, "./foo.js").then(function (value) {
			a(value, resolve(pgDir + "/foo.js"));
		}),
		t(pgDir, "./foo.json").then(function (value) {
			a(value, null);
		}),
		t(pgDir, "./other").then(function (value) {
			a(value, resolve(pgDir + "/other.js"));
		}),
		t(pgDir, "./other/").then(function (value) {
			a(value, resolve(pgDir + "/other/index.js"));
		}),
		t(pgDir, "./samename").then(function (value) {
			a(value, resolve(pgDir + "/samename"));
		}),
		t(pgDir, "./samename.js").then(function (value) {
			a(value, resolve(pgDir + "/samename.js"));
		}),
		t(pgDir, "./samename.json").then(function (value) {
			a(value, resolve(pgDir + "/samename.json"));
		}),
		t(pgDir, "./samename").then(function (value) {
			a(value, resolve(pgDir + "/samename"));
		}),
		t(pgDir, "./dir").then(function (value) {
			a(value, resolve(pgDir + "/dir/lorem.js"));
		}),
		t(pgDir, "./dir/lorem").then(function (value) {
			a(value, resolve(pgDir + "/dir/lorem.js"));
		}),
		t(pgDir, "./dir/subdir/bar").then(function (value) {
			a(value, resolve(pgDir + "/dir/subdir/bar.js"));
		}),
		t(pgDir + "/dir", ".").then(function (value) {
			a(value, resolve(pgDir + "/dir/lorem.js"));
		}),
		t(pgDir + "/dir", "./").then(function (value) {
			a(value, resolve(pgDir + "/dir/lorem.js"));
		}),
		t(pgDir + "/dir", "./lorem").then(function (value) {
			a(value, resolve(pgDir + "/dir/lorem.js"));
		}),
		t(pgDir + "/dir", "../other").then(function (value) {
			a(value, resolve(pgDir + "/other.js"));
		}),
		t(pgDir + "/dir", "../other/").then(function (value) {
			a(value, resolve(pgDir + "/other/index.js"));
		}),
		t(pgDir + "/dir/subdir", "../").then(function (value) {
			a(value, resolve(pgDir + "/dir/lorem.js"));
		}),
		t(pgDir + "/dir/subdir", "../../foo").then(function (value) {
			a(value, resolve(pgDir + "/foo.js"));
		}),
		t(pgDir, "outer").then(function (value) {
			a(value, resolve(pgDir + "/node_modules/outer/raz.js"));
		}),
		t(pgDir, "outer/boo").then(function (value) {
			a(value, resolve(pgDir + "/node_modules/outer/boo.js"));
		}),
		t(pgDir, "outer/boo.json").then(function (value) {
			a(value, null);
		}),
		t(pgDir, "outer3").then(function (value) {
			a(value, resolve(pgDir + "/node_modules/outer3/index.js"));
		}),
		t(pgDir, "pkg-main-dir").then(function (value) {
			a(value, resolve(pgDir + "/node_modules/pkg-main-dir/lib/index.js"));
		}),
		t(pgDir, "nested/elo").then(function (value) {
			a(value, null);
		}),
		t(pgDir + "/node_modules/outer", "outer3").then(function (value) {
			a(value, resolve(pgDir + "/node_modules/outer3/index.js"));
		}),
		t(pgDir + "/node_modules/outer", "project/foo").then(function (value) {
			a(value, null);
		}),
		t(pgDir + "/node_modules/outer", "nested/elo").then(function (value) {
			a(value, resolve(pgDir + "/node_modules/outer/node_modules/nested/elo.js"));
		}),
		t(pgDir + "/node_modules/outer/node_modules/nested", "project/foo").then(function (value) {
			a(value, null);
		}),
		t(pgDir + "/node_modules/outer/node_modules/nested", "outer").then(function (value) {
			a(value, resolve(pgDir + "/node_modules/outer/raz.js"));
		}),
		t(pgDir + "/node_modules/outer/node_modules/nested", "outer/boo").then(function (value) {
			a(value, resolve(pgDir + "/node_modules/outer/boo.js"));
		}),
		t(pgDir + "/node_modules/outer/node_modules/nested", "outer3").then(function (value) {
			a(value, resolve(pgDir + "/node_modules/outer3/index.js"));
		})
	).done(function () {
		d();
	}, d);
};
