import type { VNode } from './vnode';
export type Render = (state?: any) => VNode;
export type Setup = (props?: any, ComponentOptions?) => Render | object;
export interface Component {
  data: object | null;
  render: Render;
  name: string;
  props?: any;
  setup: Setup;
}
export interface ComponentInstance {
  state: object;
  isMounted: boolean;
  subTree: VNode;
  props: any;
  setupState: any;
}
