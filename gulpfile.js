var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function(){
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
})


gulp.task('default', ['sass'])