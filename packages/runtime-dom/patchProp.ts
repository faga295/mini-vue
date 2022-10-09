type Style = string | Record<string, any> | null;
export function patchProp(
  el: HTMLElement,
  key: string,
  prevValue: any,
  nextValue: any
) {
  if (key === 'class') {
    el.className = nextValue;
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue);
  } else if (key.startsWith('on')) {
    patchEvent(el, key.slice(2).toLowerCase(), prevValue, nextValue);
  } else {
    patchAttr(el, key, nextValue);
  }
}
function patchStyle(el: HTMLElement, prev: Style, next: Style) {
  const style = el.style;
  if (next) {
    if (typeof next === 'string') {
      style.cssText = next;
    } else {
      for (const key in next) {
        style[key] = next[key];
      }
      if (prev && typeof prev !== 'string') {
        for (const key in prev) {
          if (next[key] == null) {
            style[key] = '';
          }
        }
      }
    }
  } else {
    el.removeAttribute('style');
  }
}
interface Invoker extends EventListener {
  value?: any;
}
function patchEvent(
  el: HTMLElement & {
    _vei?: Record<string, Invoker | undefined>;
    component?: any;
  },
  rawName: string,
  prev: any,
  next: any
) {
  const invokers = el._vei || (el._vei = {});
  let existingInvoker = invokers[rawName];
  if (next) {
    if (!existingInvoker) {
      existingInvoker = e => {
        if (Array.isArray(next)) {
          if (el.component) {
            next.forEach(fn => fn.call(el.component, e));
          } else {
            next.forEach(fn => fn(e));
          }
        } else {
          if (el.component) {
            next.call(el.component, e);
          } else {
            next(e);
          }
        }
      };
      existingInvoker.value = next;
      el.addEventListener(rawName, existingInvoker);
    } else {
      existingInvoker.value = next;
    }
  } else if (existingInvoker) {
    el.removeEventListener(rawName, existingInvoker);
  }
}
function patchAttr(el: HTMLElement, key: string, next: any) {
  if (next) {
    el.setAttribute(key, next);
  } else {
    el.removeAttribute(key);
  }
}
