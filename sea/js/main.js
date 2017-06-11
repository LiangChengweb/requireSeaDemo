define(function(require,exports) {
    // console.log('我死seajs！');
    // exports.msg = '接口export';
    var outfile = require('./outfile.js');
    exports.msg = 'outfile output:' + outfile.getStr('test');
});