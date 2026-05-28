import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment
  base: '/AI-Career-Mentor/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    proxy: {
      // Forward /api/* requests to the FastAPI backend (dev only)
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
