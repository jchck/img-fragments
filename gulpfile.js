var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');

var input = {
	'js': './src/js/img-fragments.js'
}

var output = {
	'js': './dist/js'
}

/*
	$ gulp js-concat
*/
gulp.task('js-concat', function(cb) {
	pump([
		gulp.src(input.js),
		sourcemaps.init(),
		concat('scripts.js'),
		sourcemaps.write(),
		gulp.dest(output.js)
	], cb);
});

/*
	$ gulp js-hint
*/
gulp.task('js-hint', ['js-concat'], function() {
	return gulp.src(input.js)
		.pipe(jshint.extract('auto'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'))
});

/*
	$ gulp js
*/
gulp.task('js', ['js-hint', 'js-concat']);