define(function() {
  var green = function() {
    $('.box').css({
      'background-color': 'green'
    });
  };
  var red = function() {
    $('.box').css({
      'background-color': 'red'
    })
  }
  return {
    green: green,
    red: red
  }
})
