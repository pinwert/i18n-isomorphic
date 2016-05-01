var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');

// Gulp tasks
gulp.task('build', function () {
  return browserify({entries: './src/main.js', extensions: ['.js'], debug: true})
    .transform(babelify, {presets: ["es2015", "react","stage-0","stage-2"]})
    .bundle()
    .on('error',gutil.log)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/'));

});

gulp.task('watch', function () {
  gulp.watch(['./src/*.js'], ['build']);
});

gulp.task('default', ['build','watch']);

