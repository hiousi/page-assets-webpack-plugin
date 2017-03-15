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

This plugin will write a file describing all css and js assets. You can use the resulting file to write your <script> tags. 

Priority can help you sort assets in the page. Based on their dependency,  asset with priority 0 should be placed before priority 1. Note that the assets are well ordered inside the file, parents first and childs after. Here is a really simple webpack configuration:

```javascript
var path = require('path');
var PageAssetsWebpackPlugin = require('page-assets-webpack-plugin');

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
  "js": {
    "main": [
      {
        "id": "main",
        "path": "style.js",
        "priority": 10
      }
    ]
  },
  "css": {
    "main": []
  }
}
```

Custom Output format
------------

Use your own fonction to write a file in the format you want. Here is an example exporting YAML.
webpack.config.js

```javascript
var path = require('path');
var YAML = require('yamljs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PageAssetsWebpackPlugin = require('page-assets-webpack-plugin');

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
```

assets.yml
```yaml
js:
    main:
        -
            id: main
            path: style.js
            priority: 10
css:
    main:
        -
            id: main
            path: main.css
            priority: 10
```

CommonsChunkPlugin
------------

The [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) is powerfull. It creates a separate file with common modules that are shared between pages. Go to examples/common to experiment how you can use it in conjonction of this plugin.
Here is a sample file output in JSON format.

```json
{
  "js": {
    "pageA": [
      {
        "id": "common",
        "path": "common.js",
        "priority": 20
      },
      {
        "id": "pageA",
        "path": "pageA.js",
        "priority": 30
      }
    ],
    "pageB": [
      {
        "id": "common",
        "path": "common.js",
        "priority": 20
      },
      {
        "id": "pageB",
        "path": "pageB.js",
        "priority": 30
      }
    ]
  },
  "css": {
    "pageA": [
      {
        "id": "common",
        "path": "common.css",
        "priority": 10
      },
      {
        "id": "pageA",
        "path": "pageA.css",
        "priority": 20
      }
    ],
    "pageB": [
      {
        "id": "common",
        "path": "common.css",
        "priority": 10
      }
    ]
  }
}
```

More examples
------------

More examples of usage can be found in folder ./examples
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