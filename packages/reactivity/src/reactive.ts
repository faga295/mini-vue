import { mutableHandler } from "./baseHandlers";


export const reactiveMap = new WeakMap<any, any>();


export function createReactiveObject(target: object) {
  return new Proxy(target,mutableHandler);
}

export function reactive<T extends object>(targe: T): any;
export function reactive(target: object) {
  return createReactiveObject(target);
}
