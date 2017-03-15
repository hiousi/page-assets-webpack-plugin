var path = require('path');
var PageAssetsWebpackPlugin = require('../..');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'style.[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.png$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new PageAssetsWebpackPlugin()
  ]
};