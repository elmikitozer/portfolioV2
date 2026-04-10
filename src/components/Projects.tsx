import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'
import { projects } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      })

      // Cards stagger
      gsap.from('.project-card-item', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-16">
          <p className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase mb-3">
            // 01 — Projets
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ce que j&apos;ai{' '}
            <span className="gradient-text">construit</span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map(project => (
            <div key={project.id} className="project-card-item">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
