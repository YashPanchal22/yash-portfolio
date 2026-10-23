import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from './lib/theme'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { NotFound } from './pages/NotFound'
import { scrollToHash } from './lib/navigation'

/**
 * Handles scroll position between routes:
 *  - a fresh route starts at the top
 *  - a hash on first load scrolls to that section
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const state = window.history.state as { usr?: { scrollTo?: string } } | null
    if (state?.usr?.scrollTo) return // Home handles it

    if (hash) {
      const id = window.setTimeout(() => scrollToHash(hash, 'auto'), 60)
      return () => window.clearTimeout(id)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash, key])

  return null
}

export default function App() {
  // Vite's BASE_URL is "/" at a domain root and "/repo/" on GitHub Pages —
  // using it as the router basename keeps every link correct in both cases.
  const base = import.meta.env.BASE_URL
  const basename = base === '/' ? '/' : base.replace(/\/$/, '')

  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <ScrollManager />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
