# Requirejs

启动服务器
```bash
gulp req
```

[参考地址1](http://www.tuicool.com/articles/FveINvN)

[参考地址2](http://www.imooc.com/video/8242)

说明：以下代码全部是req目录下,seajs只是作为了解。

## 一、不依赖其他模块的module创建

1. 创建math的module

```javascript
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

```html
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

```html
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
## 二、 引入jquery

由于jquery本身是没有通过`defined`，单独引入`jquery`，然后执行jquery语法代码，显然会报错。（同样的道理，在seajs也是一样的）。

`requirejs`提供`require.config()`

```html
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
说明： 通常情况下先加载CDN下jquery，如果没有才加载本地的jquery文件。

当然自己定义的模块，也可以通过这种方式调用了。如下：

```html
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
## 三、模块依赖

1. 创建`boxText`模块，可以直接依赖 jquery 模块。

```javascript
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
2. 创建`boxStyle`模块，可在调用时在`require.config`中使用shim

```javascript
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

```javascript
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
3.  模块之间的依赖是通过`require()`，并没有经过`require.config`

模块`./js/attr/index.js`

```javascript
define(['jquery'],function($) {
  function add() {
    console.log('addattr');
    $('body').css('background','#ddd');
  }
  return add;
})
```

./demo6.html

```html
 <script type="text/javascript" src="lib/require.js"></script>
 <script type="text/javascript">
 require.config({
   paths: {
     "jquery": ["http://libs.baidu.com/jquery/2.0.3/jquery", "./lib/jquery"],
   },
 });
 require(['./js/attr/index'], function(attr) {
   attr.remove();
   attr.add();
 })
 </script>
```

## 四、说明jquery本身是否没有通过`defined`，是否因为版本问题，我特地找了四个版本：

- 2.2.4
- 3.3
- 1.12
- 1.9
```javascript
  requirejs([
    // './jquery.1.9',
    // './jquery.1.12',
    // './jquery.3.3',
    'lib/jquery',
    './js/main',
  ], function() {
    $('body').css('background','#666');
  });
```

发现均`requirejs`第二个参数回调函数不带参数可行，但这样子，导致某模块依赖jquery，同时还依赖其他模块，jquery必须提前，回调函数的参数顺序就被打乱报错，

```javascript
  requirejs([
    'lib/jquery',
    './js/test',
  ], function(test) {
    test();
  });
```

所以还是建议，在`require.config`种定义jquery，详细代码件./req/demo7.htmlj和./req/js/test.js。


**阅读[requirejs文档](http://requirejs.org/docs/jquery.html#intro)，有这么一段**：

So to reiterate, you will likely get an error if you refer to jQuery with another module name, like 'lib/jquery'. This example will not work:

```javascript
// THIS WILL NOT WORK
define(['lib/jquery'], function ($) {...});
```

It will not work, since jQuery registers itself with the name of 'jquery' and not 'lib/jquery'. In general, explicitly naming modules in the define() call are discouraged, but [jQuery has some special constraints](https://github.com/requirejs/requirejs/wiki/Updating-existing-libraries#anon)