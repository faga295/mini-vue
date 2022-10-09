import { isObject } from '../../shared';
import { createVNode } from './vnode';
export interface VNodeProps {
  key?: string;
}
export type RawProps = VNodeProps & Record<string, any>;
export function h(type: string, propsOrChildren?: any, children?: any) {
  const l = arguments.length;

  if (l === 2) {
    if (
      isObject(propsOrChildren) &&
      !Array.isArray(propsOrChildren) &&
      typeof propsOrChildren !== 'string'
    ) {
      return createVNode(type, propsOrChildren, null);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    return createVNode(type, propsOrChildren, children);
  }
}
