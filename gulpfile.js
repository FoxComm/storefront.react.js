const gulp = require('gulp');
require('./tasks/css');
require('./tasks/sprites');
require('./tasks/js');

gulp.task('default', ['css', 'sprites', 'js']);
