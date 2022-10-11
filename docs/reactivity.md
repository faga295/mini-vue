# effect
`effect`是vue响应式的核心的函数,以下面的测试用例来说明effect的作用
```
it('should observe basic properties', () => {
    let dummy;
    const counter = reactive({ num: 0 });
    effect(() => (dummy = counter.num));
    expect(dummy).toBe(0);
    counter.num = 7;
    expect(dummy).toBe(7);
  });
```
因此我们可以发现`reactive`也是vue响应式的核心函数
明白了effect的作用后，我们来看看怎么实现它。
```
let activeEffect = null
effect(fn){
    activeEffect = fn;
    fn()
}
```
其实effect干的事情很少，他只是把activeEffect改成传入的fn函数，并且执行这个函数。
为什么effect只干这么点事情就可以实现响应式呢,因为响应式数据是经过代理的
```
const targetMap = new Weak()
const p = new Proxy(obj,{
    get(target,key){
        if (activeEffect) {
            let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = new Set()));
        }
        dep.add(activeEffect)
        return target[key]
    }
    set(target, key, value){
        target[key] = value
        const depsMap = targetMap.get(target);
        if (!depsMap) return;
        const deps = depsMap.get(key);
        deps.forEach(fn => fn());
    }
})
```

![](https://lzc-personal-resource.oss-cn-beijing.aliyuncs.com/20221010212135.png)