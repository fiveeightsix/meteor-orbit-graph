var gulp = require('gulp');
var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');


var path = {
  ENTRY: './src/index.js',
  OUT: 'meteor-orbit-bundle.js',
  DEST: 'build',
  DEST_JS: 'build'
};


// Clean out build files
gulp.task('clean', function(done) {
  del([path.DEST + '/*'], done);
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

gulp.task('default', ['build-js']);
