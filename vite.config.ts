import { join } from 'path'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import { analyzer } from "vite-bundle-analyzer";
import dynamicImport from 'vite-plugin-dynamic-import'
import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    svelte(),
    dynamicImport(),
    Sitemap({
      hostname: `https://tooppoo.github.io/`,
      basePath: '/ac6_assemble_tool',
    }),
    pluginPurgeCss({
      variables: true,
    }),
    (() => {
      if (process.env.WITH_ANALYZE !== 'true') return null

      switch (process.env.ANALIZE_MODE) {
        case 'server':
          return analyzer({
            analyzerMode: 'server',
            openAnalyzer: true,
            summary: true,
          })
        case 'static':
        case 'json':
          return analyzer({
            analyzerMode: process.env.ANALIZE_MODE || 'static',
            fileName: '../analyze',
          })
        default:
          return null
      }
    })()
  ],
  resolve: {
    alias: {
      '~data/': join(__dirname, 'data/'),
      '~core/': join(__dirname, 'src/core/'),
      '~view/': join(__dirname, 'src/view/'),
      '~spec/': join(__dirname, 'spec/'),
      '~root/': join(__dirname, '/'),
    },
  },
})
