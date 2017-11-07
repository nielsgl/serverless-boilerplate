// const config = require('config');
const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: slsw.lib.entries,
	target: 'node',
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
			}],
			include: __dirname,
			exclude: /node_modules/,
		}],
	},
	plugins: [
		new copyWebpackPlugin([
			// { from: '.env' },
			{from: 'config/default.js', to: 'config/default.js'},
			// {from: `config/${process.env.NODE_ENV}.js`, to: `config/${process.env.NODE_ENV}.js`},
		]),
	],
	externals: [nodeExternals()],
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
	stats: 'minimal'
};
