import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { analyzer } from 'vite-bundle-analyzer'
import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
	plugins: [
		sveltekit(),
    Sitemap({
      hostname: `https://tooppoo.github.io/`,
      basePath: '/ac6_assemble_tool',
    }),
    pluginPurgeCss({
      variables: true,
    }),
    (() => {
      console.log('ANALYZE_MODE=', process.env.ANALYZE_MODE)
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
            fileName: '../analyze',
          })
        default:
          return null
      }
    })(),
  ],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});