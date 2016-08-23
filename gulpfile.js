var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    // concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    // uncss = require('gulp-uncss'),
    imageResize = require('gulp-image-resize'),
    // responsive = require('gulp-responsive'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    parallel = require("concurrent-transform"),
    // changed = require("gulp-changed"),
    os = require("os"),
    cp = require('child_process');

/**
 * Build the Jekyll Site
 * Note: need to generate css first to include inline css when Jekyll builds
 */
gulp.task('jekyll-build', function(done) {
    var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll"
    return cp.spawn(jekyll, ['build', '--config=_config.yml'], { stdio: 'inherit' })
        .on('close', done);
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        },
        online: true, // Will not attempt to determine your network status, assumes you're ONLINE.
        port: 8081,
        startPath: "/",
        ghostMode: false, // Clicks, Scrolls & Form inputs on any device will be mirrored to all others.
        notify: {
            styles: {
                top: 'auto',
                bottom: '20px',
                left: '0',
                width: '100px',
                fontSize: '0.5em',
                padding: "5px"
            }
        }
    });
});

/**
 * Compile files from sass into _includes then we can use Jekyll includes inline css
 */
gulp.task('styles', function() {
    return gulp.src('assets/css/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Firefox ESR', 'safari 5', 'ie 9', 'opera 12.1'] }))
        // .pipe(gulp.dest('assets/css'))
        // .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('_includes'));
});


// currently, not use
// gulp.task('uncss', ['styles'], function() {
//   return gulp.src(['_includes/main.css'])
//         .pipe(uncss({
//           html: [
//             'http://leetrunghoo.com'
//           ]
//         }))
//         .pipe(gulp.dest('_includes/'));
// });


/**
 * concat all js files then minify it
 */
gulp.task('scripts', function() {
    return gulp.src(['assets/js/*.js'])
        // .pipe(concat('scripts.js'))
        // .pipe(gulp.dest('assets/js'))
        // .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js/min'));
});

/**
 * Resize post hero images and turn them into thumbnails
 */
gulp.task("resizeImages", function() {
    // need to install: apt-get install graphicsmagick
    gulp.src("assets/img/hero/*.{jpg,png}")
        // .pipe(changed("assets/img/hero"))
        .pipe(parallel(
            imageResize({ width: 1080 }),
            os.cpus().length
        ))
        .pipe(gulp.dest("assets/img/hero"));
    gulp.src("assets/img/hero/*.{jpg,png}")
        // .pipe(changed("assets/img/hero"))
        .pipe(parallel(
            imageResize({ width: 350 }),
            os.cpus().length
        ))
        .pipe(gulp.dest("assets/img/thumbnail"));
    // // need to install: npm install sharp    
    // gulp.src("assets/img/hero/*.{jpg,png}")
    //     .pipe(responsive({
    //         // resize all images to FHD size
    //         '*': [{
    //             width: 1080
    //         }, {
    //             // Produce thumbnail images and rename them
    //             width: 300,
    //             rename: {
    //                 suffix: '-thumb'
    //             },
    //         }],
    //     }))
    //     .pipe(gulp.dest("assets/img/hero"));
});

/** 
 * Optimize images
 * note: need to install imagemagick. Ex on Linux or MacOS: brew install imagemagick
 */
gulp.task("optimizeImages",  function() {
    gulp.src("assets/img/**")
        .pipe(parallel(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest("assets/img"));
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll
 * Watch _site generation, reload BrowserSync
 */
gulp.task('default', ['styles', 'scripts', 'browser-sync'], function() {
    gulp.watch('assets/js/*.js', ['scripts']); 
    gulp.watch('assets/css/**/*.scss', ['styles']);
    gulp.watch('assets/img/hero/*.{jpg,png}', ['resizeImages']);
    gulp.watch(['*.html',
        '_posts/**',
        '_data/**',
        'cv/**',
        'assets/img/**',
        '_layouts/**',
        '_includes/**'
    ], ['jekyll-build']);
    gulp.watch("_site/index.html").on('change', browserSync.reload);
});
