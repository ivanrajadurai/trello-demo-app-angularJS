var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    del = require('del'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    htmlmin = require('gulp-htmlmin'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create();

// Build Tasks
gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('htmlmin', function() {
    gulp.src('app/views/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/views'));
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback) {
    runSequence(['generate-css', 'clean'], ['htmlmin', 'useref'], callback);
});

// Serve Task
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'app',
            routes: {
                "/bower_components": "bower_components"
            }
        }
    })
});

// Watch Task
gulp.task('watch', function() {
    gulp.watch('app/scripts/**/*.js', browserSync.reload, ['jshint']);
    gulp.watch('app/styles/**/*.scss', ['generate-css']);
    gulp.watch('app/**/*.html', browserSync.reload);
});

// Other Task
gulp.task('jshint', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('generate-css', function() {
    return gulp.src('app/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/styles/buildCSS'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Default Initial Task
gulp.task('default', ['generate-css', 'serve', 'watch']);