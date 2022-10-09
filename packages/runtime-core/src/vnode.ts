import type { RawProps } from './h';
import type { Component } from './component';
export type VNodeChildAtom = VNode;
export type VNodeArrayChildren = Array<VNodeChildAtom>;
export type VNodeNoralizedChildren = string | VNodeArrayChildren | null;
export const Text = Symbol('text');
export const Comment = Symbol('Comment');
export const Fragment = Symbol('Fragment');
export type VNodeTypes =
  | string
  | typeof Text
  | typeof Comment
  | typeof Fragment
  | Component;
export interface VNode<HostElement = HTMLElement> {
  __v_isVNode: boolean;
  type: VNodeTypes;
  children: VNodeArrayChildren | string;
  el: HostElement;
  shapeFlag: number;
  props: RawProps;
}
export function createVNode(
  type: VNodeTypes,
  props: RawProps,
  children: any
): VNode {
  let shapeFlag;
  if (typeof children === 'string') {
    shapeFlag = 8;
  } else if (Array.isArray(children)) {
    shapeFlag = 16;
  }
  const vnode: VNode = {
    __v_isVNode: true,
    type,
    props,
    children,
    el: null,
    shapeFlag,
  };
  return vnode;
}
export function createTextVNode(text: string) {
  return createVNode(Text, null, text);
}
export function createCommentVnode(comment: string) {
  return createVNode(Comment, null, comment);
}
