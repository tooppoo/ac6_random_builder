import {join} from "path";
import {defineConfig} from "vite";

export default defineConfig({
  resolve: {
    alias: {
      '~data/': join(__dirname, 'data/'),
      '~core/': join(__dirname, 'src/core/'),
    }
  }
})
