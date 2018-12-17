var gulp = require('gulp');
var replace = require('gulp-replace');
var parseArgs = require('minimist');
var concat = require('gulp-concat');

gulp.task('build:index', function(){

var options = parseArgs(process.argv.slice(2));

console.log('set key ['+options.app_key+"]");

  gulp.src(['./index.tpl.html'])
    .pipe(replace('{{APP_KEY}}', options.app_key))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('.'));
});
