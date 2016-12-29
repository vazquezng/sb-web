const fs = require('fs');
const zlib = require('zlib');

const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const shell = require('gulp-shell');

const rename = require('gulp-rename');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

//var AWS = require('aws-sdk');
//Bucket test ngvazquez
//AWS.config.update({accessKeyId: '', secretAccessKey: ''});
//var s3Stream = require('s3-upload-stream')(new AWS.S3());


const paths = {
    sass: ['./app/js/**/scss/*.scss'],
    dist: './dist/',
};

const config = {
    bootstrapDir: './bower_components/bootstrap-sass'
};

const URL_BUCKET = {
    dev: 'http://localhost:8083',
    prod: 'http://slambow.com/web'
}


process.env.ENVIRONMENT = 'dev';
process.env.URL_BUCKET = URL_BUCKET[process.env.ENVIRONMENT];
process.env.URL_API = 'http://api.socialtenis.dev/api/v1';
process.env.FACEBOOK_ID = 188438681613821;

gulp.task('envProd', (cb) => {
    process.env.ENVIRONMENT = 'prod';
    process.env.URL_BUCKET = URL_BUCKET[process.env.ENVIRONMENT];
    process.env.URL_API = 'http://api.socialtenis.com/api/v1';
    process.env.FACEBOOK_ID = 353935338297275;
    cb();
});

gulp.task('sass', () => {
    const processors = [
        autoprefixer,
        cssnano,
    ];

    gulp.src(paths.sass)
        .pipe(sass({ includePaths: [config.bootstrapDir + '/assets/stylesheets'] }).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(rename('style.css'))
        .pipe(buffer())
        .pipe(gulp.dest('./app/css'));
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
        .pipe(gulp.dest('./app/fonts'));
});

gulp.task('webpack-dev-server', ( /* callback */ ) => {
    const webpackConfig = require('./webpack.config.js');

    new WebpackDevServer(webpack(webpackConfig), {
        contentBase: path.join(__dirname, './app'),
        stats: {
            colors: true,
        },
    }).listen(8083, 'localhost', (err) => {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        const startUrl = 'http://localhost:8083/';
        //open(startUrl);
        gutil.log('[webpack-dev-server]', startUrl);
    });

    return true;
});

//Genera el build de los files
gulp.task('webpack', (callback) => {
    const webpackConfigProd = require('./webpack.config.prod.js');
    // run webpack
    webpack(webpackConfigProd, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            // output options
        }));

        callback();

    });
});
gulp.task('watchsass', () => {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass', 'fonts', 'webpack-dev-server', 'watchsass']);

gulp.task('build', ['envProd', 'sass', 'fonts', 'webpack']);