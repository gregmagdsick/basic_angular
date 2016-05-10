const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');

const scripts = ['*.js', 'app/*.js', 'test/*.js'];

gulp.task('lint', () => {
  return gulp.src(scripts)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack', () => {
  gulp.src('app/js/*.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('staticHTML', () => {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('css', () => {
  gulp.src('app/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('test', ['lint']);
gulp.task('build', ['lint', 'webpack', 'staticHTML', 'css']);
gulp.task('default', ['lint']);