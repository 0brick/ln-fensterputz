import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Library build config. `npm run dev` here serves the playground app instead,
// since that's the fastest way to eyeball every component while building.
export default defineConfig({
  plugins: [vue()],
  root: process.env.MODE === 'lib' ? undefined : 'playground',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: process.env.MODE === 'lib' ? {
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      name: 'CivicUI',
      fileName: (format) => `civic-ui.${format === 'es' ? 'es.js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: { vue: 'Vue' },
        // keep the single stylesheet name predictable regardless of Rollup's hashing
        assetFileNames: (asset) => asset.name === 'style.css' ? 'civic-ui.css' : asset.name
      }
    },
    cssCodeSplit: false
  } : {
    outDir: '../playground-dist'
  }
})
