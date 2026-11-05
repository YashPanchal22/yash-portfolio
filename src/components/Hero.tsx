import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, FolderGit2, GraduationCap, MapPin } from "lucide-react";
import { PERSON } from "@/data/portfolio";
import { useCanUse3D } from "@/hooks/useCanUse3D";

// The 3D scene (three.js + R3F) is code-split and only mounted on capable desktops.
const HeroScene = lazy(() => import("./three/HeroScene"));

/** Lightweight CSS-only orb: used on mobile, reduced-motion, no-WebGL, and while 3D loads. */
export function CssOrb() {
  return (
    <div aria-hidden="true" className="relative h-full w-full">
      <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-blue-500/35 via-violet-600/30 to-cyan-400/25 blur-3xl orb-breathe" />
      <div className="absolute inset-[14%] rounded-full border border-cyan-300/30 bg-white/[0.03] shadow-[0_0_60px_rgba(96,165,250,0.35)] backdrop-blur-sm" />
      <div className="absolute inset-[4%] rounded-full border border-dashed border-violet-400/50 orb-spin" />
      <div className="absolute inset-[0%] rounded-full border border-blue-400/25 orb-spin-reverse">
        <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_#67e8f9]" />
        <span className="absolute bottom-6 right-4 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_#a78bfa]" />
      </div>
    </div>
  );
}

export default function Hero() {
  const canUse3D = useCanUse3D();
  const resumeHref = `${import.meta.env.BASE_URL}${PERSON.resumeFile}`;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 md:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-200"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {PERSON.availability}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 font-mono text-xs uppercase tracking-[0.22em] text-cyan-300 sm:text-sm"
          >
            {PERSON.roleLine}
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-3 text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="gradient-text">Yashkumar M. Panchal</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-3xl"
          >
            {PERSON.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {PERSON.supporting}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 flex flex-col gap-2.5 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-6"
          >
            <li className="flex items-center gap-2">
              <GraduationCap size={16} className="text-violet-300" aria-hidden="true" />
              {PERSON.degreeLine}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-cyan-300" aria-hidden="true" />
              {PERSON.location}
            </li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#projects" className="btn-primary">
              <FolderGit2 size={18} aria-hidden="true" />
              Explore My Projects
            </a>
            <a href={resumeHref} download={PERSON.resumeFile} className="btn-secondary">
              <Download size={18} aria-hidden="true" />
              Download My Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[540px]"
        >
          <div className="absolute inset-0">
            {canUse3D ? (
              <Suspense fallback={<CssOrb />}>
                <HeroScene />
              </Suspense>
            ) : (
              <CssOrb />
            )}
          </div>

          {/* Animated developer monogram floats over the 3D core */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.02em" }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="monogram-glow select-none bg-gradient-to-br from-white via-blue-200 to-violet-300 bg-clip-text text-5xl font-black text-transparent sm:text-6xl"
            >
              {PERSON.initials}
            </motion.span>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down to About Me"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full p-2 text-xs font-mono uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-cyan-300"
      >
        <span>Scroll</span>
        <span className="flex h-9 w-6 justify-center rounded-full border border-slate-500/60 pt-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-cyan-300"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown size={14} className="sr-only" aria-hidden="true" />
      </a>
    </section>
  );
}
