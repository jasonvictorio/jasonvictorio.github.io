var gulp = require('gulp');
var browserSync = require('browser-sync');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var lost = require('lost');
var watch = require('gulp-watch');
var nunjucks = require('gulp-nunjucks-html');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');

var path = {
  src: 'src/',
  dist: 'dist/',

  cssSrc: 'src/css/',
  cssDist: 'dist/css/',

  imgSrc: 'src/img/',
  imgDist: 'dist/img',

  spriteSrc: 'src/sprite/',
  spriteDist: 'dist/img/',

  jsSrc: 'src/js/',
  jsDist: 'dist/js/',
};

gulp.task('browser-sync', function() {
  browserSync.init({
    open: false,
    notify: false,
    // tunnel: true,
    server: {
      baseDir: path.dist,
    }
  });
});

gulp.task('styles', function() {
  return gulp.src('src/css/**/*.*')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({
      includePaths: ['scss'],
      // outputStyle: 'compressed'
    }))
    .pipe(postcss([
      lost()
    ]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task('images', function () {
  return gulp.src(path.imgSrc + '*.{jpg, png}')
    .pipe(changed(path.imgDist))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.imgDist))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('jsLib', function() {
  return gulp.src(path.jsSrc + 'lib/*.js')
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.jsDist))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('moveScripts', function() {
  return gulp.src(path.jsSrc + '*.js')
    .pipe(uglify())
    .pipe(gulp.dest(path.jsDist))
    .pipe(browserSync.reload({stream:true}));
});

var nunjucksOpts = {
  searchPaths: [path.src]
};

gulp.task('nunjucks', function() {
  return gulp.src(path.src + '*.html')
    .pipe(nunjucks(nunjucksOpts))
    .pipe(gulp.dest(path.dist))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src(path.spriteSrc + '*.png')
    .pipe(spritesmith({
      imgName: path.spriteDist + 'sp.png',
      // retinaSrcFilter: path.spriteSrc + '*2x.png',
      // retinaImgName: path.spriteDist + 'sp@2x.png',
      // retinaImgPath: '../img/sp@2x.png',
      imgPath: '../img/sp.png',
      cssName: path.cssSrc + 'partials/_sprites.scss',
      cssFormat: 'scss',
      algorithm: 'binary-tree',
      cssVarMap: function(sprite) {
        sprite.name = 'sprite-' + sprite.name
      }
    }));
  return spriteData.pipe(gulp.dest('./'));
});


gulp.task('default', ['browser-sync'], function() {
  gulp.watch(path.cssSrc + '**/*.*', ['styles']);
  gulp.watch(path.src + '*.html', ['nunjucks']);
  gulp.watch(path.imgSrc + '*.{png, jpg}', ['images']);
  gulp.watch(path.jsSrc + 'lib/*.js', ['jsLib']);
  gulp.watch(path.jsSrc + '*.js', ['moveScripts']);
});
