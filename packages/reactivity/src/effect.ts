type EffectScheduler = (...args:any[]) => any
export interface ReactiveEffectOptions {
  lazy?: boolean;
  scheduler?: EffectScheduler;
  onStop?: () => void;
}

export interface ReactiveEffectRunner<T = any> {
  (): T;
  effect: ReactiveEffect;
}

export let activeEffect: ReactiveEffect | undefined;
export const targetMap = new WeakMap<any, any>();
export class ReactiveEffect<T = any> {
  active = true;
  deps: Set<ReactiveEffect>[] = [];
  onStop?: () => void;
  constructor(
    public fn: () => T,
    public scheduler:EffectScheduler | null = null
  ) {
  }
  run() {
    activeEffect = this;
    // cleanupEffect(this);
    return this.fn();
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      this.active = false;
      if (this.onStop) {
        this.onStop();
      }
    }
  }
}

export function stop(runner: ReactiveEffectRunner) {
  runner.effect.stop();
}


export function effect<T>(fn: () => T, options?: ReactiveEffectOptions) {
  const _effect = new ReactiveEffect(fn);
  if (options) {
    Object.assign(_effect, options);
  }
  if (!options || !options.lazy) _effect.run();
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function cleanupEffect(effect: ReactiveEffect){
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0;i < deps.length; i++) {
      deps[i].delete(effect);
    }
    effect.deps = [];
  }
}
export function track(target: object, key:any) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    
    if (activeEffect.active) {
      dep.add(activeEffect);
    }
    activeEffect.deps.push(dep);
  }
}

export function trigger(target: object, key:any, oldValue?: unknown, newValue?: unknown) {     
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  triggerEffects(deps);
}

function triggerEffects(effects: ReactiveEffect[]) {
  effects.forEach((effect) => triggerEffect(effect));
}

function triggerEffect(effect: ReactiveEffect) {
  if (effect.scheduler) {
    effect.scheduler()
  } else {
    effect.run()
  }
}