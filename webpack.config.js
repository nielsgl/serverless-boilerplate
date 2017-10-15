const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: slsw.lib.entries,
	target: 'node',
	module: {
		rules: [{
			test: /\.js$/,
			loaders: ['babel-loader'],
			include: __dirname,
			exclude: /node_modules/,
		}],
	},
	externals: [nodeExternals()],
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
};
