import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * `base` is configurable so one build works at a domain root and under a
 * GitHub Pages project sub-path. `VITE_BASE_PATH=/portfolio/ npm run build`
 */
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // The hosted preview serves the app from a generated *.e2b.app domain,
    // so host checking is relaxed for the dev server only.
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
