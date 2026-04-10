import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-heading', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-heading', start: 'top 85%' },
      })

      gsap.from('.exp-item', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.exp-item', start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="exp-heading mb-16">
          <p className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase mb-3">
            // 02 — Expérience
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Là où j&apos;ai{' '}
            <span className="gradient-text">travaillé</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/20 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="exp-item relative md:pl-10 group"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-2 w-2 h-2 rounded-full border-2 hidden md:block transition-all duration-300 group-hover:scale-150"
                  style={{
                    borderColor: exp.color,
                    backgroundColor: exp.color + '40',
                    transform: 'translateX(-50%)',
                    left: '1px',
                  }}
                />

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-indigo-500/20 hover:bg-white/[0.035] transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {exp.role}
                      </h3>
                      <p
                        className="font-mono text-sm font-medium"
                        style={{ color: exp.color }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-white/30 shrink-0 mt-1">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
