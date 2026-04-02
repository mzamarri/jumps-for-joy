import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    reactRouter(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      components: fileURLToPath(new URL('./app/components', import.meta.url)),
      views: fileURLToPath(new URL('./app/components/views', import.meta.url)),
      context: fileURLToPath(new URL('./app/context', import.meta.url)),
      data: fileURLToPath(new URL('./app/data', import.meta.url))
    }
  }
})
