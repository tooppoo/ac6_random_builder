import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'lcov'],
      all: true,
      exclude: ['*.config.*', '**/**/*.d', 'spec-helper/*'],
    },
    setupFiles: ['./vitest-setup'],
  },
})
