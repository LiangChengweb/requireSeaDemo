
require.config({
    paths: {
        "jquery": "lib/jquery",
        'green': '/js/green',
        'jquery.fn.add': '/js/jquery.fn.add',
        'math': '/js/math'
    },
    shim: {
        "jquery.fn.add": {
            deps: ['jquery']
        },
        'green': {
            deps: ['jquery']
        }
    }
});
require(['jquery','math','green','jquery.fn.add'], function ($,math) {
    console.log(1);
    console.log(math.add(1, 1));
    $(function () {
        $('.box').add(1);
    });
});
