import type { ReactiveEffect } from './effect';
import { trackEffects, triggerEffects } from './effect';
import { toReactive } from '../../reactivity/src';

function createRef<T>(rawValue: T) {
  return new RefImpl<T>(rawValue);
}

class RefImpl<T> {
  public dep: Set<ReactiveEffect> = new Set();
  private _value: T;
  private _rawValue: T;
  private readonly __v_isRef = true;
  constructor(value: T) {
    this._rawValue = value;
    this._value = toReactive(value);
  }
  get value() {
    trackEffects(this.dep);
    return this._value;
  }
  set value(newVal) {
    if (newVal === this._rawValue) return;
    this._value = toReactive(newVal);
    this._rawValue = newVal;
    triggerEffects(this.dep);
  }
}

export function ref<T>(value: T) {
  return createRef<T>(value);
}
