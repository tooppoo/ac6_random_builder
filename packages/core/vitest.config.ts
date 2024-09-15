import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'lcov'],
      all: true,
      exclude: ['*.config.*', '**/**/*.d.ts', 'spec-helper/*'],
    },
    setupFiles: ['./vitest-setup.ts'],
  },
})
