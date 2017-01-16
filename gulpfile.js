var gulp = require('gulp');
var browserSync = require('browser-sync');
var header = require('gulp-header');
var minifycss = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var neat = require('node-neat');
var reload = browserSync.reload;


// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');
//* Set up scss path */
var paths = {
    scss: './sass/*.scss'

};

/* Scripts task */
gulp.task('scripts', function() {
    return gulp.src([
        'js/vendor/jquery-1.11.1.js',
        'vendor/bootstrap/js/bootstrap.min.js',
        'js/jqBootstrapValidation.js',
        'js/contact_me.js',
        'js/freelancer.min.js'
        ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({ suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

/* SASS task */
gulp.task('sass', function() {
    gulp.src('sass/styles.scss')
    .pipe(plumber())
    .pipe(sass({
        includePaths: ['scss'].concat(neat)
    }))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
    /* Reload the browser CSS after every change */
    .pipe(reload({stream:true}));
});

/* Reload Task */
gulp.task('bs-reload', function() {
    browserSync.reload();

});

/* Prepare browserSync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['css/*.css', 'js/*.js'], {
        server: {
            baseDir: './'
        }
    });
});

// Watch sass, js and html files, doing different things with each
gulp.task('default', ['sass', 'browser-sync'], function() {
    gulp.watch(['sass/*.scss', 'scss/**/*.scss'], ['sass']);
    gulp.watch(['js/freelancer.js'], ['scripts']);
    gulp.watch(['*.html'], ['bs-reload']);
});


