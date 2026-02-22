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
      components: '/Users/miguelazamarripa/Desktop/WorkSpace/projects/Business_Website/business-website/src/components',
      views: '/Users/miguelazamarripa/Desktop/WorkSpace/projects/Business_Website/business-website/src/components/views',
      context: '/Users/miguelazamarripa/Desktop/WorkSpace/projects/Business_Website/business-website/src/context'
    }
  }
})
