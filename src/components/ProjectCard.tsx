import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, ExternalLink } from 'lucide-react'
import type { Project } from '../data/projects'
import { SmartImage } from './SmartImage'
import { TechIcon } from './TechIcon'
import { GithubMark } from './BrandIcons'

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const visibleStack = project.stack.slice(0, 4)
  const extra = project.stack.length - visibleStack.length

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link
        to={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden focus-ring"
      >
        <SmartImage
          src={project.cover}
          alt={`${project.title} interface screenshot`}
          className="h-full w-full"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
          priority={index < 2}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          {project.demoUrl ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-emerald-200 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Live demo
            </span>
          ) : (
            <span className="rounded-full border border-white/20 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/80 backdrop-blur">
              Source only
            </span>
          )}
          <span className="rounded-full border border-white/15 bg-black/35 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/75 backdrop-blur">
            {project.year}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <span key={c} className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
              {c}
            </span>
          ))}
        </div>

        <h3 className="mt-2 font-display text-[19px] font-semibold leading-tight">
          <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-accent focus-ring">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-[12.5px] text-muted">{project.tagline}</p>

        <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-soft">{project.summary}</p>

        <ul className="mt-4 space-y-1.5">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2 text-[12.5px] leading-relaxed text-muted">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
              <span className="line-clamp-2">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleStack.map((tech) => (
            <span key={tech.name} className="chip chip-mono">
              <TechIcon name={tech.icon} className="h-3.5 w-3.5" />
              {tech.name}
            </span>
          ))}
          {extra > 0 && <span className="chip chip-mono text-muted">+{extra}</span>}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <Link to={`/projects/${project.slug}`} className="btn btn-secondary btn-sm">
            Case study
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              aria-label={`Live demo — open ${project.title} in a new tab`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live demo
            </a>
          ) : null}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm ml-auto"
            aria-label={`Source code — open ${project.title} on GitHub in a new tab`}
          >
            <GithubMark className="h-3.5 w-3.5" aria-hidden="true" />
            Source
          </a>
        </div>
      </div>
    </article>
  )
}
