import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Loader from "@/components/Loader";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);

  return (
    // reducedMotion="user" disables transform/layout animations for users who request reduced motion
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader onDone={handleLoaded} />}</AnimatePresence>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
      >
        Skip to content
      </a>

      <ParticleBackground />
      <Navbar />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
