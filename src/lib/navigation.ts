/**
 * Navigation helpers that work for:
 *  - in-page anchors on the home route
 *  - anchors reached from a project page (navigate home first, then scroll)
 *  - direct visits to "/#projects"
 */
const HEADER_OFFSET = 84

export function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth') {
  const id = hash.replace(/^#/, '')
  if (!id) return
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top, behavior: reduce ? 'auto' : behavior })
  // Keep the URL shareable without triggering a second jump.
  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
  }
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience & Learning' },
  { id: 'contact', label: 'Contact' },
] as const
