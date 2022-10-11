import { isObject } from '../../shared';
import { track, trigger, ITERATE_KEY } from './effect';
import { reactive } from './reactive';
function createGetter() {
  return function get(target: object, key: string | symbol, receiver: object) {
    const res = Reflect.get(target, key, receiver);
    track(target, key);
    if (isObject(res)) return reactive(res);
    return res;
  };
}
function createSetter() {
  return function set(
    target: object,
    key: string | symbol,
    newValue: any,
    receiver: object
  ) {
    const res = Reflect.set(target, key, newValue, receiver);
    trigger(target, key);
    return res;
  };
}
function has(target: object, key: string | symbol) {
  const res = Reflect.has(target, key);
  track(target, key);
  return res;
}
function deleteProperty(target: object, key: string | symbol) {
  const res = Reflect.deleteProperty(target, key);
  trigger(target, key);
  trigger(target, ITERATE_KEY);
  return res;
}
const get = createGetter();
const set = createSetter();
export const mutableHandler: ProxyHandler<object> = {
  get,
  set,
  has,
  deleteProperty,
};
