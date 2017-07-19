/*
 ******************************************************
 *                      依赖引入                       *
 ******************************************************
 */
const path = require('path')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const devConfig = require('./webpack.base.conf.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const compileConfig = require('../app/compile.config.json')
const utils = require('./utils')
const config = require('../config')
/*
 ******************************************************
 *                      webpack配置									  *
 *                         prod                       *
 ******************************************************
 */
const webpackConfig = merge(devConfig,{
	output : {
		path: path.join(__dirname, '../dist'),
		filename: '[name].[chunkhash:8].js',
		chunkFilename: '[name].[chunkhash:16].js'
	},
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true
		})
	},
	plugins : [
		new ExtractTextPlugin('[name].[hash].css'),
		new UglifyJSPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
		}),
		//复制公共的资源
		//js
		new CopyWebpackPlugin(compileConfig.script.map((file)=>{
			let fromFile = path.join(__dirname, '../static/link',file);
			return { from: fromFile, to: 'link/'+file }
		}),{}),
		//css
		new CopyWebpackPlugin(compileConfig.style.map((file)=>{
			let fromFile = path.join(__dirname, '../static/link',file);
			return { from: fromFile, to: 'link/'+file }
		}),{}),
		//other
		new CopyWebpackPlugin(['img'].map((file)=>{
			let fromFile = path.join(__dirname, '../static/',file);
			return { from: fromFile, to: './static/'+file }
		}),{}),
		//压缩图片
		new ImageminPlugin({
      disable: true, // Disable during development 
      pngquant: {
        quality: '95-100'
      }
    })
	]
});
///////无bug咒语\\\\\\\\\
module.exports = webpackConfig;
