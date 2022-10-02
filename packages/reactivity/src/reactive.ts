export function createReactiveObject(target: object) {
  return new Proxy();
}

export function reactive<T extends object>(targe: T): any;
export function reactive(target: object) {
  return createReactiveObject(target);
}
