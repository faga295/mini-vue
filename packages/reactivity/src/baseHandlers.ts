import { track, trigger } from './effect';

const createGetter = (isReadonly = false, shallow = false) =>
    function get(target, key: string | symbol, receiver: object){
        const res = Reflect.get(target, key, receiver)
        track(target, key);
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