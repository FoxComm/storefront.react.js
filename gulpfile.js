const gulp = require('gulp');
require('./tasks/css');
require('./tasks/sprites');

gulp.task('default', ['css', 'sprites']);
