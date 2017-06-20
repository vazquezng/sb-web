var Webpack = require('webpack');

var webpackConfig = require('./webpack.def.config.js');

// webpackConfig.devtool = 'source-map';


webpackConfig.stats = {
    // Configure the console output
    colors: true,
    modules: true,
    reasons: true
};
webpackConfig.plugins.push(
    new Webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': "'production'"
        }
    })
);

// tal vez necesite la url enters :S
//webpackConfig.output.publicPath = 'https://s3-sa-east-1.amazonaws.com/cdn.turismocity.saopaulo/js/'

webpackConfig.plugins.push(new Webpack.optimize.UglifyJsPlugin({
    output: { comments: false },
    mangle: false
}));

module.exports = webpackConfig;
