import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'
import { analyzer } from 'vite-bundle-analyzer'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteTesting(),
    (() => {
      console.log(`ANALYZE_MODE=${process.env.ANALYZE_MODE}`)
      switch (process.env.ANALYZE_MODE) {
        case 'server':
          return analyzer({
            analyzerMode: 'server',
            openAnalyzer: true,
            summary: true,
          })
        case 'static':
        case 'json':
          return analyzer({
            analyzerMode: process.env.ANALYZE_MODE,
            fileName: '../../../analyze',
          })
        default:
          return null
      }
    })(),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
    testTimeout: 10 * 1000,
    coverage: {
      reporter: ['text', 'json'],
      all: true,
      exclude: ['*.config.*', '**/**/*.d', 'dist/**/*', 'vitest-setup.ts'],
      provider: 'v8',
    },
    setupFiles: ['./vitest-setup'],
  },
})
