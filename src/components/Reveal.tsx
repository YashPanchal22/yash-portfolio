import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades and lifts children into view the first time they scroll into the viewport. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
      <p className="section-eyebrow justify-center">
        <span className="text-slate-500">{index}</span>
        <span className="h-px w-8 bg-cyan-300/50" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{description}</p>}
    </Reveal>
  );
}
