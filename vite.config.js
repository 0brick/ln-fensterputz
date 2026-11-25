import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'

// Dev only: serve static pages in public/<slug>/index.html (redirect pages from scripts/generate-pages.mjs)
// like GitHub Pages does. Vite's dev server would otherwise fall back to the Vue app,
// which shows its 404 view for these URLs. `vite build`/`vite preview` don't need this.
function publicDirIndexHtml() {
  return {
    name: 'public-dir-index-html',
    apply: 'serve',
    configureServer(server) {
      const publicDir = path.resolve(server.config.publicDir)
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url || '/').split('?')[0])
        if (url === '/') return next()
        const dir = path.join(publicDir, url)
        if (!dir.startsWith(publicDir + path.sep)) return next()
        if (!fs.existsSync(path.join(dir, 'index.html'))) return next()
        if (!url.endsWith('/')) {
          // GitHub Pages redirects /slug to /slug/ as well
          res.statusCode = 301
          res.setHeader('Location', url + '/')
          return res.end()
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(fs.readFileSync(path.join(dir, 'index.html')))
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), publicDirIndexHtml()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
})
