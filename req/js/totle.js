define(['math'],function(math){
  var output = function(ele) {
    var totle = 0;
    var len = ele.length;
    for(var i = 0; i < len; i++) {
      var num = parseInt(ele[i].innerText);
      totle = math.add(totle,num);
    }
    return totle;
  }
  return {
    output: output
  }
})