var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var clean = require('gulp-clean');
var exec = require('child_process').exec;

gulp.task('start', function (callback) {
    exec('live-server client', function (err, stdout, stderr) {
        console.log("server started");
    });
});

gulp.task('html', function(){
  return gulp.src('client/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/html'))
});

gulp.task('css', function(){
  return gulp.src('client/**/*.css')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('client/build/css'))
});

gulp.task('js', function(){
  return gulp.src(['client/**/*.js', '!client/bower_components/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(minify())    
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/build'))
});

gulp.task('clean', function () {
    return gulp.src('client/build', {read: false})
        .pipe(clean());
});

gulp.task('default', [ 'html', 'css', 'js','start']);

