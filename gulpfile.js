const gulp  = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('hello', function (done) {
  console.log('Привет, мир!');
  done();
});

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('minify-css', function() {
  return gulp.src("./src/css/*.css")
    .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({
          suffix: '.min'
        }))
    .pipe(gulp.dest("./src/css"));
});