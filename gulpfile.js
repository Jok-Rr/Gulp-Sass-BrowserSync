var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browsersync = require('browser-sync').create();

//! PATH FILE SASS && CSS

var sassDir = 'assets/sass/*.scss';
var cssDir = 'assets/css';

function scssTask() {
  return gulp.src(sassDir)
  .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
    .pipe(gulp.dest(cssDir))
};

function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.',
      proxy: 'localhost/files-web/gulp-sass-example/',
        browser: 'chrome',
        files: [
            "css/*.css", "*.html", "js/*.js"
        ]
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

function watchTask(){
  gulp.watch('*.html', browsersyncReload);
  gulp.watch(sassDir, gulp.series(scssTask, browsersyncReload));
}

exports.default = gulp.series(
  scssTask,
  browsersyncServe,
  watchTask
);