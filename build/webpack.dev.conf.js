/*
 ******************************************************
 *                      依赖引入                       *
 ******************************************************
 */
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf.js')
const merge = require('webpack-merge');
/*
 ******************************************************
 *                      webpack配置									  *
 *                         dev                        *
 ******************************************************
 */
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});
const prodConfig = {
	module: {
		rules: utils.styleLoaders({
			extract: false
		})
	},
	plugins : [
		// new HtmlwebpackPlugin({
		// 	title: 'spa for backbone',
		// 	template: './index.html',
		// 	filename: 'index.html',
		// 	chunks: ['main', 'vendors'],
		// 	hash: false,
		// 	inject: true
		// }),
		new webpack.HotModuleReplacementPlugin(),
 		new FriendlyErrorsPlugin()
	]
};
///////无bug咒语\\\\\\\\\
module.exports = merge(baseWebpackConfig,prodConfig);
