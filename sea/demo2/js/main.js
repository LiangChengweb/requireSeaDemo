'use strict';

seajs.config({
    alias: {
        /*
        * 在引入jquery考虑是不是引入的模块的jquery，jquery是不遵守cmd的
        * */
        'jquery' : '/common/jquery'
    }
});

seajs.use('jquery',function($){
    $('.box').css('background','green');
})