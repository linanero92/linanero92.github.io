const {src, dest, watch, task}  = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

// Static server
function bs() {
   serveSass();
   browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./src/sass/**/*.sass", serveSass);
  watch("./src/sass/**/*.scss", serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};

function serveSass() {
  return src("./src/sass/**/*.sass", "./src/sass/**/*.scss")
    .pipe(sass())
    .pipe(dest("./src/css"))
    .pipe(browserSync.stream());
};

exports.serve = bs;

/*task('minify-css', function() {
  return src("./src/css/*.css")
    .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({
          suffix: '.min'
        }))
    .pipe(dest("./src/css"));
});*/