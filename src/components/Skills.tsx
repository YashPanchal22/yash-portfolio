import { motion, type Variants } from "framer-motion";
import { BrainCircuit, Code2, Database, FlaskConical, LayoutTemplate, Server, type LucideIcon } from "lucide-react";
import { SKILL_CATEGORIES, type SkillCategoryId } from "@/data/portfolio";
import { SectionHeading } from "./Reveal";
import { TiltCard } from "./TiltCard";

const CATEGORY_ICONS: Record<SkillCategoryId, LucideIcon> = {
  languages: Code2,
  frontend: LayoutTemplate,
  backend: Server,
  ai: BrainCircuit,
  testing: FlaskConical,
  tools: Database,
};

const CATEGORY_TONE: Record<SkillCategoryId, string> = {
  languages: "from-blue-500 to-cyan-400",
  frontend: "from-cyan-400 to-blue-500",
  backend: "from-emerald-400 to-teal-500",
  ai: "from-violet-500 to-fuchsia-500",
  testing: "from-amber-400 to-orange-500",
  tools: "from-indigo-400 to-violet-500",
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function Skills() {
  const total = SKILL_CATEGORIES.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="skills-title"
          index="02"
          eyebrow="Technical Skills"
          title="Skills & Technologies"
          description={`${total} technologies across ${SKILL_CATEGORIES.length} areas, used in coursework and in the three full-stack projects below.`}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id];
            return (
              <TiltCard key={category.id} maxTilt={6} className="h-full">
                <article className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-violet-400/40">
                  <div
                    aria-hidden="true"
                    className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${CATEGORY_TONE[category.id]} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
                  />
                  <div className="relative flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${CATEGORY_TONE[category.id]} shadow-lg shadow-black/30`}
                    >
                      <Icon size={22} className="text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{category.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{category.description}</p>
                    </div>
                  </div>

                  <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative mt-6 flex flex-wrap gap-2.5"
                  >
                    {category.skills.map((skill) => (
                      <motion.li key={skill} variants={chipVariants}>
                        <span className="chip">{skill}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </article>
              </TiltCard>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          This list reflects technologies I have learned and applied in coursework and projects. I do not list
          proficiency percentages.
        </p>
      </div>
    </section>
  );
}
