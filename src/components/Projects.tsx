import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'
import { projects } from '../data'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })
      gsap.from('.project-card-item', {
        y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const projectsWithDesc = projects.map((p, i) => ({
    ...p,
    description: t.projects.items[i] ?? '',
  }))

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 px-5 md:px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-12 md:mb-16">
          <p className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase mb-3">
            {t.projects.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {t.projects.sectionTitle1}{' '}
            <span className="gradient-text">{t.projects.sectionTitle2}</span>
          </h2>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {projectsWithDesc.map(project => (
            <div key={project.id} className="project-card-item">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
