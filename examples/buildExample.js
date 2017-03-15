
var cp = require('child_process');
var path = require("path");
var fs = require("fs");
var rm = require("rimraf");
var bin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'webpack');
var examples = fs.readdirSync(__dirname).filter(function(dirname) {
	return fs.statSync(path.join(__dirname, dirname)).isDirectory() && dirname !== "node_modules";
});

var stack = function() {
	console.log("done.");
};

examples.forEach(function (exName) {
	stack = (function(next, exName) {
		return function() {
			var exPath = path.join(__dirname, exName);
			var confFile = path.join(exPath, 'webpack.config.js');
			console.log('buiding example ' + exName + '...');
			rm(path.join(exName, 'dist'), function(error){
					if(error) {
						console.error(error);
					} else {
						cp.exec(bin + ' --config "' + confFile + '" --context "' + exPath + '"', function(error, stdout, stderr) {
									if(error) console.error(error);
									else if(stderr) console.error(stderr), next();
								else next();
							});
					}
			});
		}
	}(stack, exName));
});

stack();

