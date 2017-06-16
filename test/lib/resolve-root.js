"use strict";

var deferred = require("deferred")
  , path     = require("path");

var resolve = path.resolve
  , rootDir = resolve(__dirname, "../..")
  , playgroundDir = resolve(__dirname, "../__playground");

module.exports = function (t, a, d) {
	deferred(
		t(playgroundDir, true)(function (value) {
			a(value, rootDir, "node_modules");
		}),
		t(resolve(playgroundDir, "otherdir"), true)(function (value) {
			a(value, rootDir, "Empty");
		}),
		t(resolve(playgroundDir, "dir"), true)(function (value) {
			a(value, rootDir, "package.json");
		}),
		t(resolve(playgroundDir, "node_modules/outer"), true)(function (value) {
			a(value, rootDir, "package.json and node_modules");
		}),
		t(resolve(playgroundDir, "node_modules/outer3"), true)(function (value) {
			a(value, rootDir, "In node_modules");
		})
	).done(function () {
		d();
	}, d);
};
