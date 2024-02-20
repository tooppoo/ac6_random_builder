import { join } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '~data/': join(__dirname, 'data/'),
      '~core/': join(__dirname, 'src/core/'),
      '~view/': join(__dirname, 'src/view/'),
    },
  },
})
