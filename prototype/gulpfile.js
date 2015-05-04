'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
   path = require('path');

var lessSourceFiles = 'less/**/*.less';

gulp.task('less', function() {
  gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())    
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}
gulp.task('watch', ['livereload'], function() {
 
  gulp.watch(lessSourceFiles, ['less']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('css/*.css', notifyLiveReload);
});


gulp.task('server', ['watch'], function(next) {
    var superstatic = require('superstatic').server;
    var app = superstatic(
        {
            port: 8080,
            config: {
            }
        }        
    );
  app.use(require('connect-livereload')({port: 35729}));
      app.listen(function () {
         console.log("Somebody is listening");
    });    
       
    next();
    
});
gulp.task('default', ['watch']);
