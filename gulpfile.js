const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const exec = require('child_process').exec;
const protractor = require('gulp-protractor').protractor;

const scripts = ['*.js', 'app/**/*.js', 'test/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(scripts)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack', () => {
  return gulp.src('app/js/*.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('staticHTML', () => {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('css', () => {
  return gulp.src('app/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('server', (done) => {
  return exec('node server.js', (err, stdout, stderr) => {
    if (err) throw err;
    process.stdout.write(stdout + '\n');
    process.stderr.write(stderr + '\n');
    done();
  });
});

gulp.task('selenium', (done) => {
  return exec('webdriver-manager start', (err, stdout, stderr) => {
    if (err) throw err;
    process.stdout.write(stdout + '\n');
    process.stderr.write(stderr + '\n');
    done();
  });
});

gulp.task('protractor', () => {
  return gulp.src('test/integration/*spec.js')
  .pipe(protractor({
    configFile: 'test/integration/config.js',
    args: ['--baseurl', 'http://127.0.0.1:8000']
  }));
});

gulp.task('test', ['build', 'server', 'selenium', 'protractor']);
gulp.task('build', ['lint', 'webpack', 'staticHTML', 'css']);
gulp.task('default', ['lint']);
