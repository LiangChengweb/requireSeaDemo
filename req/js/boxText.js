define(['jquery'],function() {
  var addText = function () {
    $('.box').text('box').css({
      'line-height': '100px',
      'text-align': 'center',
      'color': '#fff'
    })
  }
  var removeText = function() {
    $('.box').text('');
  }
  return {
    addText: addText,
    removeText: removeText
  }
})
