import { motion } from "framer-motion";
import { Calendar, CalendarDays, GraduationCap, School, Trophy, Users } from "lucide-react";
import { ACTIVITIES, EDUCATION } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          id="education-title"
          index="05"
          eyebrow="Education"
          title="Academic Journey"
          description="Formal education and the events where I have applied what I am learning."
        />

        {/* Education timeline */}
        <ol className="relative space-y-6" aria-label="Education timeline">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-violet-400 via-blue-400/60 to-transparent md:left-1/2 md:-translate-x-1/2"
          />
          {EDUCATION.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li key={item.degree} className="relative pl-14 md:pl-0">
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
                  className={`absolute left-[12px] top-6 h-4 w-4 rounded-full border-2 border-violet-300 bg-ink shadow-[0_0_16px_rgba(167,139,250,0.8)] md:left-1/2 md:-translate-x-1/2 ${
                    item.current ? "bg-violet-400" : ""
                  }`}
                />
                <Reveal className={`md:w-[calc(50%-2.5rem)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                  <article
                    className={`glass rounded-2xl p-6 transition-colors duration-300 hover:border-violet-400/40 ${
                      item.current ? "ring-1 ring-violet-400/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-300">
                      {item.current ? <GraduationCap size={14} aria-hidden="true" /> : <School size={14} aria-hidden="true" />}
                      {item.current ? "Current degree" : "Completed"}
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-white">{item.degree}</h3>
                    <p className="mt-1 text-sm text-slate-300">{item.institution}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-slate-200">
                        <Calendar size={13} className="text-cyan-300" aria-hidden="true" />
                        {item.period}
                      </span>
                      {item.detail && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 font-medium text-violet-200">
                          {item.detail}
                        </span>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Activities & achievements */}
        <div className="mt-24">
          <Reveal className="mb-8 text-center">
            <h3 className="text-2xl font-black text-white md:text-3xl">Activities & Events</h3>
            <p className="mt-2 text-sm text-slate-400">Participation only. No rankings or awards are claimed.</p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {ACTIVITIES.map((activity, i) => (
              <Reveal key={activity.title} delay={i * 0.1}>
                <article className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40">
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  />
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 text-blue-200 ring-1 ring-white/10">
                      {i === 0 ? <Users size={20} aria-hidden="true" /> : <Trophy size={20} aria-hidden="true" />}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold leading-snug text-white">{activity.title}</h4>
                      {"subtitle" in activity && activity.subtitle && (
                        <p className="mt-1 text-sm text-slate-300">{activity.subtitle}</p>
                      )}
                      <p className="mt-1 text-sm text-slate-400">{activity.organizer}</p>
                    </div>
                  </div>
                  <div className="relative mt-5 flex flex-wrap items-center gap-2 text-xs">
                    {activity.date && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-cyan-100">
                        <CalendarDays size={12} aria-hidden="true" />
                        {activity.date}
                      </span>
                    )}
                    <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 font-medium text-violet-200">
                      {activity.role}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
