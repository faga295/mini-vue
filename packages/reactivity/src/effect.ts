export let activeEffect: ReactiveEffect | undefined;
export const targetMap = new WeakMap<any, any>();
export class ReactiveEffect<T = any> {
  active = true;
  constructor(public fn: () => T) {
    console.log(fn);
  }
  run() {
    activeEffect = this;
    return this.fn();
  }
}

export interface ReactiveEffectOptions {
  lazy?: boolean;
}

export function effect<T>(fn: () => T, options?: ReactiveEffectOptions) {
  const _effect = new ReactiveEffect(fn);
  if (!options || !options.lazy) _effect.run();
  const runner = _effect.run.bind(_effect);
  return runner;
}

export function track(target: object, key:any) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect);
  }
}

export function trigger(target: object, key:any, oldValue?: unknown, newValue?: unknown) {     
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  deps.forEach(effect => effect.fn());
}