import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  
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
      minify: isProduction ? 'esbuild' : false,
      target: 'es2015',
      // Remove console logs in production
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      } : {}
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
      // Completely disable React DevTools in production
      __REACT_DEVTOOLS_GLOBAL_HOOK__: isProduction ? 'undefined' : 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__',
      // Remove React Scan and other debug tools in production
      'process.env.NODE_ENV': JSON.stringify(mode),
      // Disable react-scan in production
      'window.__REACT_SCAN__': isProduction ? 'undefined' : 'window.__REACT_SCAN__',
    },

    // Environment variables
    envPrefix: 'VITE_',
  }
})
