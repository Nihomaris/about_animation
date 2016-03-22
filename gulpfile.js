var gulp = require("gulp");
var minifyCss = require("gulp-minify-css");
var less = require("gulp-less");
var notify = require("gulp-notify");
var brSync = require("browser-sync");
var reload = brSync.reload;
var concat = require("gulp-concat");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var autoPrefixer = require("gulp-autoprefixer");
var paths = {
  html:"index.html",
  less:"./css/**/*.less",
  compress:"./css/**/**/*.jpg",
  js:"./css/**/*.js"
}

gulp.task("uglify", function() {
    return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest("./build/"))
});

gulp.task("compress", function() {
  return gulp.src(paths.compress)
  .pipe(imagemin())
  .pipe(gulp.dest("./build/"))
});

gulp.task("mincss", function() {
    return gulp.src(paths.less)
    .pipe(concat("style.less"))
    .pipe(less())
    .pipe(minifyCss())
    .pipe(autoPrefixer())
    .pipe(gulp.dest("./build/"))
    .pipe(reload({stream:true}))
});

gulp.task("html", function() {
    return gulp.src(paths.html)
    .pipe(reload({stream:true}))
});

gulp.task("watcher", function() {
    gulp.watch(paths.html, ["html"]);
    gulp.watch(paths.less, ["mincss"]);
});

gulp.task("browserSync", function() {
  brSync({
      server: {
        baseDir: "./"
      },
      port: 8080,
      open: true,
      notify: false
  });
});

gulp.task("default", ["watcher", "mincss", "html", "browserSync"]);