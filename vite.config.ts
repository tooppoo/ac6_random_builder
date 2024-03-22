import { join } from 'path'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'

export default defineConfig({
  plugins: [svelte(), dynamicImport()],
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
