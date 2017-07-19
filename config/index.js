// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    productionSourceMap: false,
  },
  dev: {
    env: require('./dev.env'),
    autoOpenBrowser : true,
    proxyTable : {},
    port: 8088,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
		cssSourceMap: false
  }
}
