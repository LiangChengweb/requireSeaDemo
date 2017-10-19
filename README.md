[参考地址1](http://www.tuicool.com/articles/FveINvN)

[参考地址2](http://www.imooc.com/video/8242)

> 一、不依赖其他模块的module创建
1. 创建math的module

```
// math.js
define(function (){
    var add = function (x,y){
        return x+y;
    };
    return {
        add: add
    };
});
```
2. 为了提高性能，将require引入的js全部写在`html`

```
<body>
  <div class="box">box</div>
  <script type="text/javascript" src="lib/require.js"></script>
  <script type="text/javascript">
  require(['./js/math'], function(math) {
    var box = document.querySelector('.box')
      box.innerText = math.add(1, 1);
  });
  </script>
</body>
```
或者

```
<head>
  <script type="text/javascript" src="lib/require.js" ></script>
  <script type="text/javascript" defer async="true">
  require(['./js/math'], function(math) {
    var box = document.querySelector('.box')
    box.innerText = math.add(1, 1);
  });
  </script>
</head>
```
> 二、 引入jquery

由于jquery本身是没有通过`defined`，单独引入`jquery`，然后执行jquery语法代码，显然会报错。（同样的道理，在seajs也是一样的）。

`requirejs`提供`require.config()`

```
<body>
  <div class="box"></div>
  <script type="text/javascript" src="lib/require.js"></script>
  <script type="text/javascript" defer async="true">
  require.config({
    paths: {
      "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery", "./lib/jquery"],
    }
  })
  require(["jquery"], function($) {
    $(function() {
      $('.box').css({
        'width':'100px',
        'height':'100px',
        'background':'red',
        'border-radius':'10px'
      })
    })
  })
  </script>
</body>
```
说明： 通常情况下现在加载CDN下jquery，如果没有才加载本地的jquery文件。

当然自己定义的模块，也可以通过这种方式调用了。如下：

```
<body>
  <div class="box">box</div>
  <script type="text/javascript" src="lib/require.js"></script>
  <script type="text/javascript" defer async="true">
  /* 第一种
  require(['./js/math'], function(math) {
    var box = document.querySelector('.box')
    box.innerText = math.add(1, 1);
  });
  */
  // 第二种
  require.config({
    paths: {
      'math': './js/math'
    }
  });
  require(['math'], function(math) {
    var box = document.querySelector('.box');
    box.innerText = math.add(1, 2);
  })
  </script>
</body>
```
> 三、模块依赖
1. 创建`boxText`模块，可以直接依赖 jquery 模块。

```
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
```
2. 创建`boxStyle`模块，可在调用是在`require.config`中使用shim

```
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
```

index.html
```
require.config({
  path: {
    'boxStyle': 'file\path\boxStyle'
  },
  shim: {
    "boxStyle": {
      exports: 'boxStyle',
      deps: ['jquery']
    }
  }
})
```
模块之间的依赖如果是通过require，并没有通过require.config来定义，那只能通过require来依赖