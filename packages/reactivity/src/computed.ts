import { ReactiveEffect } from './effect';

type ComputedGetter<T> = (...args: any[]) => T;
export interface DebuggerOptions {
  onTrack?: any;
  onTrigger?: any;
}
export class ComputedRefImpl<T> {
  private _dirty = true;
  private _value: T;
  public effect: ReactiveEffect;
  constructor(public getter: ComputedGetter<T>) {
    this.effect = new ReactiveEffect(getter, () => {
      this._dirty = true;
    });
  }
  get value() {
    if (this._dirty) {
      this._value = this.effect.run();
      this._dirty = false;
    }
    return this._value;
  }
}
export function computed<T>(getter: ComputedGetter<T>) {
  return new ComputedRefImpl<T>(getter);
}
