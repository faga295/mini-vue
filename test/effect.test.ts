import { assert, expect, it, describe } from 'vitest';
import effect from '../src/effect/index';
import dataHijack, { bucket, setBucket } from '../src/dataHijack';

const testFn = () => {
  console.log(res.a);
};

const obj1 = {
  a: 1,
  b: 2,
};
const res = dataHijack(obj1);
const relativeTest = obj => {
  effect(testFn);
  obj.a = 3;
  return bucket.get(obj1)?.get('a');
};
describe('relative', () => {
  it('obj', () => {
    expect(relativeTest(res)).toEqual(new Set([testFn]));
  });
});
