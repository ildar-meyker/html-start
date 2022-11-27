"use strict";

const fs = require("fs");

const webpack = require("webpack-stream");
const compiler = require("webpack");

const gulp = require("gulp");
const { watch, series } = require("gulp");
const gulpif = require("gulp-if");
const sass = require("gulp-sass")(require("sass"));
const less = require("gulp-less");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const cleancss = require("gulp-clean-css");
const filelist = require("gulp-filelist");
const rename = require("gulp-rename");
const rsync = require("gulp-rsync");
const zip = require("gulp-zip");
const extender = require("gulp-html-extend");
const cachebust = require("gulp-cache-bust");

const server = require("browser-sync").create();
const autoprefixer = require("autoprefixer");
const del = require("del");

const pkg = require("./package.json");

// if (pkg.name === "project-name") {
// 	throw new Error(
// 		"Project has a default name. Change it first in package.json."
// 	);
// }

// if (pkg.repository.url === "") {
// 	throw new Error("The repository url is not specified.");
// }

require("gulp-grunt")(gulp);

var path = {
	assets: [
		"src/fonts/**/*",
		"src/video/**/*",
		"src/data/**/*",
		"src/robots.txt",
	],
};

function renderHtml(path) {
	const src = path || "./src/markup/*.html";

	return gulp
		.src(src)
		.pipe(extender({ annotations: false, verbose: false }))
		.pipe(cachebust({ type: "timestamp" }))
		.pipe(gulp.dest("./public"));
}

gulp.task("templates", function () {
	return renderHtml();
});

gulp.task("create-config", function (cb) {
	const content = {
		name: pkg.name,
		repository: {
			url: pkg.repository.url,
		},
	};

	fs.writeFile("./public/config.json", JSON.stringify(content), cb);
});

/*----------  Filelist  ----------*/

gulp.task("filelist", function () {
	return gulp
		.src("src/markup/*.html")
		.pipe(filelist("filelist.json", { flatten: true }))
		.pipe(gulp.dest("./public"));
});

/*----------  Scripts  ----------*/

gulp.task("scripts", function () {
	return gulp
		.src("src/js/main.js")
		.pipe(webpack(require("./webpack.config.js"), compiler))
		.pipe(gulp.dest("public/js/"));
});

/*----------  Styles  ----------*/

gulp.task("styles", function () {
	return gulp
		.src(["src/styles/*.*", "!src/styles/_*.*"])
		.pipe(
			gulpif(
				"*.scss",
				sass({
					importer: require("node-sass-tilde-importer"),
				}).on("error", sass.logError)
			)
		)
		.pipe(gulpif("*.less", less()))
		.pipe(postcss([autoprefixer()]))
		.pipe(gulp.dest("public/css/"))
		.pipe(sourcemaps.init())
		.pipe(cleancss())
		.pipe(
			rename({
				suffix: ".min",
			})
		)
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("public/css/"))
		.pipe(server.stream());
});

/*----------  Assets  ----------*/
gulp.task("images", function () {
	return gulp
		.src("src/images/**", { base: "src/" })
		.pipe(gulp.dest("./public"));
});

gulp.task("copy", function () {
	return gulp.src(path.assets, { base: "src/" }).pipe(gulp.dest("./public"));
});

/*----------  Server  ----------*/

gulp.task("watch", function () {
	watch("./src/markup/*.html").on("change", (path) => {
		renderHtml(path);
		server.reload();
	});

	watch("./src/styles/**/*", { delay: 2000 }, series("styles"));
	watch("./src/js/**/*", { delay: 2000 }, series("scripts", "reload"));
	watch("./src/images/**/*", { delay: 2000 }, series("images", "reload"));
	watch(path.assets, { delay: 2000 }, series("copy", "reload"));
});

gulp.task("reload", function (done) {
	server.reload();
	done();
});

gulp.task("server", function () {
	server.init({
		server: {
			baseDir: "public/",
		},
	});
});

gulp.task("browser", gulp.parallel("server", "watch"));

/*----------  Build  ----------*/
gulp.task("clean", function () {
	return del("public/");
});

gulp.task(
	"build",
	gulp.parallel(
		"copy",
		"create-config",
		"templates",
		"styles",
		"images",
		"scripts"
	)
);

/*----------  Deploy  ----------*/
gulp.task("compress", function () {
	return gulp
		.src("./public/**")
		.pipe(zip("archive.zip"))
		.pipe(gulp.dest("./public/"));
});

gulp.task("deploy", function () {
	return gulp.src("public/**").pipe(
		rsync({
			root: "public/",
			hostname: "ildar-meyker.ru",
			destination:
				"/home/users/i/ildar-meyker/domains/ildar-meyker.ru/html/" +
				pkg.name +
				"/",
		})
	);
});
