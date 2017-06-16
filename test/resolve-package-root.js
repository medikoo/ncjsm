"use strict";

var deferred      = require("deferred")
  , path          = require("path")
  , resolve       = path.resolve
  , playgroundDir = resolve(__dirname, "__playground");

module.exports = function (t, a, d) {
	deferred(
		t(playgroundDir)(function (value) {
			a(value, playgroundDir, "node_modules");
		}),
		t(resolve(playgroundDir, "otherdir"))(function (value) {
			a(value, playgroundDir, "Empty");
		}),
		t(resolve(playgroundDir, "dir"))(function (value) {
			a(value, resolve(playgroundDir, "dir"), "package.json");
		}),
		t(resolve(playgroundDir, "node_modules/outer"))(function (value) {
			a(value, resolve(playgroundDir, "node_modules/outer"), "package.json and node_modules");
		}),
		t(resolve(playgroundDir, "node_modules/outer3"))(function (value) {
			a(value, playgroundDir, "In node_modules");
		})
	).done(function () {
		d();
	}, d);
};
