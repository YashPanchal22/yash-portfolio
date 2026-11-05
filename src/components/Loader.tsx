import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface LoaderProps {
  onDone: () => void;
}

/** Animated intro shown while the page prepares. Calls onDone when finished. */
export default function Loader({ onDone }: LoaderProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(onDone, reduce ? 250 : 1700);
    return () => window.clearTimeout(timer);
  }, [onDone, reduce]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05060f]"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#60a5fa" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <motion.path
            d="M60 6 L108 33 L108 87 L60 114 L12 87 L12 33 Z"
            fill="none"
            stroke="url(#loader-grad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reduce ? 0.1 : 1.2, ease: "easeInOut" }}
          />
          <motion.path
            d="M60 22 L94 41 L94 79 L60 98 L26 79 L26 41 Z"
            fill="none"
            stroke="#67e8f9"
            strokeOpacity="0.45"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0.1 : 1.4, delay: 0.2, ease: "easeInOut" }}
          />
        </svg>
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-3xl font-black tracking-tight text-white monogram-glow"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          YP
        </motion.span>
      </div>

      <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0.1 : 1.5, ease: "easeInOut" }}
        />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-slate-400">Loading portfolio</p>
    </motion.div>
  );
}
