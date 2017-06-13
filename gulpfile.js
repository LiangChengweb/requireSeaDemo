'use strict';
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var app = {
    seaPath: 'sea/',
    reqPath: 'req/'
};

gulp.task('watch:req',function(){
    gulp.watch(app.reqPath + 'js/**/*.js');
    gulp.watch(app.reqPath + '**/*.html');
});

gulp.task('req',['watch:req'],function(){
    return gulp.src(app.reqPath)
        .pipe($.webserver({
            livereload: true,
            open: true,
            port: 2333
        }));
});

gulp.task('watch:sea',function(){
    gulp.watch(app.seaPath + 'js/**/*.js');
    gulp.watch(app.seaPath + '**/*.html');
});

gulp.task('sea',['watch:sea'],function(){
    return gulp.src(app.seaPath)
        .pipe($.webserver({
            livereload: true,
            open: true,
            port: 2333
        }));
});

