/* eslint max-lines: "off" */

"use strict";

const noop        = require("es5-ext/function/noop")
    , { resolve } = require("path");

const {
	setup: setupFileLinks,
	teardown: teardownFileLinks
} = require("../_lib/setup-playground-file-symlinks");

const {
	setup: setupDirLinks,
	teardown: teardownDirLinks
} = require("../_lib/setup-playground-dir-symlinks");

const playgroundDir = resolve(__dirname, "../__playground");

module.exports = (t, a) => {
	a.deep(t(playgroundDir, "./foo"), {
		targetPath: resolve(`${ playgroundDir }/foo.js`),
		realPath: resolve(`${ playgroundDir }/foo.js`)
	});
	a.deep(t(playgroundDir, "./foo.js"), {
		targetPath: resolve(`${ playgroundDir }/foo.js`),
		realPath: resolve(`${ playgroundDir }/foo.js`)
	});
	a(t(playgroundDir, "./foo.json"), null);
	a.deep(t(playgroundDir, "./other"), {
		targetPath: resolve(`${ playgroundDir }/other.js`),
		realPath: resolve(`${ playgroundDir }/other.js`)
	});
	a.deep(t(playgroundDir, "./other/"), {
		targetPath: resolve(`${ playgroundDir }/other/index.js`),
		realPath: resolve(`${ playgroundDir }/other/index.js`)
	});
	a.deep(t(playgroundDir, "./samename"), {
		targetPath: resolve(`${ playgroundDir }/samename`),
		realPath: resolve(`${ playgroundDir }/samename`)
	});
	a.deep(t(playgroundDir, "./samename.js"), {
		targetPath: resolve(`${ playgroundDir }/samename.js`),
		realPath: resolve(`${ playgroundDir }/samename.js`)
	});
	a.deep(t(playgroundDir, "./samename.json"), {
		targetPath: resolve(`${ playgroundDir }/samename.json`),
		realPath: resolve(`${ playgroundDir }/samename.json`)
	});
	a.deep(t(playgroundDir, "./samename"), {
		targetPath: resolve(`${ playgroundDir }/samename`),
		realPath: resolve(`${ playgroundDir }/samename`)
	});
	a.deep(t(playgroundDir, "./dir"), {
		targetPath: resolve(`${ playgroundDir }/dir/lorem.js`),
		realPath: resolve(`${ playgroundDir }/dir/lorem.js`)
	});
	a.deep(t(playgroundDir, "./dir/lorem"), {
		targetPath: resolve(`${ playgroundDir }/dir/lorem.js`),
		realPath: resolve(`${ playgroundDir }/dir/lorem.js`)
	});
	a.deep(t(playgroundDir, "./dir/subdir/bar"), {
		targetPath: resolve(`${ playgroundDir }/dir/subdir/bar.js`),
		realPath: resolve(`${ playgroundDir }/dir/subdir/bar.js`)
	});
	a.deep(t(`${ playgroundDir }/dir`, "."), {
		targetPath: resolve(`${ playgroundDir }/dir/lorem.js`),
		realPath: resolve(`${ playgroundDir }/dir/lorem.js`)
	});
	a.deep(t(`${ playgroundDir }/dir`, "./"), {
		targetPath: resolve(`${ playgroundDir }/dir/lorem.js`),
		realPath: resolve(`${ playgroundDir }/dir/lorem.js`)
	});
	a.deep(t(`${ playgroundDir }/dir`, "./lorem"), {
		targetPath: resolve(`${ playgroundDir }/dir/lorem.js`),
		realPath: resolve(`${ playgroundDir }/dir/lorem.js`)
	});
	a.deep(t(`${ playgroundDir }/dir`, "../other"), {
		targetPath: resolve(`${ playgroundDir }/other.js`),
		realPath: resolve(`${ playgroundDir }/other.js`)
	});
	a.deep(t(`${ playgroundDir }/dir`, "../other/"), {
		targetPath: resolve(`${ playgroundDir }/other/index.js`),
		realPath: resolve(`${ playgroundDir }/other/index.js`)
	});
	a.deep(t(`${ playgroundDir }/dir/subdir`, "../"), {
		targetPath: resolve(`${ playgroundDir }/dir/lorem.js`),
		realPath: resolve(`${ playgroundDir }/dir/lorem.js`)
	});
	a.deep(t(`${ playgroundDir }/dir/subdir`, "../../foo"), {
		targetPath: resolve(`${ playgroundDir }/foo.js`),
		realPath: resolve(`${ playgroundDir }/foo.js`)
	});

	a.deep(t(playgroundDir, "outer"), {
		targetPath: resolve(`${ playgroundDir }/node_modules/outer/raz.js`),
		realPath: resolve(`${ playgroundDir }/node_modules/outer/raz.js`)
	});
	a.deep(t(playgroundDir, "outer/boo"), {
		targetPath: resolve(`${ playgroundDir }/node_modules/outer/boo.js`),
		realPath: resolve(`${ playgroundDir }/node_modules/outer/boo.js`)
	});
	a(t(playgroundDir, "outer/boo.json"), null);
	a.deep(t(playgroundDir, "outer3"), {
		targetPath: resolve(`${ playgroundDir }/node_modules/outer3/index.js`),
		realPath: resolve(`${ playgroundDir }/node_modules/outer3/index.js`)
	});
	a(t(playgroundDir, "nested/elo"), null);
	a.deep(t(`${ playgroundDir }/node_modules/outer`, "outer3"), {
		targetPath: resolve(`${ playgroundDir }/node_modules/outer3/index.js`),
		realPath: resolve(`${ playgroundDir }/node_modules/outer3/index.js`)
	});
	a(t(`${ playgroundDir }/node_modules/outer`, "project/foo"), null);
	a.deep(t(`${ playgroundDir }/node_modules/outer`, "nested/elo"), {
		targetPath: resolve(`${ playgroundDir }/node_modules/outer/node_modules/nested/elo.js`),
		realPath: resolve(`${ playgroundDir }/node_modules/outer/node_modules/nested/elo.js`)
	});
	a(t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "project/foo"), null);
	a.deep(t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "outer"), {
		targetPath: resolve(`${ playgroundDir }/node_modules/outer/raz.js`),
		realPath: resolve(`${ playgroundDir }/node_modules/outer/raz.js`)
	});
	a.deep(t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "outer/boo"), {
		targetPath: resolve(`${ playgroundDir }/node_modules/outer/boo.js`),
		realPath: resolve(`${ playgroundDir }/node_modules/outer/boo.js`)
	});
	a.deep(t(`${ playgroundDir }/node_modules/outer/node_modules/nested`, "outer3"), {
		targetPath: resolve(`${ playgroundDir }/node_modules/outer3/index.js`),
		realPath: resolve(`${ playgroundDir }/node_modules/outer3/index.js`)
	});

	// Symlink tests
	return Promise.all([
		setupFileLinks().then(
			() => {
				let testError, teardownPromise;
				try {
					a.deep(t(playgroundDir, "./valid-file-link"), {
						targetPath: resolve(`${ playgroundDir }/valid-file-link.js`),
						realPath: resolve(`${ playgroundDir }/file-link-target.js`)
					});
					a.deep(t(playgroundDir, "./deep-file-link"), {
						targetPath: resolve(`${ playgroundDir }/deep-file-link.js`),
						realPath: resolve(`${ playgroundDir }/deep-file-link-target.js`)
					});
					a(t(playgroundDir, "./invalid-file-link"), null);
					a.deep(t(playgroundDir, "./invalid-file-link-with-a-fallback"), {
						targetPath: resolve(
							`${ playgroundDir }/invalid-file-link-with-a-fallback.json`
						),
						realPath: resolve(
							`${ playgroundDir }/invalid-file-link-with-a-fallback.json`
						)
					});
				} catch (error) {
					testError = error;
				} finally {
					teardownPromise = teardownFileLinks();
				}
				return teardownPromise.then(() => { if (testError) throw testError; });
			},
			error => {
				if (error.code === "EPERM") {
					process.stdout.write(
						"Warning: Could not test file symlinks due to not suffient " +
							"process permissions to create them\n"
					);
					return;
				}
				throw error;
			}
		),
		setupDirLinks().then(() => {
			let testError, teardownPromise;
			try {
				a.deep(t(playgroundDir, "./valid-dir-link"), {
					targetPath: resolve(`${ playgroundDir }/valid-dir-link/index.js`),
					realPath: resolve(`${ playgroundDir }/dir-link-target/index.js`)
				});
				a.deep(t(playgroundDir, "./deep-dir-link"), {
					targetPath: resolve(`${ playgroundDir }/deep-dir-link/index.js`),
					realPath: resolve(`${ playgroundDir }/deep-dir-link-target/index.js`)
				});
				a(t(playgroundDir, "./invalid-dir-link"), null);
			} catch (error) {
				testError = error;
			} finally {
				teardownPromise = teardownDirLinks();
			}
			return teardownPromise.then(() => { if (testError) throw testError; });
		})
	]).then(noop);
};
