import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
