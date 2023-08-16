import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: false,
  splitting: true,
  cjsInterop: true,
  target: 'node16',
  treeshake: true,
})
