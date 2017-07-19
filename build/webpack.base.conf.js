/*
 ******************************************************
 *                      依赖引入                       *
 ******************************************************
 */
const webpack = require('webpack')
const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils.js')
const getEntry = require('./getEntry.js')
const compileConfig = require('../app/compile.config.json')
/*
 ******************************************************
 *                      webpack配置                   *
 ******************************************************
 */
//  配置入口文件
var entrys = getEntry('./app/src/*.js');
const config = {
	entry: entrys,
	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].[hash:8].js',
		chunkFilename: '[name].[hash:8].js'
	},
	module: {
		rules :[
			{
				test: /\.jade$/,
				loader: 'jade-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 8192,
					name: 'img/[name].[hash:7].[ext]'
				}
			}, {
				test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
				// test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader?name=fonts/[name].[ext]"
			}, {
				// test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				test: /\.woff(2)?(\?[a-z0-9]+)?$/,
				loader: "url-loader?limit=10000&name=fonts/[name].[ext]&minetype=application/font-woff"
			},
		]
	},
	plugins: [
		//抽离公共js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
		//配置环境变量
		new webpack.DefinePlugin({
			process:{
				env:{
					NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          ISPACK: JSON.stringify(process.env.ISPACK)
				}
			}
		}),
		//报错但不退出webpack进程
		new webpack.NoEmitOnErrorsPlugin(),
		//这里是打包文件头部注释！
		new webpack.BannerPlugin("leappmusic is a good app")
	],
	resolve: {
		modules: ['node_modules', path.join(__dirname, '../../leapmusic-plugins')],
		extensions: ['.js' , '.json'],
		alias: {'@rem':'lp-rem'}
	}
}
if(process.env.ISPACK=='FALSE'){ //不是打包的情况下使用node起的static资源
  compileConfig.cdn = compileConfig.packlink[1];
}
var pages = getEntry('./app/web/*.jade');
for (var chunkname in pages) {
  var conf = {
    filename: chunkname+'.html',
    template: pages[chunkname],
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: false
    },
    hash: true,
    // chunksSortMode: 'dependency',
    chunks : ['vendor',chunkname,'manifest'],
    complieConfig: compileConfig
  }
  var titleC = compileConfig.title || {};
  var title = titleC[chunkname];
  if (title) {
    conf.title = title;
  }
  config.plugins.push(new HtmlwebpackPlugin(conf));
}
/*
 ******************************************************
 *                      function                     *
 ******************************************************
 */
function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

///////无bug咒语\\\\\\\\\
module.exports = config;
