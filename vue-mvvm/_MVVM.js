class MVVM {
    constructor(option) {
        //将数据挂载到实例上
        this.$el = option.el;
        this.$data = option.data;

        // 如果有要编译的直接编译
        if(this.$el){
            // 数据劫持把我们想要的属性
            new Observer(this.$data);
            // 用数据和元素进行编译
            new Compile(this.$el, this)
        }
    }
}