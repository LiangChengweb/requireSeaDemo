define(function(require,exports){
    var a = require('./a.js');
    exports.getMsg = function() {
        return 'b获取' + a.msg;
    };
})
