import { reactive, toReactive } from "./reactive";
import { isObject } from '../../shared'
import { ReactiveEffect, trackEffects, triggerEffects } from "./effect";

interface Ref<T>{
    value: T;
    __v_isRef: boolean;
}
export function isRef(r: any): boolean {
    return !!(r && r.__v_isRef);
}

function createRef<T>(rawValue: T) {
    return new RefImpl<T>(rawValue)
}

class RefImpl<T>{
    public dep:Set<ReactiveEffect> = new Set();
    private _value: T;
    private _rawValue: T;
    private readonly __v_isRef = true;
    constructor(value: T) {
        this._rawValue = value;
        this._value = toReactive(value)
    }
    get value() {
        trackEffects(this.dep);
        return this._value;
    }
    set value(newVal) {
        console.log(newVal);
        
        if (newVal === this._rawValue) return;
        this._value = toReactive(newVal);
        this._rawValue = newVal;
        triggerEffects(this.dep);
    }
}


export function ref<T>(value: T) {
    // const wrapper = {
    //     value
    // };
    // Object.defineProperty(wrapper, '__v_isRef', {
    //     value: true
    // });
    // return reactive(wrapper);
    return createRef<T>(value);
}
export function unRef(r: any) {
    return isRef(r)?r.value: r;
}
export const shallowUnwrapHandler: ProxyHandler<any> = {
    get: (target, key, receiver) => unRef(target[key]),
    set(target, key , value, receiver) {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
            oldValue.value = value
            return true
          } else {
            return Reflect.set(target, key, value, receiver)
          }
    }

}
export function proxyRefs<T extends object>(target:T) {
    return new Proxy(target, shallowUnwrapHandler)
}