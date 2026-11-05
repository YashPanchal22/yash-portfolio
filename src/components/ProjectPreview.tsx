import { motion } from "framer-motion";
import { Lock, MapPinned, Recycle, ScanSearch } from "lucide-react";
import type { Project } from "@/data/portfolio";

/**
 * Stylised, illustrative interface previews built with CSS/SVG.
 * These are NOT screenshots; a caption on each preview makes that explicit.
 */
export default function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#070a1a]">
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.03] px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 truncate font-mono text-[11px] text-slate-500">{project.live.replace("https://", "")}</span>
      </div>

      <div className="relative h-[calc(100%-2.5rem)] p-5">
        {project.id === "feedback" && <FeedbackPreview />}
        {project.id === "nutrizero" && <NutriPreview />}
        {project.id === "roadguard" && <RoadPreview />}
      </div>

      <p className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-slate-600">
        Illustrative preview
      </p>
    </div>
  );
}

function FeedbackPreview() {
  const bars = [62, 84, 47, 91, 73, 58, 88];
  const kpis = [
    { label: "Dashboard", value: "7 KPIs" },
    { label: "Analytics", value: "8 charts" },
    { label: "Access", value: "3 roles" },
  ];
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-3 gap-2.5">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-2.5">
            <p className="text-[10px] text-slate-400">{k.label}</p>
            <p className="mt-1 text-lg font-bold text-white">{k.value}</p>
          </div>
        ))}
      </div>
      <div className="flex h-36 items-end gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-300/80"
          />
        ))}
      </div>
      <div className="flex items-center gap-2 text-[11px] text-slate-400">
        <Lock size={13} className="text-blue-300" aria-hidden="true" />
        Identity fields removed before storage
      </div>
    </div>
  );
}

function NutriPreview() {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 110 110" className="h-24 w-24 shrink-0" aria-hidden="true">
          <circle cx="55" cy="55" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
          <motion.circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke="url(#nutri-grad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * 0.28 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            transform="rotate(-90 55 55)"
          />
          <defs>
            <linearGradient id="nutri-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#34d399" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <text x="55" y="61" textAnchor="middle" className="fill-white text-[15px] font-bold">
            Plan
          </text>
        </svg>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">Budget-aware meal plan</p>
          <p className="text-xs leading-relaxed text-slate-400">Pantry-based recipes, waste reduction, and SDG 2 impact tracking.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {["Pantry recipe", "Storage safety", "Voice readout", "Impact dashboard"].map((m) => (
          <div key={m} className="flex items-center gap-2 rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-[11px] text-slate-200">
            <Recycle size={12} className="shrink-0 text-emerald-300" aria-hidden="true" />
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadPreview() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-slate-800 via-slate-900 to-[#0b1024]">
      {/* Simulated map grid */}
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
        <defs>
          <pattern id="road-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(103,232,249,0.25)" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#road-grid)" />
        <path d="M-10 120 C 80 60, 160 180, 260 90 S 380 40, 420 110" stroke="rgba(148,163,184,0.35)" strokeWidth="14" fill="none" />
      </svg>

      {/* Detection box */}
      <motion.div
        initial={{ opacity: 0, scale: 1.15 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-[18%] top-[30%] h-[30%] w-[38%] rounded-md border-2 border-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.5)]"
      >
        <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-cyan-300 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-900">
          damage detected
        </span>
      </motion.div>
      <div className="absolute right-[12%] top-[58%] h-[20%] w-[24%] rounded-md border-2 border-violet-400 shadow-[0_0_18px_rgba(167,139,250,0.5)]">
        <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-violet-400 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-900">
          repair priority
        </span>
      </div>

      {/* Map pins */}
      {[
        { t: "22%", l: "70%" },
        { t: "68%", l: "30%" },
        { t: "45%", l: "82%" },
      ].map((pin, i) => (
        <span key={i} className="absolute" style={{ top: pin.t, left: pin.l }} aria-hidden="true">
          <span className="ping-slow absolute -inset-2 rounded-full bg-cyan-300/40" />
          <MapPinned size={18} className="relative text-cyan-300 drop-shadow-[0_0_6px_#67e8f9]" />
        </span>
      ))}

      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-[11px] text-slate-200 backdrop-blur">
        <ScanSearch size={14} className="text-cyan-300" aria-hidden="true" />
        YOLOv8s · 5 distress classes
      </div>
    </div>
  );
}
