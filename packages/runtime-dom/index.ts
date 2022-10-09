import { baseCreateRenderer } from '../runtime-core/src/renderer';
import { patchProp } from './patchProp';
function insert(el, parent, anchor = null) {
  parent.insertBefore(el, anchor);
}
function createElement(tag: string) {
  return document.createElement(tag);
}
function setElementText(el: HTMLElement, text) {
  el.textContent = text;
}
function createText(text: string): Text {
  return document.createTextNode(text);
}
function createComment(comment: string): any {
  return document.createComment(comment);
}
function remove(el: HTMLElement) {
  el.remove();
}
export const { render, createApp } = baseCreateRenderer({
  insert,
  createElement,
  createComment,
  setElementText,
  patchProp,
  remove,
  createText,
});

export * from '../runtime-core/src';
