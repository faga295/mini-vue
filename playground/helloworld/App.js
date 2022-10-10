import { h, ref } from '../../lib/index.mjs';
import { Foo } from './Foo.js';

export default {
  render() {
    return h(
      'div',
      {
        class: 'red', // event
        onClick() {
          this.count.value = 2;
          console.log(this.count.value);
        },
      },
      // string
      // 'hi mini-vue'
      // array
      // [h('p', { class: 'red' }, 'hello'), h('p', { class: 'blue' }, this.title)]
      // setupState
      // 'hi ' + this.title
      // component
      [h(Foo, { count: this.count.value })]
    );
  },
  setup() {
    return {
      count: ref(1),
      title: 'mini-vue',
    };
  },
};
