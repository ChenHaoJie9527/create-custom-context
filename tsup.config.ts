import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: true,
  external: ['react'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
}) 