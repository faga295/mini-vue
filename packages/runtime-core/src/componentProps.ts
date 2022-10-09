export function resolveProps(
  options: object | undefined,
  propsData: object | undefined
): [object, object] {
  const props = {};
  const attr = {};
  if (!options || !propsData) return [props, attr];
  for (const key in propsData) {
    if (key in options) {
      props[key] = propsData[key];
    } else {
      attr[key] = propsData;
    }
  }
  return [props, attr];
}
