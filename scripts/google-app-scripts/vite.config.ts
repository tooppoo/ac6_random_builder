import { resolve } from 'path'

import { defineConfig } from 'vite'

const target = (() => {
  const v = process.env.TARGET
  if (!v) throw new Error(`process.env.TARGET must be defined`)

  return v
})()

export default defineConfig({
  build: {
    target: 'es2023',
    lib: {
      /*
       * multiple entriesにするとimport分のファイルが分割される.
       * GASの場合は単体で全て完結する形式になってほしいので単体でのビルドとしている
       */
      entry: `./libs/${target}/src/index.ts`,
      formats: ['es'],
      fileName: `${target}/index.js`,
    },
    minify: false,
  },
  resolve: {
    alias: {
      share: resolve(__dirname, 'share'),
    },
  },
})
