
export default {
  input: './dist/src/index.js',
  output: {
    file: 'bundle.js',
    format: 'esm',
    exports:'auto'
  }
};