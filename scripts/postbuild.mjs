/**
 * Post-build step for static hosting (GitHub Pages, Netlify, Vercel, S3…).
 *
 * 1. Writes a 404.html so a hard refresh on /projects/<slug> works on hosts that
 *    serve 404.html for unknown paths (GitHub Pages). The file stores the requested
 *    path and bounces to the app shell, which restores it with history.replaceState.
 * 2. Emits sitemap.xml from the known routes.
 * 3. Drops .nojekyll so GitHub Pages serves the built asset folder untouched.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DIST = 'dist'
const BASE = (process.env.VITE_BASE_PATH || '/').replace(/\/+$/, '') || ''
const SITE_URL = (process.env.VITE_SITE_URL || '').replace(/\/+$/, '')

const html = await readFile(join(DIST, 'index.html'), 'utf8')

const redirectScript = `<script>
  (function () {
    try {
      sessionStorage.setItem('spa:redirect', location.pathname + location.search + location.hash)
      location.replace(${JSON.stringify(BASE + '/')})
    } catch (e) {
      location.replace(${JSON.stringify(BASE + '/')})
    }
  })()
</script>`

const notFound = html.replace('</head>', `${redirectScript}\n  </head>`)
await writeFile(join(DIST, '404.html'), notFound)
await writeFile(join(DIST, '.nojekyll'), '')

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/projects/nutrizero-ai', priority: '0.8' },
  { path: '/projects/faculty-feedback-analytics', priority: '0.8' },
  { path: '/projects/scamshield-ai', priority: '0.8' },
]

const today = new Date().toISOString().slice(0, 10)

if (!SITE_URL) {
  console.log('• VITE_SITE_URL not set — skipping sitemap.xml/robots.txt (set it once you know the deployment URL).')
  process.exit(0)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(join(DIST, 'sitemap.xml'), sitemap)
await writeFile(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
)

console.log(`✓ 404.html, .nojekyll, sitemap.xml and robots.txt written (base: "${BASE || '/'}", site: ${SITE_URL})`)
