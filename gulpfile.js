const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

const path = {
    jsPath: ['./**/*.js', '!./node_modules/**']
};

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: '.',
            directory: true
        },
        files: ['./**/*.html', './**/*.css']
    });

    gulp.watch(path.jsPath, ['lint']);
});

gulp.task('lint', () => {
    return gulp.src(path.jsPath)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync']);
