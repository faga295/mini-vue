export let activeEffect: ReactiveEffect | undefined;
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
