import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development'
  
  return {
    plugins: [react()],
    
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
          }
        }
      },
      // Use esbuild for minification (faster and included with Vite)
      minify: 'esbuild',
      target: 'es2015'
    },

    // Server configuration
    server: {
      port: 5173,
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        }
      }
    },

    // Preview configuration
    preview: {
      port: 4173,
      host: true,
    },

    // Define global constants
    define: {
      // Disable React DevTools in production
      __REACT_DEVTOOLS_GLOBAL_HOOK__: isDevelopment ? 'undefined' : 'undefined',
    },

    // Environment variables
    envPrefix: 'VITE_',
  }
})
