import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api" : {
        target: "https://dev.hennypenny.com",
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/g, "")
      }
    }
  },
})
