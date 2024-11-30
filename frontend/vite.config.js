import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    proxy : {
    "url" :  "https://tubedummy-backend.onrender.com"
    }
  },
  plugins: [react()],
})
