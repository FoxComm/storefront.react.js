const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

gulp.task('css', function () {
  const { plugins } = require('./postcss.config');
  return gulp.src('src/**/*.css')
    .pipe( postcss(plugins) )
    .pipe( concat('bundle.css') )
    .pipe( gulp.dest('lib/') );
});
