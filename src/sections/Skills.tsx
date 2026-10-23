import { BarChart3, Brain, Code2, Database, LayoutGrid, Server, ShieldCheck } from 'lucide-react'
import { skillGroups } from '../data/skills'
import { TechIcon } from '../components/TechIcon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const groupIcons = {
  code: Code2,
  layout: LayoutGrid,
  server: Server,
  brain: Brain,
  database: Database,
  chart: BarChart3,
  check: ShieldCheck,
} as const

export function Skills() {
  return (
    <section id="skills" className="section relative border-t border-line bg-bg-elev">
      <div className="container-page relative z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="02 — Technical skills"
            title="The stack I actually build with."
            description="Grouped by where I use it. Each tool here appears in a shipped project, my coursework, or the resume — nothing is listed for decoration."
          />
          <Reveal delay={80}>
            <p className="max-w-[16rem] rounded-lg border border-line bg-surface px-3.5 py-3 font-mono text-[11px] leading-relaxed text-muted">
              No percentage bars or star ratings — proficiency is better judged from the projects.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = groupIcons[group.icon as keyof typeof groupIcons] ?? Code2
            return (
              <Reveal key={group.id} delay={i * 55}>
                <article className="card card-hover flex h-full flex-col p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface2 text-accent">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-semibold leading-tight">{group.title}</h3>
                      <p className="mt-0.5 text-[11.5px] text-muted">{group.blurb}</p>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <li key={skill.name}>
                        <span className="chip chip-mono" title={skill.note ?? skill.name}>
                          <TechIcon name={skill.icon} className="h-3.5 w-3.5" />
                          {skill.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}

          <Reveal delay={skillGroups.length * 55}>
            <article className="card flex h-full flex-col justify-between border-dashed p-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Also comfortable with
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-soft">
                  Pydantic schemas, JWT-based auth flows, REST endpoint design, CSV/PDF report
                  generation, on-device OCR, Web Speech API, reproducible local dev environments.
                </p>
              </div>
              <p className="mt-4 border-t border-line pt-3 text-[11.5px] text-muted">
                Everything above is drawn from the four public repositories.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
