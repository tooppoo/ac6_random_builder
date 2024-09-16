import { join } from 'path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '~core/': join(__dirname, 'src/'),
      '~spec-helper/': join(__dirname, 'spec-helper/'),
    },
  },
  test: {
    coverage: {
      reporter: ['text', 'json', 'lcov'],
      all: true,
      exclude: ['*.config.*', '**/**/*.d', 'spec-helper/*', 'dist/**/*'],
      provider: 'v8',
    },
    setupFiles: ['./vitest-setup'],
  },
})
