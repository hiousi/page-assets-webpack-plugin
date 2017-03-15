var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PageAssetsWebpackPlugin = require('../..');

module.exports = {
  entry: {
      pageA: "./pageA.js",
      pageB: "./pageB.js"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        }) 
      },

    ]
  },
  plugins: [
    new PageAssetsWebpackPlugin(),
    new ExtractTextPlugin("[name].css"),
  ]
};