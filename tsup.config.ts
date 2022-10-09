import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./packages/runtime-dom/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  outDir: './lib',
  format: ['esm', 'cjs'],
});
