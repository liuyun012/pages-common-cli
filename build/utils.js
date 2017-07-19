/**
 * USER
 * Created by samli on 2017/5/28.
 */
/**
 * modify by samli on 2017/6/8.
 * 添加了postcss-loader [cssnano,autoprefixer,postcss-sprites]
 * 处理了前缀、优化了css、增加了sprites的文件夹会自动处理成雪碧图,替换background,增加position
 */
/*
 ******************************************************
 *                      依赖引入                       *
 ******************************************************
 */
var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
  /**
   * 设置静态资源路径
   * @param  {[type]} _path [description]
   * @return {[type]}       [description]
   */
exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
  }
  /**
   * 输出css预编译loader [less,sass,scss,styl,stylus]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
exports.cssLoaders = function(options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }
  

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // add postcss plugin to deal with css [cssnano,autoprefixer,postcss-sprites]
    // cssnano报错
    var postLoader = {
      loader: 'postcss-loader',
      options: { sourceMap: options.sourceMap }
    }
    if(true){
    	loaders = loaders.concat(postLoader);
    }
    
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      })
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
