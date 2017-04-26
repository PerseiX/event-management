'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync');

	gulp.task('scripts', function () {
		gulp.src(['app/scripts/**/*.js'])
			.pipe(concat('main.js'))
			.pipe(gulp.dest('app/js'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify({mangle: false}))
			.pipe(gulp.dest('app/js/min'));
	});

	gulp.task("sass", function () {
		gulp.src("app/styles/scss/main.scss")
			.pipe(sass().on("error", sass.logError))
			.pipe(rename('main.css'))
			.pipe(gulp.dest("app/styles"));
	});

	gulp.task('watch', ['sass'], function () {
		gulp.watch('app/styles/scss/*.scss', ['sass', browserSync.reload]);
	});

	gulp.task('build', ['scripts', 'sass']);
	gulp.task('default', ['scripts', 'sass', 'watch']);
