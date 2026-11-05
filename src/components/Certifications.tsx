import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { BrainCircuit, Cloud, Code2, Sparkles, type LucideIcon } from "lucide-react";
import { CERTIFICATIONS, type Certification } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

const ICONS: Record<Certification["icon"], LucideIcon> = {
  cloud: Cloud,
  brain: BrainCircuit,
  sparkles: Sparkles,
  code: Code2,
};

export default function Certifications() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 30,
  });

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          id="certifications-title"
          index="04"
          eyebrow="Certifications"
          title="Learning & Credentials"
          description="Courses and certificates that support my cloud, AI, and programming foundations."
        />

        <ol ref={listRef} className="relative space-y-8 md:space-y-10" aria-label="Certifications timeline">
          {/* Base track */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"
          />
          {/* Scroll-driven glowing progress */}
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-cyan-300 via-blue-400 to-violet-500 shadow-[0_0_12px_rgba(103,232,249,0.8)] md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: progress }}
          />

          {CERTIFICATIONS.map((cert, i) => {
            const Icon = ICONS[cert.icon];
            const isLeft = i % 2 === 0;
            return (
              <li key={cert.title} className="relative pl-14 md:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-[11px] top-7 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/60 bg-ink shadow-[0_0_14px_rgba(103,232,249,0.6)] md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                </span>

                <Reveal className={`md:w-[calc(50%-2.5rem)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                  <article className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_30px_-8px_rgba(103,232,249,0.45)]">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 text-cyan-200 ring-1 ring-white/10">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          {cert.type === "course" ? "Course" : "Certificate"}
                        </p>
                        <h3 className="mt-1 text-lg font-bold leading-snug text-white">{cert.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{cert.provider}</p>
                        {cert.date && (
                          <p className="mt-3 inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
                            {cert.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
