import { track, ITERATE_KEY, trigger } from './effect';
import { reactive, ReactiveFlags, readonly } from './reactive';

const createGetter = (isReadonly = false, shallow = false) =>
  function get(target: object, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      return shallow;
    } else if (key === ReactiveFlags.RAW) {
      return target;
    }
    /**
     * this convert to receiver
     * const obj = {
     *  foo: 1,
     *  get bar() {
     *      return this.foo;
     *  }
     * }
     **/
    const res = Reflect.get(target, key, receiver);
    // add effects
    track(target, key);
    if (shallow) return res;
    if (!shallow && res !== null && typeof res === 'object') {
      if (!isReadonly) return reactive(res);
      return readonly(res);
    }
    return res;
  };

const createSetter = () =>
  function set(
    target: object,
    key: string | symbol,
    newValue: any,
    receiver: object
  ) {
    Reflect.set(target, key, newValue, receiver);
    // trigger effects
    trigger(target, key);
    return true;
  };

function deleteProperty(target: object, key: string | symbol) {
  trigger(target, key);
  trigger(target, ITERATE_KEY);
  return Reflect.deleteProperty(target, key);
}
function has(target: object, key: string | symbol) {
  track(target, key);
  return Reflect.has(target, key);
}

function ownKeys(target: object) {
  track(target, ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const get = createGetter();
const set = createSetter();
export const mutableHandler: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys,
};

const readonlyGet = createGetter(true);
export const readonlyHandler: ProxyHandler<object> = {
  get: readonlyGet,
  set() {
    return true;
  },
  deleteProperty() {
    return true;
  },
  has,
  ownKeys,
};
const shallowReactiveGet = createGetter(true, true);
export const shallowReactiveHandler: ProxyHandler<object> = {
  get: shallowReactiveGet,
  set,
  deleteProperty,
  has,
  ownKeys,
};
const shallowReadonlyGet = createGetter(false, true);
export const shallowReadonlyHandler: ProxyHandler<object> = {
  get: shallowReadonlyGet,
  set() {
    return true;
  },
  deleteProperty() {
    return true;
  },
  has,
  ownKeys,
};
