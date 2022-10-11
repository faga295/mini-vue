# mini-vue

此仓库用于学习 vue 的源码，测试用例借用[mini-vue](https://github.com/cuixiaorui/mini-vue)

实现细节可参考**vuejs 设计与实现**以及[vue](https://github.com/vuejs/core)源码

个人总结放在[docs](https://github.com/faga1/mini-vue/tree/master/docs)目录下

## To do

### reactivity

**reactive**

- [x] reactive
- [x] shallowReactive
- [x] shallowReadonly
- [x] readOnly
- [x] toRaw

**ref**

- [x] ref
- [x] proxyRef

**effect**

- [x] effect
- [x] scheduler
- [x] stop
- [ ] 嵌套 effect

### runtime-core

**component**

- [x] mount component
- [x] update component
- [x] Text
- [x] Comment
- [x] Fragment
- [ ] slot
- [ ] emit

**render**

- [x] mountElement
- [x] mountComponent
- [x] patchComponent
- [ ] patchElement

**diff**

### compile-core
