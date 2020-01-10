## javascriptUtil
记录开发中常用的javascript工具函数

|  判断数据类型

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
