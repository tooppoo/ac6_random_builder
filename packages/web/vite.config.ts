import { join } from 'path'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import dynamicImport from 'vite-plugin-dynamic-import'
import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5'
import Sitemap from 'vite-plugin-sitemap'

const base = '/ac6_assemble_tool'

export default defineConfig({
  base,
  plugins: [
    svelte(),
    dynamicImport(),
    Sitemap({
      hostname: `https://tooppoo.github.io/`,
      basePath: base,
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
  resolve: {
    alias: {
      '~view/': join(__dirname, 'src/'),
      '~spec/': join(__dirname, 'spec/'),
      '~root/': join(__dirname, '/'),
    },
  },
})
