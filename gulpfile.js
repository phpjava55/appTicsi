var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var buffer =require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

var browser = require('browser-sync').create();


gulp.task('styluss',function(){
    return gulp.src('./dev/stylus/**/*.styl')
        .pipe(stylus({
            compress:true
        }))
        .pipe(gulp.dest('production/css'))
        .pipe(browser.stream());
});


gulp.task('jade',function(){
   return gulp.src('./dev/jade/**/*.jade')
       .pipe(jade({pretty:true}))
       .pipe(gulp.dest('production'))
       .pipe(browser.stream());
});


gulp.task('browserify', function() {
    return browserify('./dev/js/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('production/js'))
        .pipe(browser.stream());
});

gulp.task('browser-sync', function() {

    browser.init({
        server: {
            baseDir: ["./production/","./production/views","./production/css/","./production/images/",'./production/lib/','./production/js/','./production/iconos/']
        },
        notify:false
    });

    gulp.watch('./dev/stylus/**/*.styl',['styluss']);
    gulp.watch(['./dev/jade/**/*.jade','./dev/jade/views/*.jade'],['jade']);
    gulp.watch('./dev/js/**/*.js',['browserify'])
    gulp.watch('./production/*.html').on('change',browser.reload);
    gulp.watch('./production/views/*.html').on('change',browser.reload);
    //gulp.watch('./appAdmin/views/*.php').on('change',browser.reload);
    //gulp.watch('./appAdmin/resources/js/*.js').on('change',browser.reload);
});




gulp.task('default',['styluss','jade','browserify','browser-sync']);

// baseDir: ["./production/templates/","./production/css/"]
