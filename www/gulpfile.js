const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
const imagemin = require('gulp-imagemin');

const browserSync = require('browser-sync').create();

gulp.task('sassToCSS', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('minifyJS', function() {
  return pipeline(
        gulp.src('app/js/*.js'),
        uglify(),
        gulp.dest('public/js/')
  );
});
gulp.task('compress', async function() {
  gulp.src('app/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('public/img/'))
  .pipe(connect.reload());
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('watchFiles', function() {
  gulp.watch('app/scss/*.scss', gulp.series('sassToCSS'));
  gulp.watch('app/js/*.js', gulp.series('minifyJS'));
  gulp.watch('app/img/*', gulp.series('compress'));
});

gulp.task('default', gulp.parallel('watchFiles', 'serve',));
