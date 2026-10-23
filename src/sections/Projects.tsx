import { useMemo, useState } from 'react'
import { FolderOpen } from 'lucide-react'
import {
  deployedCount,
  numberWord,
  projectCategories,
  projectCount,
  projects,
  type ProjectCategory,
} from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'
import { GithubMark } from '../components/BrandIcons'

type Filter = 'All' | ProjectCategory

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  return (
    <section id="projects" className="section relative border-t border-line">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="03 — Featured projects"
            title={`${numberWord(projectCount).replace(/^./, (c) => c.toUpperCase())} applications, built end to end.`}
            description={`Each one has a public repository. ${deployedCount === projectCount ? 'All of them are' : `${deployedCount} are`} deployed and can be opened right now — the screenshots below are real captures of those deployments.`}
          />
          <Reveal delay={80}>
            <a
              href={`${profile.links.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <GithubMark className="h-4 w-4" aria-hidden="true" />
              All repositories
            </a>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
            {projectCategories.map((category) => {
              const active = filter === category
              const count =
                category === 'All'
                  ? projects.length
                  : projects.filter((p) => p.categories.includes(category)).length
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                    active
                      ? 'border-transparent bg-gradient-to-r from-accent to-accent2 text-[#0a0c14]'
                      : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg'
                  }`}
                >
                  {category}
                  <span
                    className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                      active ? 'bg-black/15' : 'bg-surface2'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {projects.length} projects.
        </p>

        {visible.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center">
            <FolderOpen className="h-7 w-7 text-muted" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-soft">No projects in this category yet.</p>
            <button type="button" onClick={() => setFilter('All')} className="btn btn-secondary btn-sm mt-4">
              Show all projects
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {visible.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={120}>
          <div className="mt-8 flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 text-[12.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="font-medium text-soft">About these links:</span> demo buttons open the
              live GitHub Pages deployment in a new tab; source buttons open the matching repository.
              Both were verified on 23 Oct 2026.
            </p>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              {projectCount} repos · {deployedCount} deployed
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
