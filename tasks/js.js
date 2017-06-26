
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', () => {
  const src = [
    'src/**/*.{js,jsx}'
  ];

  return gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest('lib/'));
});