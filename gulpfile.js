var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    imageResize = require('gulp-image-resize'),
    // responsive = require('gulp-responsive'),
    parallel = require("concurrent-transform"),
    changed = require("gulp-changed"),
    os = require("os"),
    cp = require('child_process');

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function(done) {
    var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll"
    return cp.spawn(jekyll, ['build', '--config=_config.yml'], { stdio: 'inherit' })
        .on('close', done);
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['styles', 'jekyll-build'], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        },
        port: 8080,
        startPath: "/index.html",
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

// To support opacity in IE 8

var opacity = function(css) {
    css.walkDecls(function(decl, i) {
        if (decl.prop === 'opacity') {
            decl.parent.insertAfter(i, {
                prop: '-ms-filter',
                value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
            });
        }
    });
};

/**
 * Compile files from sass into both assets/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('styles', function() {
    return gulp.src('assets/css/main.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Firefox ESR', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'] }))
        .pipe(postcss([opacity]))
        .pipe(gulp.dest('assets/css'))
        // .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('assets/css'));
});

/**
 * Automatically resize post feature images and turn them into thumbnails
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
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll
 * Watch _site generation, reload BrowserSync
 */
gulp.task('watch', function() {
    gulp.watch('assets/css/**/*.scss', ['styles']);
    // gulp.watch('assets/img/hero/*.{jpg,png}', ['thumbnails']);
    gulp.watch(['*.html',
        '*.txt',
        'about/**',
        '_posts/**',
        'assets/js/**/**.js',
        'assets/img/**',
        'assets/fonts/**',
        '_layouts/**',
        '_includes/**',
        'assets/css/**'
    ], ['jekyll-build']);
    gulp.watch("_site/index.html").on('change', browserSync.reload);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
