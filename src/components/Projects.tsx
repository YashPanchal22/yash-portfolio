import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Eye, FileText, LayoutGrid, Rows3, Sparkles } from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio";
import { GithubIcon } from "./icons";
import { Reveal, SectionHeading } from "./Reveal";
import ProjectModal from "./ProjectModal";
import ProjectPreview from "./ProjectPreview";
import { TiltCard } from "./TiltCard";

type ViewMode = "showcase" | "summary";

const ACCENT_TEXT: Record<Project["accent"], string> = {
  blue: "text-blue-300",
  violet: "text-violet-300",
  cyan: "text-cyan-300",
};

const ACCENT_BORDER: Record<Project["accent"], string> = {
  blue: "hover:border-blue-400/40",
  violet: "hover:border-violet-400/40",
  cyan: "hover:border-cyan-300/40",
};

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <Reveal>
      <TiltCard maxTilt={4}>
        <article
          aria-labelledby={`project-${project.id}-title`}
          className={`glass grid grid-cols-1 gap-8 rounded-3xl p-6 transition-colors duration-300 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 ${ACCENT_BORDER[project.accent]}`}
        >
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <ProjectPreview project={project} />
          </div>

          <div className="flex min-w-0 flex-col">
            <p className={`font-mono text-xs uppercase tracking-[0.2em] ${ACCENT_TEXT[project.accent]}`}>
              Project {project.number} · {project.tagline}
            </p>
            <h3 id={`project-${project.id}-title`} className="mt-3 text-2xl font-black leading-tight text-white md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">{project.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.shortTitle} technology stack`}>
              {project.stack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Key features</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-1 xl:grid-cols-2">
                {project.features.slice(0, 6).map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm leading-snug text-slate-300">
                    <Sparkles size={14} className={`mt-0.5 shrink-0 ${ACCENT_TEXT[project.accent]}`} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              {project.features.length > 6 && (
                <p className="mt-2 text-xs text-slate-500">+ {project.features.length - 6} more in the project details.</p>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">My contribution</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.contribution}</p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.shortTitle} GitHub repository (opens in a new tab)`}
                className="btn-secondary !py-2.5 !text-[13px]"
              >
                <GithubIcon width={16} height={16} />
                GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.shortTitle} live demo (opens in a new tab)`}
                className="btn-primary !py-2.5 !text-[13px]"
              >
                <ArrowUpRight size={16} aria-hidden="true" />
                Live Demo
              </a>
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="btn-ghost !py-2.5"
                aria-haspopup="dialog"
              >
                <FileText size={16} aria-hidden="true" />
                Full Details
              </button>
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

function SummaryView({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <Reveal>
      <div className="glass overflow-x-auto rounded-3xl">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="px-6 pb-2 pt-6 text-left text-sm text-slate-400">
            Recruiter summary: all three projects at a glance. Select a project name for full details.
          </caption>
          <thead>
            <tr className="border-b border-white/10 font-mono text-xs uppercase tracking-widest text-slate-400">
              <th scope="col" className="px-6 py-4 font-medium">Project</th>
              <th scope="col" className="px-6 py-4 font-medium">Impact</th>
              <th scope="col" className="px-6 py-4 font-medium">Core stack</th>
              <th scope="col" className="px-6 py-4 font-medium">Links</th>
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map((project) => (
              <tr key={project.id} className="border-b border-white/5 align-top last:border-0 hover:bg-white/[0.03]">
                <th scope="row" className="px-6 py-5 font-semibold text-white">
                  <button
                    type="button"
                    onClick={() => onOpen(project)}
                    className="text-left underline-offset-4 hover:text-cyan-300 hover:underline"
                    aria-haspopup="dialog"
                  >
                    {project.shortTitle}
                  </button>
                  <span className="mt-1 block text-xs font-normal text-slate-500">{project.tagline}</span>
                </th>
                <td className="max-w-xs px-6 py-5 text-slate-300">{project.summaryImpact}</td>
                <td className="px-6 py-5 text-slate-300">
                  {project.stack.slice(0, 5).join(", ")}
                  {project.stack.length > 5 ? " …" : ""}
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-200 hover:text-cyan-300"
                    >
                      <GithubIcon width={14} height={14} aria-hidden="true" /> GitHub
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-200 hover:text-cyan-300"
                    >
                      <ArrowUpRight size={14} aria-hidden="true" /> Live demo
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const [view, setView] = useState<ViewMode>("showcase");
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="projects-title"
          index="03"
          eyebrow="Featured Projects"
          title="Real Projects, Live & Open Source"
          description="Three full-stack applications with public GitHub repositories and live demos. Each includes an overview, technology stack, key features, and my contribution."
        />

        <div className="mb-10 flex justify-center">
          <div
            role="group"
            aria-label="Project view"
            className="glass inline-flex rounded-2xl p-1.5"
          >
            {(
              [
                { id: "showcase", label: "Showcase", icon: LayoutGrid },
                { id: "summary", label: "Recruiter Summary", icon: Rows3 },
              ] as const
            ).map((option) => {
              const active = view === option.id;
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setView(option.id)}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    active ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="view-toggle"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/80 to-violet-600/80 shadow-lg shadow-blue-600/25"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon size={15} className="relative" aria-hidden="true" />
                  <span className="relative">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "showcase" ? (
            <motion.div
              key="showcase"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-8"
            >
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={setSelected} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <SummaryView onOpen={setSelected} />
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <Eye size={14} aria-hidden="true" />
          Preview panels are illustrative interface sketches, not product screenshots.
        </p>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
