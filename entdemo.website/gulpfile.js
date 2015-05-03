'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tsd = require('gulp-tsd'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('gulp-rimraf'),
    livereload = require('gulp-livereload'),
    superstatic = require('superstatic'),
    connect = require('connect'),
    Config = require('./gulpfile.config');

var config = new Config();

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], {read: false});
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('verbose'));
});

/**
 * Update Typescript defintion files
 */
gulp.task('tsd', function (callback) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, callback);
});


/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions, //reference to library .d.ts files
                         config.appTypeScriptReferences,  //reference to app.d.ts files
                         config.angular2];   

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           typescript: require('typescript'),
                           target: 'ES5',
                           sourceRoot: "..",
                           declarationFiles: false,
                          emitDecoratorMetadata: true,
                           module: "AMD",
                           noExternalResolve: true
                       }));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function () {
  var typeScriptGenFiles = [config.tsOutputPath,            // path to generated JS files
                            config.sourceApp +'**/*.js',    // path to all JS files auto gen'd by editor
                            config.sourceApp +'**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];

  // delete the files
  return gulp.src(typeScriptGenFiles, {read: false})
      .pipe(rimraf());
});

gulp.task('watch', ['server'], function() {
    var server=livereload();
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts', 'gen-ts-refs']);
});


gulp.task('server', ['default'], function(next) {
    var app = connect() 
                .use(superstatic({
        port: 8080,
        logger: {
          info: function(msg) {
            console.log('Info:', msg);
          },
          error: function(msg) {
            console.error('Error:', msg);
          }
        },    
    }));
    
    app.use('/api/tenant', function fooMiddleware(req, res, next) {     
          next();
    });
    app.listen(8080, function(err) {
        console.log("Server is now listening on port 8080");
    });
       
    next();
    
});

gulp.task('default', ['ts-lint','compile-ts', 'gen-ts-refs']);
