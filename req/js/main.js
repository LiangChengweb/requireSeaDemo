
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
require(['green','jquery', 'math','jquery.fn.add'], function (green,$,math) {
    $(function () {
        $('.box').add(1);
        green.toGreen();
        alert(math.add(1, 1));
    })
})