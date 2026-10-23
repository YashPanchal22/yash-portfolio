import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Trophy,
} from 'lucide-react'
import { activities, certifications, education } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const timeline = [
  {
    period: '2026 — Present',
    title: 'Full-stack project development (self-directed)',
    org: 'Independent · Ahmedabad',
    icon: BriefcaseBusiness,
    points: [
      'Designed, built and deployed three full-stack applications covering nutrition, academic feedback and fraud detection.',
      'Implemented Python FastAPI services with Pydantic validation and a Node.js/Express service with JWT authentication.',
      'Wrote 17 automated tests for ScamShield AI across Pytest and Vitest, and shipped public GitHub Pages demos with documented demo accounts.',
    ],
    tag: 'Projects',
  },
  {
    period: 'Sep 2026',
    title: 'KALPVRUKSH 2.0 — NextGen ChatBot Arena · Rapid Web Challenge',
    org: 'Silver Oak University',
    icon: Trophy,
    points: [
      'Built the Faculty Anonymous Feedback & Performance Analytics System for the challenge.',
      'Focused the build on a privacy-first ingestion pipeline, multi-tier RBAC and an eight-chart analytics dashboard.',
    ],
    tag: 'Challenge',
  },
  {
    period: '2026',
    title: 'Ideathon: Viksit Bharat 2047',
    org: 'Silver Oak University',
    icon: Award,
    points: [
      'Participated in the ideathon, developing and pitching a problem-first concept with a student team.',
    ],
    tag: 'Ideathon',
  },
]

export function Experience() {
  return (
    <section id="experience" className="section relative border-t border-line bg-bg-elev">
      <div className="container-page">
        <SectionHeading
          eyebrow="04 — Projects & technical experience"
          title="Learning by shipping, not by listing."
          description="I have no formal employment history yet — the experience below is academic project work, competitions and structured coursework. It is described exactly as it happened."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Timeline */}
          <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-7">
            {timeline.map((item, i) => {
              const Icon = item.icon
              return (
                <li key={item.title} className="relative">
                  <span
                    className="absolute -left-[1.82rem] top-1 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-line-strong bg-bg-elev shadow-sm sm:-left-[2.07rem]"
                    aria-hidden="true"
                  >
                    <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  </span>
                  <Reveal delay={i * 70}>
                    <div className="card p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="chip mono chip-mono">
                          <CalendarDays className="h-3 w-3" aria-hidden="true" />
                          {item.period}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="mt-2.5 font-display text-[16px] font-semibold leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-[12.5px] text-muted">{item.org}</p>
                      <ul className="mt-3 space-y-2">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-2 text-[13px] leading-relaxed text-soft">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>

          {/* Education + certifications */}
          <div className="space-y-8">
            <div id="education">
              <Reveal>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <GraduationCap className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
                  Education
                </h3>
              </Reveal>

              <div className="mt-4 space-y-3">
                {education.map((item, i) => (
                  <Reveal key={item.degree} delay={i * 60}>
                    <article className="card relative overflow-hidden p-4">
                      {item.current && (
                        <span
                          className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent to-accent2"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-[13.5px] font-semibold leading-snug text-fg">{item.degree}</h4>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-1 text-[12.5px] text-soft">
                        {item.school} · {item.place}
                      </p>
                      {item.detail ? (
                        <span className="mt-2 inline-flex rounded-md border border-accent-line bg-accent-soft px-2 py-0.5 font-mono text-[10.5px] text-accent">
                          {item.detail}
                        </span>
                      ) : null}
                      {item.coursework.length > 0 ? (
                        <p className="mt-2.5 text-[11.5px] leading-relaxed text-muted">
                          Relevant coursework: {item.coursework.join(' · ')}
                        </p>
                      ) : null}
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <BadgeCheck className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
                  Certifications &amp; courses
                </h3>
              </Reveal>
              <ul className="mt-4 space-y-2">
                {certifications.map((cert, i) => (
                  <li key={cert.name}>
                    <Reveal delay={i * 50} className="card flex items-start justify-between gap-3 p-3.5">
                      <div>
                        <p className="text-[13px] font-medium leading-snug text-fg">{cert.name}</p>
                        <p className="mt-0.5 text-[11.5px] text-muted">{cert.issuer}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                        {cert.date ?? cert.kind}
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Reveal>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <Trophy className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
                  Activities
                </h3>
              </Reveal>
              <ul className="mt-4 space-y-2">
                {activities.map((activity, i) => (
                  <li key={activity.name}>
                    <Reveal delay={i * 50} className="card p-3.5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="text-[13px] font-medium leading-snug text-fg">{activity.name}</p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                          {activity.date ?? activity.role}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11.5px] text-muted">
                        {activity.role} · {activity.org}
                      </p>
                      <p className="mt-1.5 text-[11.5px] leading-relaxed text-soft">{activity.note}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
