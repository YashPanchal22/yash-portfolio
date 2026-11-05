import { useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { NAV_LINKS, PERSON } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = ["top", ...NAV_LINKS.map((link) => link.id)] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const active = useActiveSection(SECTION_IDS, "top");
  const resumeHref = `${import.meta.env.BASE_URL}${PERSON.resumeFile}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and when the viewport becomes desktop-sized.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled || open ? "glass-strong mx-3 shadow-2xl shadow-black/40 sm:mx-6 lg:mx-auto" : "bg-transparent"
        }`}
      >
        <a
          href="#top"
          onClick={closeMenu}
          className="group flex items-center gap-3 rounded-lg"
          aria-label="Yashkumar M. Panchal, back to top"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-black text-white shadow-lg shadow-blue-600/30 transition-transform duration-300 group-hover:scale-105">
            YP
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-white">Yashkumar M. Panchal</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Full-Stack Developer</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative block rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      isActive ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={resumeHref}
            download={PERSON.resumeFile}
            className="btn-secondary hidden !py-2 !text-[13px] sm:inline-flex"
          >
            <Download size={15} aria-hidden="true" />
            Resume
          </a>

          <button
            type="button"
            className="btn-ghost lg:hidden !px-2.5"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-3 mt-2 rounded-2xl border border-white/10 bg-[#0b1024] p-3 shadow-2xl shadow-black/60 sm:mx-6 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={closeMenu}
                        aria-current={isActive ? "location" : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? "bg-blue-500/10 text-white"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {link.label}
                        {isActive && <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" aria-hidden="true" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <a
              href={resumeHref}
              download={PERSON.resumeFile}
              onClick={closeMenu}
              className="btn-primary mt-3 w-full"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume (PDF)
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
