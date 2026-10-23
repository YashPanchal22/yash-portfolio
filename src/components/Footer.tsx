import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { navItems } from '../lib/navigation'
import { GithubMark, LinkedinMark } from './BrandIcons'

export function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line bg-bg-elev">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong bg-surface2 font-display text-sm font-bold">
                {profile.initials}
              </span>
              <span className="font-display text-base font-semibold">Yashkumar M. Panchal</span>
            </Link>
            <p className="lead mt-4 max-w-sm text-sm">
              B.Sc. Data Science student building full-stack, AI-assisted and data-driven
              applications. Open to developer and AI/ML internships.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4" aria-hidden="true" /> {profile.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Sections</h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => navigate('/', { state: { scrollTo: item.id } })}
                    className="text-sm text-soft transition-colors hover:text-accent"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-accent"
                >
                  <GithubMark className="h-4 w-4" aria-hidden="true" /> GitHub
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-accent"
                >
                  <LinkedinMark className="h-4 w-4" aria-hidden="true" /> LinkedIn
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={profile.links.email}
                  className="group inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" /> Email
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[12.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Yashkumar M. Panchal. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Built with React · TypeScript · Vite · Tailwind CSS
          </p>
        </div>
        <p className="mt-2 font-mono text-[11px] text-muted">
          All repository and deployment links on this site were checked on 23 Oct 2026.
        </p>
      </div>
    </footer>
  )
}
