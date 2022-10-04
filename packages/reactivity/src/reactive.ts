import { mutableHandler, readonlyHandler, shallowReadonlyHandler } from "./baseHandlers";


export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw'
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.IS_SHALLOW]?: boolean
  [ReactiveFlags.RAW]?: any
}
export const reactiveMap = new WeakMap<any, any>();


export function createReactiveObject(
  target: Target,
  baseHandlers: ProxyHandler<any>
) {
  return new Proxy(target,baseHandlers);
}

export function reactive<T extends object>(targe: T): any;
export function reactive(target: object) {
  return createReactiveObject(target, mutableHandler);
}

export function readonly(target: object) {
  return createReactiveObject(target, readonlyHandler);
}

export function shallowReadonly(target: object){
  return createReactiveObject(target, shallowReadonlyHandler);
}

export function isReactive(value: unknown):boolean {
  return !!(value && value[ReactiveFlags.IS_REACTIVE]);
}

export function isReadonly(value: unknown): boolean {
  return !!(value && value[ReactiveFlags.IS_READONLY]);
}
export function isProxy(value: unknown): boolean {
  return isReactive(value) || isReadonly(value);
}
export function toRaw(value: unknown) {
  const raw = value && value[ReactiveFlags.RAW];
  return raw ? raw : value;
}
