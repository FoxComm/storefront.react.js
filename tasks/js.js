
const gulp = require('gulp');
const babel = require('gulp-babel');
const { overridePaths } = require('./theme');

gulp.task('js', () => {
  const src = [
    'src/**/*.{js,jsx}'
  ];

  return gulp.src(src)
    .pipe(overridePaths())
    .pipe(babel())
    .pipe(gulp.dest(`build/${require('./theme').name}`));
});