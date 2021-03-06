//Webpack requires this to work with directories
const path = require("path");

// This is main configuration object that tells Webpackw what to do.
module.exports = {
	//path to entry paint
	entry: "./src/js/main.js",

	//path and filename of the final output
	output: {
		path: path.resolve(__dirname, "public/js"),
		filename: "bundle.js",
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},

			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},

			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},

	//default mode is production
	mode: "development",

	devtool: "source-map",
};
