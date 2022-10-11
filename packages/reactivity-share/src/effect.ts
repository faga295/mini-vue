type EffectScheduler = (fn: Function) => any;
interface ReactiveEffectOptions {
  lazy?: boolean;
  scheduler?: EffectScheduler;
  onStop?: () => any;
}
interface ReactiveEffectRunner<T = any> {
  (): T;
  effect: ReactiveEffect;
}
export const ITERATE_KEY = Symbol('interate');
export let activeEffect: ReactiveEffect | undefined;
export const targetMap = new WeakMap<any, any>();
export class ReactiveEffect<T = any> {
  active = true;
  deps: Set<ReactiveEffect>[] = [];
  onStop?: () => void = null;
  public scheduler?: EffectScheduler;
  constructor(public fn: () => T) {}
  run() {
    activeEffect = this;
    return this.fn();
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

export function stop(runner: ReactiveEffectRunner) {
  return runner.effect.stop();
}

function cleanupEffect(effect: ReactiveEffect) {
  effect.deps.forEach(dep => {
    dep.delete(effect);
  });
}
export function effect<T>(fn: () => T, options?: ReactiveEffectOptions) {
  const _effect = new ReactiveEffect<T>(fn);
  if (options) {
    Object.assign(_effect, options);
  }
  if (!options || !options.lazy) _effect.run();
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
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
    trackEffects(dep);
  }
}
export function trackEffects(dep: Set<ReactiveEffect>) {
  if (activeEffect.active) {
    dep.add(activeEffect);
  }
  activeEffect.deps.push(dep);
}
export function trigger(target: object, key: any) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  triggerEffects(deps);
}
export function triggerEffects(deps: Set<ReactiveEffect>) {
  deps.forEach(effect => triggerEffect(effect));
}
export function triggerEffect(effect: ReactiveEffect) {
  if (effect.scheduler) {
    effect.scheduler(effect.run);
  } else {
    effect.run();
  }
}
