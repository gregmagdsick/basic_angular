const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const exec = require('child_process').exec;
const scripts = ['*.js', 'app/*.js', 'test/*.js'];
const protractor = require('gulp-protractor').protractor;

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

gulp.task('server', (done) => {
  exec('node server.js', (err, stdout, stderr) => {
    if (err) throw err;
    process.stdout.write(stdout + '\n');
    process.stderr.write(stderr + '\n');
    done();
  });
});

gulp.task('protractor', () => {
  gulp.src('test/integration/*spec.js')
  .pipe(protractor({
    configFile: 'test/integration/config.js',
    args: ['--baseurl', 'http://127.0.0.1:5050']
  }))
  .on('error', (e) => {throw e; });
});

gulp.task('test', ['build', 'server', 'protractor']);
gulp.task('build', ['lint', 'webpack', 'staticHTML', 'css']);
gulp.task('default', ['lint']);
