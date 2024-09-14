import { defineConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default defineConfig({
  ...viteConfig,
  test: {
    coverage: {
      reporter: ['text', 'json', 'lcov'],
      all: true,
      exclude: [
        'src/pages/index/index.ts',
        '*.config.*',
        '**/**/*.d.ts',
      ],
      provider: 'v8'
    },
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
  },
})
