import { ArrowUp, Download } from "lucide-react";
import { CONTACT, NAV_LINKS, PERSON } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/10 bg-ink/60 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-black text-white">
              YP
            </span>
            <p className="font-semibold text-white">{PERSON.name}</p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Full-Stack Developer building scalable web applications, AI-powered solutions, and computer vision systems.
          </p>
          <a
            href={`${import.meta.env.BASE_URL}${PERSON.resumeFile}`}
            download={PERSON.resumeFile}
            className="btn-ghost mt-5"
          >
            <Download size={15} aria-hidden="true" />
            Download Resume (PDF)
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Navigate</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            <li>
              <a href="#top" className="text-slate-300 hover:text-cyan-300">
                Home
              </a>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-slate-300 hover:text-cyan-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Connect</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="text-slate-300 hover:text-cyan-300">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phoneHref}`} className="text-slate-300 hover:text-cyan-300">
                {CONTACT.phone}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-colors hover:border-cyan-300/50 hover:text-cyan-300"
            >
              <LinkedinIcon width={17} height={17} />
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-colors hover:border-cyan-300/50 hover:text-cyan-300"
            >
              <GithubIcon width={17} height={17} />
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="ml-auto flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-300/50 hover:text-cyan-300"
            >
              <ArrowUp size={15} aria-hidden="true" />
              Top
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {year} {PERSON.name}. All rights reserved.</p>
          <p>Designed and built with React, TypeScript, Vite, Tailwind CSS, and React Three Fiber.</p>
        </div>
      </div>
    </footer>
  );
}
