import { track, trigger } from './effect';
import { reactive, ReactiveFlags, readonly } from './reactive';

const createGetter = (isReadonly = false, shallow = false) =>
    function get(target: object, key: string | symbol, receiver: object){
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        } else if (key === ReactiveFlags.IS_SHALLOW) {
            return shallow
        } else if (key === ReactiveFlags.RAW) {
            return target;
        }
        const res = Reflect.get(target, key, receiver)
        track(target, key);
        if (shallow) return res;
        if (!shallow && res !== null && typeof res === 'object') {
            if (!isReadonly) return reactive(res);
            return readonly(res);
        }
        return res;
    }

const createSetter = (shallow = false) => function set(target: object, key: string | symbol, newValue: any, receiver: object){
    const res = Reflect.set(target, key, newValue, receiver);
    trigger(target, key);
    return res;
} 
const get = createGetter();
const set = createSetter();
export const mutableHandler: ProxyHandler<object> = {
    get,
    set
}

const readonlyGet = createGetter(true);
export const readonlyHandler: ProxyHandler<object> = {
    get: readonlyGet,
    set(){
        return true;
    },
    deleteProperty() {
       return true;
    },
}

const shallowReadonlyGet = createGetter(false, true);
export const shallowReadonlyHandler: ProxyHandler<object> = {
    get: shallowReadonlyGet,
    set() {
        return true;
    },
    deleteProperty() {
        return true;
    }
}