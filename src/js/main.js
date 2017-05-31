/*
 require.config({
 baseUrl: 'js',
 paths: {
 "jquery" : "jquery."
 }
 })
 */
require.config({
    paths: {
        "jquery": "lib/jquery"
    },
    shim: {
        "add": {
            exports: 'jquery.fn.add',
            deps: ['jquery']
        }
    }
});
require(['jquery', 'math', 'green',"jquery.fn.add",], function ($, math, green) {
    $(function () {
        $('.box').add(1);
        green.toGreen();
        alert(math.add(1, 1));
    })
})