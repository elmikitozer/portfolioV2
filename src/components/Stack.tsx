import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stack } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stack-heading', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.stack-heading', start: 'top 85%' },
      })

      gsap.from('.stack-item', {
        y: 30, opacity: 0, duration: 0.6, ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '.stack-item', start: 'top 85%' },
      })

      // Animate bars
      gsap.from('.bar-fill', {
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.05,
        transformOrigin: 'left center',
        scrollTrigger: { trigger: '.bar-fill', start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="stack" ref={sectionRef} className="relative py-32 px-6">
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="stack-heading mb-16">
          <p className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase mb-3">
            // 03 — Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Mes{' '}
            <span className="gradient-text">technologies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {stack.map((item) => (
            <div key={item.name} className="stack-item group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm text-white/70 group-hover:text-white transition-colors">
                  {item.name}
                </span>
                <span className="font-mono text-xs text-indigo-400/60">
                  {item.level}%
                </span>
              </div>
              <div className="h-px bg-white/5 rounded-full overflow-hidden">
                <div
                  className="bar-fill h-full rounded-full"
                  style={{
                    width: `${item.level}%`,
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                    boxShadow: '0 0 8px rgba(99,102,241,0.4)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
