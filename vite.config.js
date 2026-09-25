import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all /api requests to the backend in development
      '/api': {
        target: 'https://website-test-b3gv.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      // Proxy Socket.IO connections to the backend
      '/socket.io': {
        target: 'https://website-test-b3gv.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            if (err.code !== 'ECONNABORTED' && err.code !== 'ECONNRESET') {
              console.error('[Vite Proxy Error]:', err.message);
            }
          });
        },
      },
    },
  },
})
