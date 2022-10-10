import { h } from '../../lib/index.mjs';

export const Foo = {
  props: {
    count: Number,
  },
  render() {
    console.log('render');
    return h('div', {}, [`counter: ${this.count}`]);
  },
};
