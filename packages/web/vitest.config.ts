import { coverageConfigDefaults, defineConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default defineConfig({
  ...viteConfig,
  test: {
    coverage: {
      reporter: ['text', 'json'],
      all: true,
      exclude: [
        // https://github.com/vitest-dev/vitest/issues/5101#issuecomment-1925209487
        ...coverageConfigDefaults.exclude,
        'src/pages/index/index.ts',
        './*.config.*',
        './**/*.d.ts',
        './dist/**/*',
        'vitest-setup.ts',
      ],
      provider: 'v8',
    },
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
  },
})
