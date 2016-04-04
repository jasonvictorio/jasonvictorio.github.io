var gulp = require('gulp')
var browserSync = require('browser-sync')
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var lost = require('lost')
var sass = require('gulp-sass')
var rename = require("gulp-rename")
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



var path = {
  src: './',
  dist: './',

  cssSrc: 'css/',
  cssDist: 'css/',

  jsSrc:  'js/lib/',
  jsDist: 'js/'
}

gulp.task('browserSync', function() {
  browserSync.init({
    open: false,
    notify: false,
    // tunnel: true,
    server: {
      baseDir: path.dist
    }
  })
})

gulp.task('css', function() {
  return gulp.src(path.cssSrc + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({
      includePaths: ['scss']
      // outputStyle: 'compressed'
    }))
    .pipe(postcss([
      lost()
    ]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.cssDist))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function() {
  return gulp.src(['./js/lib/jquery.js', './js/lib/fittext.js', './js/lib/main.js'])
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.jsDist))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
  gulp.watch(path.cssSrc + '**/*.scss', ['css'])
  gulp.watch(path.jsSrc + '**/*.js', ['js'])
  gulp.watch(path.dist + '**/*.html').on("change", browserSync.reload)
})


gulp.task('build', ['css', 'js'])
gulp.task('serve', ['browserSync', 'build', 'watch'])

