var Webpack = require('webpack');

var webpackConfig = require('./webpack.def.config.js');

webpackConfig.devtool = 'sourcemap';

Object.keys(webpackConfig.entry).forEach(function(entry) {
    var e = webpackConfig.entry[entry];
    if (typeof e == 'string') {
        webpackConfig.entry[entry] = [webpackConfig.entry[entry]];
    }
    if (Array.isArray(webpackConfig.entry[entry])) {
        webpackConfig.entry[entry].push('webpack/hot/dev-server');
        webpackConfig.entry[entry].push('webpack-dev-server/client?http://localhost:8083');
    }
});


webpackConfig.output.publicPath = "http://127.0.0.1:8083/";


webpackConfig.plugins.push(new Webpack.HotModuleReplacementPlugin());

webpackConfig.devServer = {
    hot: true,
    port: 8083,
    historyApiFallback: true
}

module.exports = webpackConfig;