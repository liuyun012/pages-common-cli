module.exports = {
  plugins: [
    require('autoprefixer')(["last 2 version", "ie 9"]),
    // require('cssnano')({
    //   preset: 'default',
    // }),
    require('postcss-sprites')({
      spritePath: './dist/img/',
      filterBy: function(image) {
        //过滤一些不需要合并的图片，返回值是一个promise，默认有一个exist的filter
        if (image.url.indexOf('/images/sprites/') === -1) {
          return Promise.reject();
        }
        return Promise.resolve();
      }
    }),
  ]
}
