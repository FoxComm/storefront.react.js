const fs = require('fs-extra');
const path = require('path');
const gulp = require('gulp');
const addsrc = require('gulp-add-src');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

const rootPath = path.resolve(__dirname, '..');

function saveTokens(cssFile, exportTokens) {
  const libPath = path.relative(rootPath, cssFile).replace(/^src/, 'lib');

  return fs
    .ensureDir(path.dirname(libPath))
    .then(() => fs.writeJson(`${libPath}.json`, exportTokens))
    .then(() => exportTokens);
}

const src = ['src/components/**/*.css'];

gulp.task('css', function() {
  const { plugins } = require('../postcss.config');
  const exportModulesPlugin = require('../src/opt/css-modules-export');
  return gulp
    .src(src)
    .pipe(
      postcss([
        ...plugins,
        exportModulesPlugin({
          processTokens: saveTokens,
        }),
      ])
    )
    .pipe(addsrc.prepend(['src/css/reset.css', 'node_modules/react-image-gallery/styles/css/image-gallery.css']))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('lib/'));
});
