import type { ReactNode } from 'react'
import { ArrowRight, Download, Mail, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'
import { deployedCount, projectCount } from '../data/projects'
import { asset } from '../lib/assets'
import { scrollToSection } from '../lib/scroll'
import { Reveal } from '../components/Reveal'
import { TechIcon } from '../components/TechIcon'

function CodeCard() {
  const line = (n: number, content: ReactNode) => (
    <div className="flex gap-4">
      <span className="w-4 shrink-0 select-none text-right text-[11px] leading-6 text-muted/60">{n}</span>
      <span className="leading-6">{content}</span>
    </div>
  )

  return (
    <figure className="card relative overflow-hidden p-0 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        aria-hidden="true"
      />
      <div className="flex items-center gap-2 border-b border-line bg-surface2/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] text-muted">profile.ts</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-muted/70">
          TypeScript
        </span>
      </div>

      <div className="relative overflow-hidden bg-[var(--code-bg)] px-4 py-5 font-mono text-[12px] sm:text-[12.5px]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-accent/10 to-transparent"
          aria-hidden="true"
        />
        <div className="relative space-y-0.5 text-soft">
          {line(1, <><span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">yashkumar</span> <span className="text-muted">=</span> <span className="text-muted">{'{'}</span></>)}
          {line(2, <><span className="pl-4 text-[#82aaff]">role</span><span className="text-muted">:</span> <span className="text-[#c3e88d]">"Full-Stack Developer"</span><span className="text-muted">,</span></>)}
          {line(3, <><span className="pl-4 text-[#82aaff]">study</span><span className="text-muted">:</span> <span className="text-[#c3e88d]">"B.Sc. Data Science"</span><span className="text-muted">,</span></>)}
          {line(4, <><span className="pl-4 text-[#82aaff]">graduating</span><span className="text-muted">:</span> <span className="text-[#f78c6c]">2027</span><span className="text-muted">,</span></>)}
          {line(5, <><span className="pl-4 text-[#82aaff]">based</span><span className="text-muted">:</span> <span className="text-[#c3e88d]">"Ahmedabad, IN"</span><span className="text-muted">,</span></>)}
          {line(6, <><span className="pl-4 text-[#82aaff]">focus</span><span className="text-muted">: [</span><span className="text-[#c3e88d]">"React"</span><span className="text-muted">, </span><span className="text-[#c3e88d]">"FastAPI"</span><span className="text-muted">, </span><span className="text-[#c3e88d]">"AI/ML"</span><span className="text-muted">],</span></>)}
          {line(7, <><span className="pl-4 text-[#82aaff]">shipped</span><span className="text-muted">:</span> <span className="text-[#f78c6c]">{projectCount}</span> <span className="text-muted">projects,</span></>)}
          {line(8, <><span className="pl-4 text-[#82aaff]">liveDemos</span><span className="text-muted">:</span> <span className="text-[#f78c6c]">{deployedCount}</span><span className="text-muted">,</span></>)}
          {line(9, <><span className="pl-4 text-[#82aaff]">openTo</span><span className="text-muted">:</span> <span className="text-[#c3e88d]">"internships"</span><span className="text-muted">,</span></>)}
          {line(10, <><span className="text-muted">{'}'}</span><span className="text-muted">;</span></>)}
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 font-mono text-[10.5px] text-white/45">
          <span className="dot-live" aria-hidden="true" />
          compiled · 0 errors
          <span className="ml-auto">~/portfolio</span>
        </div>
      </div>

      <figcaption className="sr-only">
        A code-style summary card listing my role, degree, graduation year, location, technology
        focus, project count and availability.
      </figcaption>
    </figure>
  )
}

export function Hero() {
  return (
    <section id="home" className="grid-backdrop relative overflow-hidden">
      <div className="glow left-[-10%] top-[-15%] h-[380px] w-[380px] bg-accent" aria-hidden="true" />
      <div className="glow right-[-8%] top-[10%] h-[420px] w-[420px] bg-accent2" aria-hidden="true" />

      <div className="container-page relative z-10 grid items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14 lg:pb-28 lg:pt-24">
        <div>
          <Reveal>
            <span className="pill">
              <span className="dot-live" aria-hidden="true" />
              {profile.availability}
            </span>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,1.15rem+3.4vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
              Building Intelligent
              <br className="hidden sm:block" /> Solutions with{' '}
              <span className="text-gradient">Code, Data &amp; AI.</span>
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="lead mt-6 max-w-xl">{profile.subheadline}</p>
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary h-11 px-5"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Explore My Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={asset(profile.resume.url)}
                download={profile.resume.fileName}
                className="btn btn-secondary h-11 px-5"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
              <button type="button" onClick={() => scrollToSection('contact')} className="btn btn-ghost h-11 px-4">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact Me
              </button>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Role</p>
                <p className="mt-1 text-soft">Full-Stack Developer</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Studying</p>
                <p className="mt-1 text-soft">B.Sc. Data Science</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Location</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-soft">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Ahmedabad, India
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="relative">
          <div className="animate-floaty-slow">
            <CodeCard />
          </div>

          {/* Stack chips sit below the card so they never cover the code */}
          <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Core technologies">
            {[
              { icon: 'react', label: 'React 19' },
              { icon: 'typescript', label: 'TypeScript' },
              { icon: 'fastapi', label: 'FastAPI' },
              { icon: 'googlegemini', label: 'Gemini SDK' },
              { icon: 'python', label: 'Python' },
            ].map((tech, i) => (
              <li
                key={tech.label}
                className="animate-floaty inline-flex items-center gap-2 rounded-lg border border-line bg-bg-elev px-2.5 py-1.5 shadow-sm"
                style={{ animationDelay: `${-i * 1.2}s`, animationDuration: `${6 + i}s` }}
              >
                <TechIcon name={tech.icon} className="h-3.5 w-3.5" />
                <span className="font-mono text-[11px] text-soft">{tech.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
