import { track, trigger } from './effect';
import { reactive } from './reactive';

const createGetter = (isReadonly = false, shallow = false) =>
    function get(target: object, key: string | symbol, receiver: object){
        const res = Reflect.get(target, key, receiver)
        track(target, key);
        if (shallow) return res;
        if (res !== null && typeof res === 'object') {
            return reactive(res);
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