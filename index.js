/**
 * @file
 * @auther Created by malin on 16/3/10.
 */
var fs = require('fs');
var exec = require('child_process').exec;

function WebpackDelChunkfile() {
    // Setup the plugin instance with options...
}

WebpackDelChunkfile.prototype.apply = function (compiler) {
    compiler.plugin('done', function (compilation, callback) {
        var chunkNames = compilation.toJson().assetsByChunkName;
        var chunkNamesKey = [];
        var newFilename = [];
        for (var f in chunkNames) {
            newFilename.push(chunkNames[f]);
            chunkNamesKey.push(f);
        }
        fs.readdir('build', function (err, path) {
            for (var k = 0; k < chunkNamesKey.length; k++) {
                for (var b = 0; b < path.length; b++) {
                    var list = fs.readdirSync('build/' + path[b])
                    if(list.length) {
                        var flist = list;
                        for (var s = 0; s < flist.length; s+=1) {
                            if (flist[s].toString().indexOf(chunkNamesKey[k]) === 0) {
                                if (newFilename.toString().indexOf(flist[s].toString()) === -1) {
                                    if (flist[s].toString().length < 10) {
                                        return false;
                                    }
                                    var file = path[b] + '/' + flist[s];
                                    exec('rm build/' + file, function (err, out) {
                                        console.log('delete file ' + file + ' success');
                                        err && console.log(err);
                                    });
                                }
                            }
                        }
                    }
                }
            }
        })
    });
};
module.exports = WebpackDelChunkfile;
