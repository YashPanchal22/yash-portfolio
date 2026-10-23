import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Skills } from '../sections/Skills'
import { Projects } from '../sections/Projects'
import { Experience } from '../sections/Experience'
import { Contact } from '../sections/Contact'
import { usePageMeta } from '../lib/seo'
import { profile } from '../data/profile'
import { scrollToHash } from '../lib/navigation'

export function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  usePageMeta({
    title: `${profile.name} — ${profile.title}`,
    description:
      'Portfolio of Yashkumar M. Panchal, a B.Sc. Data Science student and full-stack developer in Ahmedabad. React, TypeScript, FastAPI and Python projects with live demos, including NutriZero AI, Faculty Analytics and ScamShield AI.',
    path: '/',
    image: 'og-image.jpg',
  })

  /* Supports "go to section" navigation coming from a project page or the footer. */
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!target) return
    const id = window.setTimeout(() => scrollToHash(`#${target}`), 80)
    navigate(location.pathname, { replace: true, state: null })
    return () => window.clearTimeout(id)
  }, [location.state, location.pathname, navigate])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  )
}
