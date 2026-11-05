import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { GithubIcon } from "./icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Accessible detail dialog: traps focus on open, closes on Escape or backdrop
 * click, locks background scroll, and returns focus to the trigger on close.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const isOpen = project !== null;

  useEffect(() => {
    if (!isOpen) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      // Simple focus trap across focusable elements inside the dialog.
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // Portal to <body> so the dialog escapes <main>'s stacking context and sits above the navbar.
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close project details"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-3xl sm:max-w-3xl sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6 md:p-7">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
                  Project {project.number}
                </p>
                <h2 id="project-modal-title" className="mt-2 text-xl font-black leading-snug text-white md:text-2xl">
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="btn-ghost shrink-0 !px-2.5"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="scrollbar-thin flex-1 space-y-7 overflow-y-auto p-6 md:p-7">
              <section aria-labelledby="modal-overview">
                <h3 id="modal-overview" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                  Overview
                </h3>
                <p className="mt-3 leading-relaxed text-slate-300">{project.description}</p>
              </section>

              <section aria-labelledby="modal-features">
                <h3 id="modal-features" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                  Key features
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                      <Sparkles size={15} className="mt-0.5 shrink-0 text-violet-300" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="modal-contribution" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 id="modal-contribution" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                  My contribution
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.contribution}</p>
              </section>

              <section aria-labelledby="modal-stack">
                <h3 id="modal-stack" className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                  Technology stack
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 p-6 sm:flex-row md:p-7">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1"
                aria-label={`${project.shortTitle} GitHub repository (opens in a new tab)`}
              >
                <GithubIcon width={16} height={16} />
                View on GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
                aria-label={`${project.shortTitle} live demo (opens in a new tab)`}
              >
                <ArrowUpRight size={16} aria-hidden="true" />
                Open Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
