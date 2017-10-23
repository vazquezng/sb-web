const webpack = require('webpack');
const webpackConfig = require('./webpack.def.config.js');
const Webpackserver = require('webpack-dev-server');
const path = require('path');

webpackConfig.devtool = 'sourcemap';

Object.keys(webpackConfig.entry).forEach((entry) => {
  const e = webpackConfig.entry[entry];
  if (typeof e === 'string') {
    webpackConfig.entry[entry] = [webpackConfig.entry[entry]];
  }
  if (Array.isArray(webpackConfig.entry[entry])) {
    webpackConfig.entry[entry].push('webpack/hot/dev-server');
    webpackConfig.entry[entry].push('webpack-dev-server/client?http://www.socialtenis.com:8083');
  }
});


webpackConfig.output.publicPath = 'http://www.socialtenis.com:8083/';
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.devServer = {
  contentBase: path.join(__dirname, 'app'),
  port: 8083,
  historyApiFallback: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    rewrites: [
      // shows views/landing.html as the landing page
      {
        from: /^\/$/,
        to: '/index.html',
      },
    ],
  },
  allowedHosts: [
    'www.socialtenis.dev',
  ],
};

const compiler = webpack(webpackConfig);
const server = new Webpackserver(compiler, webpackConfig.devServer);
server.listen(8083);

module.exports = webpackConfig;
