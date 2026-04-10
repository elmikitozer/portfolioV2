import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'
import ProProjectCard from './ProProjectCard'
import PVStudioCard from './PVStudioCard'
import { professionalProjects, personalProjects } from '../data'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj-heading', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-heading', start: 'top 85%' },
      })
      gsap.from('.proj-sublabel', {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.proj-sublabel', start: 'top 85%' },
      })
      gsap.from('.project-card-item', {
        y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.project-card-item', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const proWithDesc = professionalProjects.map((p, i) => ({
    ...p,
    description: t.projects.proItems[i] ?? '',
  }))

  const personalWithDesc = personalProjects.map((p, i) => ({
    ...p,
    description: t.projects.personalItems[i] ?? '',
  }))

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 px-5 md:px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section heading */}
        <div className="proj-heading mb-14 md:mb-18">
          <p className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase mb-3">
            {t.projects.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {t.projects.sectionTitle1}{' '}
            <span className="gradient-text">{t.projects.sectionTitle2}</span>
          </h2>
        </div>

        {/* ── Professional projects ───────────────────────────── */}
        <div className="mb-14 md:mb-18">
          <p className="proj-sublabel font-mono text-xs text-white/30 tracking-widest uppercase mb-6">
            {t.projects.proLabel}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {proWithDesc.map(project =>
              project.inProgress ? (
                <PVStudioCard key={project.id} tags={project.tags} />
              ) : (
                <div key={project.id} className="project-card-item">
                  <ProProjectCard project={project} />
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Personal projects ───────────────────────────────── */}
        <div>
          <p className="proj-sublabel font-mono text-xs text-white/30 tracking-widest uppercase mb-6">
            {t.projects.personalLabel}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {personalWithDesc.map(project => (
              <div key={project.id} className="project-card-item">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
