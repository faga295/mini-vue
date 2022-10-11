import { mutableHandler } from './baseHandlers';

export function reactive<T extends object>(target: T) {
  return new Proxy<T>(target, mutableHandler);
}
