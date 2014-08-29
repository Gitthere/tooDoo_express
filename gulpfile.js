//gulp modules
var gulp = require('gulp');
var minify = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var uglify =  require('gulp-uglify');
var less  = require('gulp-less');


//paths for tasks
var paths = {
  css:'assets/stylesheets/*.css',
  js: 'assets/js/*.js'
}

// //create gulp tasks
// gulp.task('css', function() {
//   return gulp.src(paths.css)                //take the css files
//   //can be array or single path or globs
//    .pipe(minify())                          //Minify the css
//    //destination file
//    .pipe(gulp.dest('public/stylesheets/')); //output to public folder

// });

gulp.task('less', function() {
  return gulp.src('./assets/stylesheets/styles.less')
    .pipe(less())
    .pipe(minify())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('js', function() {
  return gulp.src(paths.js)                 //take the js files
    .pipe(uglify())                         //minify the js files
    .pipe(gulp.dest('./public/javascript')) //output to public folder
});

gulp.task('serve', function() {
  nodemon({
      script: 'app.js',                      //main server file
      ext: 'js',                             //only restart when js files are changed
      ignore: ['/assets/**', '/public/**']   //but don't restart the server for client-side js files
  }).on('restart', function() {
    console.log('restarted! ' + (new Date()));
  });
})

//run css by default
// gulp.task('default', ['css']);



gulp.task('watch', function() {

  livereload.listen();

  gulp.watch('assets/stylesheets/*.less', ['less']);
  gulp.watch(paths.js, ['js']);
  gulp.watch('public/**/*')
    .on('change', function(file) {
      livereload.changed(file.path);
    });

  // lrserver.listen();

});

gulp.task('build', ['less', 'js']);
gulp.task('default', ['build', 'serve', 'watch']);

// gulp.task('default', ['css', 'watch']);