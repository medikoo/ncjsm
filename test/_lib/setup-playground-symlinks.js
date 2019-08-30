"use strict";

const { resolve } = require("path")
    , symlink     = require("fs2/symlink")
    , unlink      = require("fs2/unlink");

const playgroundDir = resolve(__dirname, "../__playground"), symlinkOptions = { type: "junction" };

const links = [
	{ destination: resolve(playgroundDir, "another-deep-link.js"), source: "deep-link-target.js" },
	{ destination: resolve(playgroundDir, "deep-link.js"), source: "another-deep-link.js" },
	{
		destination: resolve(playgroundDir, "invalid-link-with-a-fallback.js"),
		source: "non-existing-file.js"
	},
	{ destination: resolve(playgroundDir, "invalid-link.js"), source: "non-existing-file.js" },
	{ destination: resolve(playgroundDir, "valid-link.js"), source: "link-target.js" }
];

module.exports = {
	setup: () =>
		Promise.all(
			links.map(({ source, destination }) => symlink(source, destination, symlinkOptions))
		),
	teardown: () => Promise.all(links.map(({ destination }) => unlink(destination)))
};
