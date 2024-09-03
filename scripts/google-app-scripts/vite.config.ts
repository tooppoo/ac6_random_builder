import { resolve } from 'path'

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: '.',
    target: 'es2015',
    lib: {
      entry: ['bug-report', 'request'].reduce(
        (acc, entry) => ({
          ...acc,
          [entry]: resolve(__dirname, entry, 'src', 'index.ts'),
        }),
        {} as Record<string, string>,
      ),
      formats: ['es'],
      fileName: (fmt, entry) => `${entry}/dist/index.js`,
    },
  },
})
