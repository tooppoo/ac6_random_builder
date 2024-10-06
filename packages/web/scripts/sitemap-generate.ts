import { createSitemap } from 'svelte-sitemap/src'

import { appUrl } from '../src/lib/app-url'

createSitemap(appUrl(), {
  outDir: 'dist',
  changeFreq: 'weekly',
  resetTime: true,
})
