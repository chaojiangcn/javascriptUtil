class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 获取到dom才可以进行编译
        if (this.el) {
            // 1、先把真实的dom放到fragment中去
            let fragment = this.Intofragment(this.el)
            // 2、对dom节点进行编译处理
            this.compile(fragment)
            // 3、将处理后的fragment添加到真实的dom节点中去
            this.el.appendChild(fragment)
        }
    }
    // 判断是不是dom元素
    isElementNode(node) {
        return node.nodeType === 1
    }
    // 放入内存中去
    Intofragment(el) {
        let fragment = document.createDocumentFragment();
        let firstChild;

        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild)
        }

        return fragment
    }

    // 编译函数
    compile(fragment) {
        let childNodes = fragment.childNodes;
        [...childNodes].forEach(node => {
            if (this.isElementNode(node)) {
                // dom
                this.compileElement(node)
                this.compile(node)
            } else {
                // Text
                this.compileText(node)
            }
        })
    }
    // 编译元素
    compileElement(node) {
        let nodeAttibutes = node.attributes;

        [...nodeAttibutes].forEach(attr => {
            let attrName = attr.name;
            // 判断是不是指令 v-
            if (this.isDirective(attrName)) {
                // 取到对应的值放到节点上
                let expr = attr.value;
                let [, type] = attrName.split('-');
                CompileUtil[type](node, this.vm, expr)
            }
        })
    }
    //
    compileText(node) {
        let expr = node.textContent; // 取文本中的内容
        let reg = /\{\{([^}]+)\}\}/g;
        if (reg.test(expr)) {
            // node this.vm.$data text
            CompileUtil['text'](node, this.vm, expr)
        }
    }
    isDirective(name) {
        return name.startsWith('v-')
    }


    
}

// 编译工具类
const CompileUtil = {

    text(node, vm, expr) {
        let updaterFn = this.updater['textUpdater'];
        // 添加一个监控数据变化
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], () => {
                // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
                updaterFn && updaterFn(node, getTextValue(vm, expr))
            })
        })
        // new Watcher(vm, value,)
        updaterFn && updaterFn(node, getTextValue(vm, expr))
    },
    model(node, vm, expr) {
        let updaterFn = this.updater['modelUpdater'];
        // 添加一个监控，数据变化的时候调用watch callback
        new Watcher(vm,expr,(newValue) => {
            // 当输入框的值变化的时候将新值返回
            updaterFn && updaterFn(node, getValue(vm, expr))
        });
        updaterFn && updaterFn(node, getValue(vm, expr))
        node.addEventListener("input", e => {
            let newValue = e.target.value;
            setVal(vm,expr,newValue)
        })            
    },
    updater: {
        // 文本更新
        textUpdater(node, value) {
            node.textContent = value
        },
        // 输入框更新
        modelUpdater(node, value) {
            node.value = value
        }
    }
}

const setVal = (vm,expr,value) => {
    expr = expr.split('.');
    // 收敛
    return expr.reduce((prev,next,currentIndex) => {
        if(currentIndex === expr.length -1){
            return prev[next] = value
        }
        return prev[next]
    }, vm.$data)
}

const getValue = (vm, expr) => {
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
        return prev[next];
    }, vm.$data);
}

const getTextValue = (vm, expr) => {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
        return getValue(vm, arguments[1])
    })
}