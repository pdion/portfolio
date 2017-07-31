'use strict';

var gulp = require('gulp');
var twig = require('gulp-twig');
var data = require('gulp-data');
var path = require('path');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    scss: './src/scss/',
    data: './src/data/',
    templates: './src/templates/'
}

gulp.task('sass', function () {
    return gulp.src(paths.scss+'**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('templates', function() {
    return gulp.src([ paths.templates+'/**/*.twig',"!"+paths.templates+'partials/**'] )
        .pipe(data(function(file) {
            return require(paths.data + path.basename(file.path,".twig") + '.json');
        }))
        .pipe(twig())
        .pipe(gulp.dest('./build'));
});

gulp.task( "default", ["sass","templates"]);