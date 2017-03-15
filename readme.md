Page assets Webpack Plugin
==========================

A plugin to output a file describing js and css assets with their dependencies. 

Installation
------------

Install via npm:
```shell
$ npm install hiousi/page-assets-webpack-plugin --save-dev
```

Basic Usage
-------------

This plugin will write a file describing all css and js assets. You can use the resulting file to write your <script> tags. Here is a really simple webpack configuration:

```javascript
var path = require('path');
var PageAssetsWebpackPlugin = require('../..');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'style.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  },
  plugins: [
    new PageAssetsWebpackPlugin()
  ]
};
```

Will output the dist/assets.json file containing:

```json
{
  "js": [
    {
      "main": [
        {
          "id": "main",
          "path": "style.js",
          "priority": 10
        }
      ]
    }
  ],
  "css": [
    {
      "main": []
    }
  ]
}
```
Examples
------------

Some examples of usage can be found in folder ./examples
You can build all examples with:

```shell
$ npm run build:example
```

Support
------------

Please [open an issue](https://github.com/hiousi/page-assets-webpack-plugin/issues/new) for support.

Contributing
------------

Contributions are very very welcome!
Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/hiousi/page-assets-webpack-plugin/compare/).