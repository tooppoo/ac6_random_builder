import { createSitemap } from 'svelte-sitemap/src'

import { appPath } from '../src/lib/app-url'

createSitemap(appPath(), {
  outDir: 'dist',
  changeFreq: 'weekly',
  resetTime: true,
})
