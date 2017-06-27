const gulp = require('gulp');
const path = require('path');
const through = require('through2');
const concat = require('gulp-concat');
const svgmin = require('gulp-svgmin');
const svgoConfig = require('../svgo.config');
const { overridePaths } = require('./theme');

/* eslint no-param-reassign:0 */

const spriteHead = new Buffer(
  `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="fc-sprite" style="display:none">`
);

const spriteTail = new Buffer(`</svg>`);

function svgoOpts(file) {
  const plugins = [
    ...svgoConfig.plugins,
    {
      convertToSymbols: {
        type: 'perItem',
        fn(item) {
          if (item.isElem('svg')) {
            item.removeAttr('width');
            item.removeAttr('height');
            item.removeAttr('xmlns');
            item.renameElem('symbol');
            item.addAttr({
              name: 'id',
              local: 'id',
              prefix: '',
              value: `fc-icon-${path.basename(file.path, '.svg').toLowerCase()}`,
            });
          }
        },
      },
    },
  ];

  return { plugins };
}

const src = 'src/images/svg-icons/**/*.svg';

gulp.task('sprites', function() {
  return gulp
    .src(src)
    .pipe(overridePaths())
    .pipe(svgmin(svgoOpts))
    .pipe(concat('sprite.svg'))
    .pipe(
      through.obj((file, enc, cb) => {
        file.contents = Buffer.concat([spriteHead, file.contents, spriteTail]);
        cb(null, file);
      })
    )
    .pipe(gulp.dest(`build/${require('./theme').name}`));
});
