import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api": {
        target: "https://gallery-app-server2.vercel.app",
        changeOrigin: true,
        rewrite: (path) => '/api' + path,
      }
    }
  },
  plugins: [react()]
})
