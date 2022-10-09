import type { VNode } from './vnode';

export function shouldUpdateComponent(prevNode: VNode, nextVNode: VNode) {
  return hasPropsChanged(prevNode.props, nextVNode.props);
}
export function hasPropsChanged(prevProps: any, nextProps: any): boolean {
  if (Object.keys(nextProps) !== Object.keys(prevProps)) {
    return true;
  }
  console.log(prevProps, nextProps);

  for (const key in nextProps) {
    if (nextProps[key] !== prevProps[key]) return true;
  }
  return false;
}
