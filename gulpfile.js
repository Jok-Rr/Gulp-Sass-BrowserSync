//!!!  REQUIRE  !!!\\ 

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var phpConnect = require('gulp-connect-php');
const browsersync = require("browser-sync");

//!!!  CONFIG FILE SASS, CSS, PHP, OUTPUT STYLE  !!!\\ 

var sassDir = 'assets/scss/*.scss'; 
var cssDir = 'assets/css';
var phpDir = '*.php';
var htmlDir = '*.html';
var baseDir = './';
var proxyDir = 'localhost/Gulp-Sass-BrowserSync/';
var outputstyle = "compressed"; //! "nested", "expanded", "compact", "compressed"

//!!!  PHP CONNECT  !!!\\

function connectsync() {
  phpConnect.server({
      keepalive: true,
      base: baseDir
  }, function (){
      browsersync({
          proxy: proxyDir
      });
  });
}

//! BROWSER RELOAD

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function php(){
  return gulp.src(phpDir);
}

//! COMPILE SCSS TO CSS

function scssTask() {
  return gulp.src(sassDir)
  .pipe(sass({outputStyle: outputstyle}).on('error',sass.logError))
    .pipe(gulp.dest(cssDir))
};

//! WATCH MODIFICATIONS FILES

function watchFiles() {
  gulp.watch(phpDir, gulp.series(php, browserSyncReload));
  gulp.watch(htmlDir, gulp.series(browserSyncReload));
  gulp.watch(sassDir, gulp.series(scssTask, browserSyncReload));
}

//! DEFAULT TASK FOR START SCRIPT "gulp"

const watch = gulp.parallel(scssTask, [watchFiles, connectsync]);

exports.default = watch;