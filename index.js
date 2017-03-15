'use strict';

var toposort = require('toposort');


function PageAssetsWebpackPlugin(options = {}) {
  let defaults = {
    filename: 'assets.json',
    outputall: false, // by default we just output entrypoints  
    format: function(data) {  // by default export as JSON.stringify
      return JSON.stringify(data, null, 2);
    }
  }
  this.settings = Object.assign({}, defaults, options); 
}

PageAssetsWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;

  compiler.plugin('emit', function (compilation, callback) {

    var stats = compilation.getStats().toJson();
    var chunks = stats.chunks;

    if (!chunks) {
      return callback();
    }

    var entryPoints = Object.keys(stats.entrypoints);

    var chunksById = {};
    chunks.forEach(function (chunk) {
      chunksById[chunk.id] = chunk;
    });

    var assets = {
      js: {},
      css: {}
    }

    chunks.forEach(function (chunk) {
      var name = chunk.names[0];

      //  do not output chunk if it is not an entryPoint and  setting outputAll = false
      if (!self.settings.outputall &&  Array.isArray(entryPoints) &&  entryPoints.indexOf(name) === -1 ) 
        return;

      var edges = [];
      var fillEdges = function(chunk) {
        chunk.parents.forEach(function(parentId) {
          var parent = (typeof parentId === 'number') ? chunksById[parentId] : parentId;
          edges.push([parent, chunk]);
          fillEdges(parent);
        });
      }
      fillEdges(chunk);

      if (edges.length) {
        var sortedChunks = toposort(edges);
      } else {
        var sortedChunks = [chunk];
      }

      var css = [];
      var js = [];

      sortedChunks.forEach(function (chunk) {
        css = css.concat( self.filterAssets(chunk, 'css') );
        js = js.concat( self.filterAssets(chunk, 'js') );
      });

      css.map(self.setAssetsPriority);
      js.map(self.setAssetsPriority);

      assets.css[name]=css;
      assets.js[name]=js;
              
    });

    var fileContent = self.formatOutput(assets);

    compilation.assets[self.settings.filename] = {
      source: function () {
        return fileContent;
      },
      size: function () {
        return fileContent.length;
      }
    };
         
    callback();
  });
};

PageAssetsWebpackPlugin.prototype.formatOutput = function(assets) {
  var self = this;
    return self.settings.format(assets);
};



PageAssetsWebpackPlugin.prototype.setAssetsPriority = function(asset, i) {
  asset.priority = (i + 1) * 10;
  return asset;
};

PageAssetsWebpackPlugin.prototype.filterAssets = function(chunk, type='js') {
  var reg = new RegExp("." + type + "($|\\?)");
  return chunk.files.filter(function(file){
                    return reg.test(file);
                }).map(function(file){
                    return {
                         id: chunk.names['0'],
                         path:  file
                         
                    };
  });
};

module.exports = PageAssetsWebpackPlugin;
