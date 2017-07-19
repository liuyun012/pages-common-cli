var gulp = require('gulp');
var browser = require('browser-sync');
var browserSync = browser.create();
var spritesmith = require('gulp.spritesmith');
var scripts = require('./app/compile.config.json').script;
var styles = require('./app/compile.config.json').style;
var asseset = require('./app/compile.config.json').asseset;


gulp.task('server', ['build-link','build'], function() {
	browserSync.init({
		server: './dist/',
		port: 3000,
	});
	gulp.watch('./dist/*.*', function(file) {
		console.log(file.path);
		browserSync.reload();
	})
});
gulp.task('sprite', function () {
	var spriteData = gulp.src('./app/images/sprites/*.png').pipe(spritesmith({
		imgName: 'images/common/sprite.png',
		cssName: 'stylesheets/common/sprite.scss'
	}));
	return spriteData.pipe(gulp.dest('./app/'));
});
var gutil = require('gulp-util');
gulp.task('build', function() {
	return gulp.src([
		'app/images/publish/YYT-ico2.png',
		'app/cross-url/**/*.*',
		'app/asset/*.*',
		'app/src/lib/**/*.*'
	], {
		base: 'app/'
	})
	.pipe(gulp.dest('dist/'));
});
gulp.task('build-link', function() {
	libFiles = scripts.concat(styles,asseset);
	for (var i = 0 ; i < libFiles.length;i++){
		libFiles[i] = 'app/link/'+libFiles[i];
	}
	return gulp.src(libFiles, {
		base: 'app'
	})
	.pipe(gulp.dest('dist'));
});
gulp.task('webpack', function(callback) {
	var webpack = require('webpack');
	var productConfig = require('./bin/webpack.product.config.js');
	webpack(productConfig, function(err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack', err);
		}
		gutil.log('[webpack]', stats.toString());
		callback();
	});
});
