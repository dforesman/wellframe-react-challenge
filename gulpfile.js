var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpCopy = require('gulp-copy');
var del = require('del')

var outputPath = './dist'
var assetPath = outputPath + '/assets'


gulp.task('sass', function(){
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(outputPath))
})



gulp.task('fontAwesome', function(){
  return  gulp.src('./node_modules/font-awesome/fonts/**/*.*')
    .pipe(gulpCopy(assetPath, {
        prefix: 2
    }))
})


gulp.task('clean', function(){
  return del([assetPath])
})


gulp.task('default', ['sass', 'fontAwesome']);