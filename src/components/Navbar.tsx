import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { navItems, scrollToHash } from '../lib/navigation'
import { useTheme } from '../lib/theme'
import { profile } from '../data/profile'
import { asset } from '../lib/assets'

function Monogram({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      className={`relative grid place-items-center rounded-xl border border-line-strong bg-surface2 ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/25 via-transparent to-accent2/25" />
      <span className="relative font-display text-[13px] font-bold tracking-tight text-fg">
        {profile.initials}
      </span>
    </span>
  )
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`icon-btn ${className}`}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      aria-pressed={theme === 'light'}
    >
      {theme === 'dark' ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  )
}

export function ResumeButton({ compact = false }: { compact?: boolean }) {
  const [clicked, setClicked] = useState(false)
  return (
    <a
      href={asset(profile.resume.url)}
      download={profile.resume.fileName}
      className={`btn btn-primary ${compact ? 'btn-sm' : ''}`}
      onClick={() => {
        setClicked(true)
        window.setTimeout(() => setClicked(false), 2200)
      }}
      aria-label={`Resume — download PDF (${profile.resume.fileName})`}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {clicked ? 'Downloading…' : 'Resume'}
    </a>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<string>('home')
  const panelRef = useRef<HTMLDivElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  /* Sticky state + reading progress */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  /* Scroll spy — only meaningful on the home route */
  useEffect(() => {
    if (!isHome) {
      setActive('')
      return
    }
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-42% 0px -50% 0px', threshold: [0, 0.25, 0.6] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [isHome])

  /* Mobile menu: escape to close, lock scroll, return focus */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a,button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const goToSection = useCallback(
    (id: string) => {
      setOpen(false)
      if (isHome) {
        scrollToHash(`#${id}`)
        setActive(id)
      } else {
        navigate('/', { state: { scrollTo: id } })
      }
    },
    [isHome, navigate],
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? 'glass border-line shadow-[0_10px_30px_-24px_rgba(0,0,0,0.8)]'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-3" aria-label="Main">
          <Link
            to="/"
            className="group flex items-center gap-3 rounded-lg py-1 pr-2 focus-ring"
            onClick={() => {
              setOpen(false)
              if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <Monogram />
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[13.5px] font-semibold text-fg">
                Yashkumar Panchal
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Data Science · Full-Stack
              </span>
              <span className="sr-only">— home</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = isHome && active === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-accent to-accent2 transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <ResumeButton compact />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="icon-btn lg:hidden"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </nav>
        <div
          className="h-px w-full bg-transparent"
          aria-hidden="true"
        >
          <div
            className="h-px bg-gradient-to-r from-accent to-accent2 transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        className={`glass overflow-hidden border-b border-line lg:hidden ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          maxHeight: open ? 'calc(100dvh - 4rem)' : 0,
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition:
            'max-height 320ms cubic-bezier(0.22,1,0.36,1), opacity 200ms ease, visibility 0s linear ' +
            (open ? '0s' : '320ms'),
        }}
        aria-hidden={!open}
      >
        <div className="container-page flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              tabIndex={open ? 0 : -1}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] font-medium text-soft transition-colors hover:bg-accent-soft hover:text-fg"
            >
              {item.label}
              <span className="font-mono text-[11px] text-muted" aria-hidden="true">0{navItems.indexOf(item) + 1}</span>
            </button>
          ))}
          <div className="mt-2 flex items-center gap-2 border-t border-line pt-3">
            <a
              href={asset(profile.resume.url)}
              download={profile.resume.fileName}
              className="btn btn-primary flex-1"
              tabIndex={open ? 0 : -1}
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Download resume
            </a>
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
