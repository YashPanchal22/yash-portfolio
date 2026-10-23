import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  CircleDot,
  ExternalLink,
  Layers,
  ShieldAlert,
  Target,
  Users,
} from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { usePageMeta } from '../lib/seo'
import { SmartImage } from '../components/SmartImage'
import { asset } from '../lib/assets'
import { TechIcon } from '../components/TechIcon'
import { Reveal } from '../components/Reveal'
import { NotFound } from './NotFound'
import { GithubMark } from '../components/BrandIcons'

export function ProjectDetail() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  const index = projects.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? projects[index - 1] : null
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : null

  usePageMeta({
    title: project ? `${project.title} — Case study` : 'Project not found',
    description: project
      ? `${project.tagline}. ${project.summary}`
      : 'The requested project could not be found.',
    path: `/projects/${slug}`,
    type: 'article',
    image: project?.cover,
  })

  if (!project) return <NotFound />

  const openProjects = () => navigate('/', { state: { scrollTo: 'projects' } })

  return (
    <article className="pb-4">
      {/* Header */}
      <header className="grid-backdrop relative overflow-hidden border-b border-line">
        <div className="glow left-[-8%] top-[-30%] h-[320px] w-[320px] bg-accent" aria-hidden="true" />
        <div className="container-page relative z-10 pb-10 pt-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-muted">
            <Link to="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <button type="button" onClick={openProjects} className="transition-colors hover:text-accent">
              Projects
            </button>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-soft" aria-current="page">
              {project.title}
            </span>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.categories.map((c) => (
              <span key={c} className="pill font-mono text-[10.5px] uppercase tracking-[0.1em]">
                {c}
              </span>
            ))}
            <span
              className={`pill font-mono text-[10.5px] uppercase tracking-[0.1em] ${
                project.demoUrl ? 'text-emerald-300' : 'text-muted'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${project.demoUrl ? 'bg-emerald-400' : 'bg-muted'}`}
                aria-hidden="true"
              />
              {project.status}
            </span>
            <span className="pill font-mono text-[10.5px] uppercase tracking-[0.1em]">{project.year}</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-[clamp(1.9rem,1.1rem+2.6vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.025em]">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary h-10 px-4"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Open live demo
              </a>
            ) : null}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary h-10 px-4"
            >
              <GithubMark className="h-4 w-4" aria-hidden="true" />
              View source code
            </a>
            <button type="button" onClick={openProjects} className="btn btn-ghost h-10 px-4">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All projects
            </button>
          </div>

          {project.demoNote ? (
            <p className="mt-4 max-w-2xl rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[12px] leading-relaxed text-muted">
              <span className="font-medium text-soft">Note on the demo: </span>
              {project.demoNote}
            </p>
          ) : null}
        </div>
      </header>

      <div className="container-page mt-8">
        <Reveal>
          <SmartImage
            src={project.cover}
            alt={`${project.title} application screenshot`}
            className="overflow-hidden rounded-2xl border border-line-strong shadow-2xl"
            imgClassName="w-full"
            priority
          />
        </Reveal>
      </div>

      <div className="container-page mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        {/* Main column */}
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="overview-heading">
            <Reveal>
              <h2 id="overview-heading" className="font-display text-xl font-semibold">
                Overview
              </h2>
              <p className="lead mt-3">{project.summary}</p>
            </Reveal>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Reveal delay={60}>
                <div className="card h-full p-4">
                  <div className="flex items-center gap-2 text-accent">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em]">Problem</h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-soft">{project.problem}</p>
                </div>
              </Reveal>
              <Reveal delay={110}>
                <div className="card h-full p-4">
                  <div className="flex items-center gap-2 text-accent">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em]">Intended users</h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-soft">{project.users}</p>
                </div>
              </Reveal>
            </div>
          </section>

          <section aria-labelledby="features-heading">
            <Reveal>
              <h2 id="features-heading" className="font-display text-xl font-semibold">
                What it does
              </h2>
              <p className="mt-2 text-[13px] text-muted">
                Features implemented in the repository — not a roadmap.
              </p>
            </Reveal>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <li key={feature}>
                  <Reveal
                    delay={i * 35}
                    className="flex h-full items-start gap-2.5 rounded-lg border border-line bg-surface p-3"
                  >
                    <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-[12.5px] leading-relaxed text-soft">{feature}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="architecture-heading">
            <Reveal>
              <h2 id="architecture-heading" className="flex items-center gap-2 font-display text-xl font-semibold">
                <Layers className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
                Technical architecture
              </h2>
            </Reveal>
            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              {project.architecture.map((row, i) => (
                <div
                  key={row.layer}
                  className={`grid gap-1 px-4 py-3.5 sm:grid-cols-[140px_1fr] sm:gap-4 ${
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface2/50'
                  }`}
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                    {row.layer}
                  </span>
                  <span className="text-[12.5px] leading-relaxed text-soft">{row.detail}</span>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="challenges-heading">
            <Reveal>
              <h2 id="challenges-heading" className="font-display text-xl font-semibold">
                Implementation challenges &amp; solutions
              </h2>
            </Reveal>
            <div className="mt-4 space-y-3">
              {project.challenges.map((item, i) => (
                <Reveal key={item.title} delay={i * 50}>
                  <div className="card relative overflow-hidden p-4 pl-5">
                    <span
                      className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent to-accent2"
                      aria-hidden="true"
                    />
                    <h3 className="text-[13.5px] font-semibold text-fg">{item.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{item.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {project.gallery.length > 1 ? (
            <section aria-labelledby="gallery-heading">
              <Reveal>
                <h2 id="gallery-heading" className="font-display text-xl font-semibold">
                  Screenshots
                </h2>
                <p className="mt-2 text-[13px] text-muted">
                  Real captures from the deployed application. Select one to enlarge.
                </p>
              </Reveal>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.gallery.map((shot, i) => (
                  <Reveal key={shot.src} delay={i * 50}>
                    <figure>
                      <button
                        type="button"
                        onClick={() => setLightbox(shot.src)}
                        className="block w-full overflow-hidden rounded-xl border border-line transition-colors hover:border-accent-line focus-ring"
                        aria-label={`Enlarge screenshot: ${shot.caption}`}
                      >
                        <SmartImage
                          src={shot.src}
                          alt={shot.alt}
                          className="aspect-[16/10] w-full"
                        />
                      </button>
                      <figcaption className="mt-2 text-[11.5px] text-muted">{shot.caption}</figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}

          {project.integrity ? (
            <Reveal>
              <aside className="notice notice-warn p-4">
                <ShieldAlert className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-[12.5px] font-semibold">Scope &amp; honesty note</h3>
                  <p className="mt-1 text-[12px] leading-relaxed opacity-90">{project.integrity}</p>
                </div>
              </aside>
            </Reveal>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="border-b border-line bg-surface2/50 px-4 py-3">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Project links</h2>
              </div>
              <div className="space-y-2 p-4">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full justify-between text-[12.5px]"
                >
                  <span className="inline-flex items-center gap-2">
                    <GithubMark className="h-4 w-4" aria-hidden="true" /> Source code
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-between text-[12.5px]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <p className="rounded-lg border border-dashed border-line px-3 py-2.5 text-center text-[11.5px] text-muted">
                    Not deployed — source only
                  </p>
                )}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11.5px]">
                  <div>
                    <p className="text-muted">Year</p>
                    <p className="text-soft">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-muted">Status</p>
                    <p className="text-soft">{project.status}</p>
                  </div>
                  {project.license ? (
                    <div>
                      <p className="text-muted">License</p>
                      <p className="text-soft">{project.license}</p>
                    </div>
                  ) : null}
                  <div>
                    <p className="text-muted">Modules</p>
                    <p className="text-soft">{project.features.length} features</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="card p-4">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Tech stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech.name}>
                    <span className="chip chip-mono">
                      <TechIcon name={tech.icon} className="h-3.5 w-3.5" />
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card p-4">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">More projects</h2>
              <ul className="mt-3 space-y-2">
                {projects
                  .filter((p) => p.slug !== project.slug)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`/projects/${p.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-lg border border-line px-3 py-2 text-[12.5px] text-soft transition-colors hover:border-accent-line hover:text-fg"
                      >
                        <span className="truncate">{p.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* Prev / next */}
      <nav className="container-page mt-14" aria-label="Project pagination">
        <div className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="card card-hover flex items-center gap-3 p-4 text-left"
            >
              <ArrowLeft className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  Previous
                </span>
                <span className="block truncate text-[13.5px] font-medium text-soft">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="card card-hover flex items-center justify-end gap-3 p-4 text-right"
            >
              <span className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  Next
                </span>
                <span className="block truncate text-[13.5px] font-medium text-soft">{next.title}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </nav>

      {/* Lightbox */}
      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged screenshot"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-[12px] text-white"
          >
            Close
          </button>
          <img
            src={asset(lightbox)}
            alt="Enlarged project screenshot"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto max-w-full rounded-lg border border-white/15"
          />
        </div>
      ) : null}
    </article>
  )
}
