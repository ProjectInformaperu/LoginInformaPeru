import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',  // Rutas relativas para que funcione en cPanel
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      '.ngrok-free.dev',
      '.ngrok.io',
    ],
  },
})
