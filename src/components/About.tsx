import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { BarChart3, Bot, Code2, Eye, Sparkles } from "lucide-react";
import { ABOUT } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";
import { TiltCard } from "./TiltCard";

const FOCUS_ICONS = [Code2, Bot, Eye, BarChart3, Sparkles];

interface CountUpProps {
  to: number;
  decimals?: number;
  duration?: number;
}

/** Animates a number from 0 to `to` once it scrolls into view. */
function CountUp({ to, decimals = 0, duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow="About"
          title="About Me"
          description="A data science student who builds full-stack products, from the database to the interface."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="glass h-full rounded-3xl p-7 md:p-10">
              <div className="space-y-5 text-base leading-relaxed text-slate-300 md:text-lg">
                {ABOUT.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>

              <h3 className="mt-9 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Focus areas</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {ABOUT.focusAreas.map((area, i) => {
                  const Icon = FOCUS_ICONS[i] ?? Sparkles;
                  return (
                    <li
                      key={area}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/30 to-violet-500/30 text-cyan-200">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      {area}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:gap-5">
            {ABOUT.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="h-full">
                <TiltCard maxTilt={7} className="h-full">
                  <div className="glass group flex h-full flex-col justify-between rounded-2xl p-5 transition-colors duration-300 hover:border-cyan-300/40 md:p-6">
                    <div className="text-4xl font-black text-white md:text-5xl">
                      <span className="bg-gradient-to-br from-white via-blue-200 to-violet-300 bg-clip-text text-transparent">
                        <CountUp to={stat.value} decimals={stat.decimals} />
                      </span>
                    </div>
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-slate-100">{stat.label}</p>
                      <p className="mt-1 text-xs text-slate-500">{stat.hint}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-xs text-slate-500"
        >
          Statistics are taken directly from my resume.
        </motion.p>
      </div>
    </section>
  );
}
