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
        webpackConfig.entry[entry].push('webpack-dev-server/client?http://www.socialtenis.com:8083');
    }
});


webpackConfig.output.publicPath = "http://www.socialtenis.com:8083/";


webpackConfig.plugins.push(new Webpack.HotModuleReplacementPlugin());

webpackConfig.devServer = {
    hot: true,
    port: 8083,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
}

module.exports = webpackConfig;
