## javascriptUtil
记录开发中常用的javascript工具函数

>  判断数据类型

```js
//依据
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(''); // "[object String]"
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call(function f(){}); // "[object Function]"
Object.prototype.toString.call(); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(document); // "[object HTMLDocument]"

// 判断数据类型
function isType(content, type){
  let initType = Object.prototype.toString.call(content);
  return `[object ${type}]` == initType
}

let isArray = (v) => isType(v,'Array') 
let isString = (v) => isType(v,'String')
let isNumber = (v) => isType(v,'Number')
let isBoolean = (v) => isType(v,'Boolean')
let isUndefined = (v) => isType(v,'Undefined')
let isFunction = (v) => isType(v,'Function')
let isNull = (v) => isType(v,'Null')
let isHTMLDocument = (v) => isType(v,'HTMLDocument')
let isNull = (v) => isType(v,'Null')
```

- 箭头函数
```
1）函数体内的this对象，继承的是外层代码块的this。
2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
5）箭头函数没有自己的this，所以不能用call()、apply()、bind()这些方法去改变this的指向.

```

> ### 网络相关
- GET和POST的区别
```
1.GET在浏览器回退时无害，POST在浏览器回退时需要再次提交
2.GET请求相对POST不安全，因为GET请求的参数在URL里面，而POST请求的数据在requestBody里面
3.Get请求产生的url可以被收藏，Post的不可以
4.Get请求会被浏览器主动缓存，
5.Get请求只能进行URL编码，Post可以有多种方式编码
6.Get请求的参数会被完整的保留在浏览器里面，Post方式不会
7.Get只接受ASCAII字符，Post没有限制
```
