class Observer{
    constructor(data){
        this.observe(data)
    }

    observe(data){
        // 要对data的所有属性改写成set get形式
        if(!data || typeof data !== 'object') {
            return;
        }
        // 获取到data里面的key value
        Object.keys(data).forEach(key => {
            // 劫持
            this.defineReactive(data,key,data[key])
            // 深度劫持
            this.observe(data[key])
        })
    }
    // 定义响应式
    defineReactive(obj,key,value){
        let self = this;
        let dep = new Dep();
        // 在获取的某个值的时候进行操作
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue){
                console.log('监听到值的变化了');
                
                // 给data属性设置值，更改属性的值
                if(value != newValue){
                    self.observe(newValue);
                    value = newValue;
                    dep.notify();
                }
            }
        })
    }
}

class Dep {
    constructor() {
        // 订阅数组
        this.subs = []
    }

    addSub(watcher){
        this.subs.push(watcher)
    }

    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}