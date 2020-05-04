// 给需要变化的那个元素增加观察者，
// 当数据变化是执行对应的方法
class Watcher{
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;

        // 先获取一下老值
        this.value = this.get()
    }
    getValue(vm, expr){
        expr = expr.split('.');
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    }
    get(){
        Dep.target = this;
        let value = this.getValue(this.vm,this.expr)
        Dep.target = null;
        return value
    }

    // 对外暴露的方法
    update(){
        let newValue = this.getValue(this.vm,this.expr);
        let oldValue = this.value;
        if(newValue != oldValue){
            this.cb(newValue);
        }
    }
}