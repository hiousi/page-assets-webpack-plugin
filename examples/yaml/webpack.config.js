var path = require('path');
var YAML = require('yamljs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PageAssetsWebpackPlugin = require('../..');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'style.js'
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
    new ExtractTextPlugin("[name].css"),
    new PageAssetsWebpackPlugin({
        filename: "assets.yml",
        format: function(data) {
          return YAML.stringify(data, 5);
        }

    })
  ]
};