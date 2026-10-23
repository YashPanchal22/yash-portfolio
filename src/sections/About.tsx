import {
  BrainCircuit,
  GraduationCap,
  LayoutTemplate,
  Languages,
  MapPin,
  Server,
  Sparkles,
  TableProperties,
  Target,
} from 'lucide-react'
import { profile, education } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const focusAreas = [
  {
    icon: LayoutTemplate,
    title: 'Full-stack web development',
    detail: 'React + TypeScript front ends wired to typed APIs and real data.',
  },
  {
    icon: BrainCircuit,
    title: 'AI & machine learning',
    detail: 'Gemini-powered assistants, rule-based NLP and model evaluation.',
  },
  {
    icon: TableProperties,
    title: 'Data analytics & visualisation',
    detail: 'KPI dashboards, correlation views and exported reports.',
  },
  {
    icon: Server,
    title: 'Database-driven applications',
    detail: 'Relational schemas, auth and role-based access control.',
  },
  {
    icon: Target,
    title: 'Practical, user-focused software',
    detail: 'Small tools that solve a specific problem end to end.',
  },
]

export function About() {
  const degree = education[0]

  return (
    <section id="about" className="section border-t border-line">
      <div className="container-page grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="01 — About"
            title="A data science student who ships complete software."
          />

          <Reveal delay={60}>
            <div className="mt-6 space-y-4">
              <p className="lead">
                I am a third-year <strong className="font-semibold text-fg">B.Sc. Data Science</strong>{' '}
                student at Silver Oak University, Ahmedabad. My work sits between data science and
                product engineering: I like taking an idea from a blank repository to a deployed
                application that real people can open, click and use.
              </p>
              <p className="lead">
                Along the way I have built a privacy-first feedback platform, a Gemini-powered
                nutrition assistant and an explainable scam detector — each with its own API,
                tests and public deployment.
                Building them taught me where the interesting problems actually live: validation,
                access control, honest error states and the small details that make an interface
                feel trustworthy.
              </p>
              <p className="lead">
                I am looking for an internship or entry-level role where I can contribute across
                the stack while growing toward AI and analytics engineering.
              </p>
            </div>
          </Reveal>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {focusAreas.map((area, i) => {
              const Icon = area.icon
              return (
                <Reveal key={area.title} delay={i * 55}>
                  <div className="card card-hover flex h-full items-start gap-3 p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent-line bg-accent-soft text-accent">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-fg">{area.title}</h3>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{area.detail}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal delay={120} className="lg:pt-4">
          <aside className="card sticky top-24 overflow-hidden">
            <div className="border-b border-line bg-surface2/50 px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Snapshot</p>
              <p className="mt-1 font-display text-base font-semibold">Currently</p>
            </div>

            <div className="divide-y divide-line">
              <div className="flex items-start gap-3 px-5 py-4">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Education</p>
                  <p className="mt-1 text-[13.5px] text-soft">
                    {degree.degree.replace(' (B.Sc. Data Science)', '')}
                    <span className="mt-0.5 block text-[12px] text-muted">
                      {degree.school} · {degree.period} · {degree.detail}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-5 py-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Based in</p>
                  <p className="mt-1 text-[13.5px] text-soft">{profile.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-5 py-4">
                <Languages className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Languages</p>
                  <p className="mt-1 text-[13.5px] text-soft">{profile.languages.join(' · ')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-5 py-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Looking for</p>
                  <p className="mt-1 text-[13.5px] text-soft">
                    Full-stack developer / AI-ML internship or entry-level role
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-line px-5 py-4">
              <p className="text-[11.5px] leading-relaxed text-muted">
                Every project on this site links to a public repository, and each one also has a
                working deployment you can open right now.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
