const gulp = require('gulp');
const settings = require('./settings');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//Compile Sass

gulp.task('sass',function(){
    return gulp.src(['src/css/scss/*.scss'])
            .pipe(sass())
            .pipe(gulp.dest('src/css'))
            .pipe(browserSync.stream());
});



gulp.task('serve',['sass'], function() {
  browserSync.init({
    notify: false,
    proxy: settings.urlToPreview,
    ghostMode: false
  });

  gulp.watch('./src/*.php', function() {
    browserSync.reload();
  });
  gulp.watch(['src/scss/*.scss'],['sass']);
  //gulp.watch(['src/*.html']).on('change',browserSync.reload);
  gulp.watch(['src/css/*.css']).on('change',browserSync.reload);
  gulp.watch(['src/js/*.js']).on('change',browserSync.reload);
  
 });

//Default

gulp.task('default',['serve']); 


/*folder structure
project-name 
-src
--css
---scss
---style.scss
--style.css
--fonts
--img
--js
---main.js
-index.php
-gulpfile.js
-package.json
-settings.js
*/