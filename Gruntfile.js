"use strict";

module.exports = function (grunt) {
	grunt.loadNpmTasks("grunt-modernizr");

	grunt.initConfig({
		modernizr: {
			dist: {
				crawl: false,
				customTests: [],
				dest: "./public/js/modernizr-output.js",
				tests: require("./modernizr.config.json").tests,
				options: ["setClasses"],
				uglify: true,
			},
		},
	});
};
