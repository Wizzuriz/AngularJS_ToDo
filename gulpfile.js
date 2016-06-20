/**
 * Created by Kragh on 05-06-2016.
 */
var gulp    = require('gulp');
var less    = require('gulp-less');
var concat  = require('gulp-concat');
var rename  = require('gulp-rename');
var cleanCss = require('gulp-clean-css');
var uglify   = require('gulp-uglify');
var watch   = require('gulp-watch');


// Compile all imported and custom less files
gulp.task('compile-custom-less', function () {
   gulp.src('Src/Less/custom-index.less')
       .pipe(less())
       .pipe(rename('styles.css'))
       .pipe(cleanCss())
       .pipe(gulp.dest('Build/css'));
});

gulp.task('copyfonts', function() {
    gulp.src('node_modules/bootstrap-less/fonts/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('Build/fonts'));
});

// Watch all custom less files. we don't edit imported core files.
gulp.task('watch-less',['compile-custom-less'], function () {
   gulp.watch('Src/Less/*.less', ['compile-custom-less']);
});

gulp.task('default', ['watch-less','copyfonts']);