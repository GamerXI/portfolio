import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://gamerxi.github.io/portfolio/
// Override locally with VITE_BASE=/ or VITE_BASE=/portfolio/
export default defineConfig({
  base: process.env.VITE_BASE || '/portfolio/',
  plugins: [react()],
  server: {
    port: 5847,
    host: '0.0.0.0',
  },
})
