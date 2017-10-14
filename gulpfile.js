const gulp = require('gulp');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

const paths = {
	lint: [
		'./**/*.js',
		'!node_modules/**/*',
	],
};

gulp.task('default', ['start']);

gulp.task('start', (cb) => {
	runSequence('lint', 'watch', cb);
});

gulp.task('lint', () =>
	gulp.src(paths.lint)
		.pipe(eslint())
		.pipe(eslint.format()));

gulp.task('watch', () =>
	gulp.watch(paths.lint, ['lint']));
