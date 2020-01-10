## javascriptUtil
记录开发中常用的javascript工具函数

| 判断数据类型

```js
 // 判断数据类型
  function isType(content, type){
    let initType = Object.prototype.toString.call(content)
    return `[object ${type}]` == initType
  }

  let isArray = (v) => isType(v,'Array') 
  let isArray = (v) => isType(v,'Array')
  let isArray = (v) => isType(v,'Array')
  let isArray = (v) => isType(v,'Array')
  let isArray = (v) => isType(v,'Array')
  let isArray = (v) => isType(v,'Array')
  let isArray = (v) => isType(v,'Array')
```
