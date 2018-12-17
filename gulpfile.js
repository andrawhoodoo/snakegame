const {src, dest, task, parallel} = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const jsdoc = require('gulp-jsdoc3');
const jasmine = require('gulp-jasmine');

function minifyJS() {
	return src('src/*.js')
		.pipe(babel())
		.pipe(terser())
		.pipe(concat('snake_min.js'))
		.pipe(dest('./'));
}

function generateDocumentation(cb) {
	src("./src/*.js", {read: false})
		.pipe(jsdoc(cb));
}

function runTests() {
	return src('tests/*.js')
		.pipe(jasmine());
}

exports.default = parallel(minifyJS, generateDocumentation);