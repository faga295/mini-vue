// write your ts code

export let activeEffect = null;
export default function effect(fn){
    activeEffect = fn;
    fn();
}