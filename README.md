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
-  实现一个new函数
```js
// 1.生成一个对象
// 2.获取原型
// 3.绑定this
// 4.返回新对象
function create() {
	// 生成一个新的对象
	let obj = new Object();
	// 获得构造函数
	let Con = [].shift.call(arguments);
	// 获取原型
	obj.__proto__ = Con.prototype;
	// 绑定this
	let result = Con.apply(obj, arguments);

	return typeof result === 'object' ? result : obj
}
```

- 简易版防抖函数
```js
/**
 *简易版防抖函数
 *
 * @param  {function} func    回调函数
 * @param  {number}   wait    等待时间
 * @
 */
function debounce(func, wait = 50) {
	// 缓存一个定时器
	let timer = 0;

	// 这里返回每次实际调用的防抖函数
	// 如果已经设置过定时器则清空定时器
	// 开始执行一个定时器，延迟执行用户传入的方法
	return function(...arguments) {
		if (timer) {clearTimeout(timer)};
		timer = setTimeout(() => {
			func.apply(this, arguments);
		},wait)
	}
}
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


> ### 算法相关
- 实现判断是不是回文字符串
```js
/**
 * @description ES6实现判断是不是回文字符串
 * @param {string} value 
 */
function isPlalindrome(value) {
    if(typeof value !== 'string') return false;
    return value.split('').reverse().join() === value
}
// ES5 版本
function isPlalindromeEF(value) {
    if(typeof value !== 'string') return false;
    let i = 0, j = value.length-1;
    while(i<j){
        if(value.charAt(i) !== value.charAt(j)) return false
        i++;
        j--;
    }
    return true 
}


```
> ### 源码实现
- promise实现
```ls
// 判断变量否为function
const isFunction = variable => typeof variable === 'function'
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    // 添加状态
    this._status = PENDING
    // 添加状态
    this._value = undefined
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []
    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }
  // 添加resovle时执行的函数
  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          this._status = FULFILLED
          runFulfilled(value)
        }, err => {
          this._value = err
          this._status = REJECTED
          runRejected(err)
        })
      } else {
        this._value = val
        this._status = FULFILLED
        runFulfilled(val)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }
  // 添加reject时执行的函数
  _reject(err) {
    if (this._status !== PENDING) return
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }
  // 添加then方法
  then(onFulfilled, onRejected) {
    const { _value, _status } = this
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      const fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            const res = onFulfilled(value)
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      // 封装一个失败时执行的函数
      const rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            const res = onRejected(error)
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
          // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }
  // 添加catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  // 添加静态resolve方法
  static resolve(value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
  // 添加静态reject方法
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value))
  }
  // 添加静态all方法
  static all(list) {
    return new MyPromise((resolve, reject) => {
      /**
         * 返回值的集合
         */
      const values = []
      let count = 0
      for (const [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
          if (count === list.length) resolve(values)
        }, err => {
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(err)
        })
      }
    })
  }
  // 添加静态race方法
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (const p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
  finally(cb) {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    )
  }
}

```

