export let activeEffect: ReactiveEffect | undefined;
export const targetMap = new WeakMap<any, any>();
export class ReactiveEffect<T = any> {
  active = true;
  deps: Set<ReactiveEffect>[] = [];
  scheduler?: (fn: Function) => any = null;
  constructor(public fn: () => T) {}
  run() {
    activeEffect = this;
    return this.fn();
  }
  stop() {
    if (this.active === true) {
      this.deps.forEach(dep => {
        dep.delete(this);
      });
      this.active = false;
    }
  }
}
export function stop(runner: any) {
  return runner.effect.stop();
}
export function effect<T>(fn: () => T, options?: any) {
  const _effect = new ReactiveEffect<T>(fn);
  Object.assign(_effect, options);
  if (!options || !options.lazy) _effect.run();
  const runner = _effect.run.bind(_effect);
  runner.effect = activeEffect;
  return runner;
}
export function track(target: object, key: any) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    if (activeEffect.active) {
      dep.add(activeEffect);
    }
    activeEffect.deps.push(dep);
  }
}
export function trigger(target: object, key: any) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  deps.forEach(effect => {
    if (effect.scheduler) {
      effect.scheduler(effect.run);
    } else {
      effect.run();
    }
  });
}
