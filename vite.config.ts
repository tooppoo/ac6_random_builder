import { join } from 'path'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
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
