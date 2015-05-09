var gulp = require('gulp');
var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');


var path = {
  HTML: 'src/static/*.html',
  CSS: 'src/static/css/*.css',
  DATA: 'data/*.json',
  ENTRY: './src/index.js',
  OUT: 'meteor-orbit-bundle.js',
  CSS_OUT: 'meteor-orbit-styles.css',
  DEST: 'dist',
  DEST_CSS: 'dist/css',
  DEST_JS: 'dist/js',
  DEST_DATA: 'dist/data'
};


// Clean out build files
gulp.task('clean', function(done) {
  del([path.DEST + '/*'], done);
});


// Copy HTML template files
gulp.task('html', function() {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});


// Copy CSS files
gulp.task('css', function() {
  gulp.src(path.CSS)
    .pipe(concat(path.CSS_OUT))
    .pipe(gulp.dest(path.DEST_CSS));
});


// Copy data files
gulp.task('data', function() {
  gulp.src(path.DATA)
    .pipe(gulp.dest(path.DEST_DATA));
});


// Browserify bundle for client-side JavaScript
gulp.task('build-js', function() {
  browserify({
    entries: [path.ENTRY],
    transform: [reactify],
    debug: true // create source maps
  })
    .bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_JS));
});

gulp.task('default', ['build-js', 'html', 'css', 'data']);
