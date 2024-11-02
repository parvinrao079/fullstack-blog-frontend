import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Bind to 0.0.0.0 to ensure Render can detect the open port
    port: 3000,       // Optional: Specify a port, but Render will typically handle this automatically
  },
})
