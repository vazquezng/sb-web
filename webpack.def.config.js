const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

const libPath = path.join(__dirname, 'app');
const buildPath = path.resolve(__dirname, 'dist');
const mainPath = path.resolve(__dirname, 'app');


var webpackConfig = {
    entry: {
        main: [
            mainPath + '/app.ts'
        ]
    },
    output: {
        path: buildPath,
        filename: '[name].bundle.js',
        chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
        root: [path.join(__dirname, "node_modules")],
        extensions: ['', '.webpack.js', '.web.js', '.js'],
    },
    module: {
        loaders: [{
                test: /\.html$/,
                loader: 'html',
            },
            { test: /\.js$/, exclude: /(node_modules|vendor)/, loader: 'babel-loader' },
            //{ test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
            { test: /\.ts$/, loader: 'babel-loader!ts-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
            },
            ENVIRONMENT: process.env.ENVIRONMENT,
            URL_BUCKET: process.env.URL_BUCKET,
            URL_API: process.env.URL_API,
            FACEBOOK_ID: process.env.FACEBOOK_ID,
            pkg,
            hash: Math.random().toString(36).substring(4),
            filename: 'index.html',
            inject: false,
            template: path.join(libPath, 'index.ejs'),
        }),
        new Webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(es)$/)
    ]
};

module.exports = webpackConfig;