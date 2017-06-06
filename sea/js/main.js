seajs.use('/js/demo1.js');

seajs.use('/js/a.js',function(a){
    console.log(a.msg);
});

seajs.use('/js/b.js',function(b){
    console.log(b.getMsg());
})