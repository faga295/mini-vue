import { createVNode } from './vnode';
import type { Component } from './component';
import type { RootRenderFunction } from './renderer';

export interface App<HostElement = HTMLElement> {
  isMounted: boolean;
  mount(rootContainer: HostElement | string);
  unmount?(): void;
}
export type CreateAppFunction<HostElement = HTMLElement> = (
  rootComponent: Component
) => App<HostElement>;

export function createAppAPI<HostElement>(
  render: RootRenderFunction<HostElement>
): CreateAppFunction<HostElement> {
  return function createApp<HostElement = HTMLElement>(
    rootComponent: Component
  ): App<HostElement> {
    let isMounted = false;

    const app = {
      isMounted,
      mount(rootContainer: string | HostElement) {
        if (!isMounted) {
          let el;
          if (typeof rootContainer === 'string') {
            el = document.querySelector(rootContainer);
          } else {
            el = rootContainer;
          }
          const vnode = createVNode(rootComponent, null, null);
          render(vnode, el);
          isMounted = true;
        }
      },
    };
    return app;
  };
}
