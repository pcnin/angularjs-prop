// Dependencias
var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    ngmin      = require('gulp-ngmin'),
    uglify     = require('gulp-uglify'),
    minifycss  = require('gulp-minify-css'),
    htmlmin    = require('gulp-html-minifier'),
    obfuscate  = require('gulp-obfuscate'),
    ngAnnotate = require('gulp-ng-annotate'),
    jsonminify = require('gulp-jsonminify');

/* Minificar archivos JS */
gulp.task('minify-js', function () 
{
    gulp.src([
            '../src/app.js', 
            '../src/services/*.js',
            '../src/directives/*.js',
            '../src/controllers/*.js'
        ])
        .pipe(concat('app.min.js'))
        //.pipe(ngmin())
        //.pipe(ngAnnotate())
        //.pipe(obfuscate())
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('../src/'))

});
/* Minificar archivos HTML */
gulp.task('minify-html', function() 
{
    gulp.src('../glossary.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../src/'))
});

/* Minificar archivos CSS */
gulp.task('minify-css', function () 
{
  gulp.src('../css/sass/main.css')
  .pipe(concat('main.min.css'))
  //.pipe(obfuscate())
  .pipe(minifycss())
  .pipe(gulp.dest('../css/'))
});
 
gulp.task('minify-json', function () 
{
    gulp.src(['../src/lang/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('../src/lang/min/'));
});
