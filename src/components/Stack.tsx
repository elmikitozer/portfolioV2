import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stack } from '../data'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Stack() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stack-heading', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.stack-heading', start: 'top 85%' },
      })
      gsap.from('.stack-icon', {
        y: 24, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: '.stack-icon', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="stack" ref={sectionRef} className="relative py-24 md:py-32 px-5 md:px-6">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="stack-heading mb-12 md:mb-16">
          <p className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase mb-3">
            {t.stack.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {t.stack.sectionTitle1}{' '}
            <span className="gradient-text">{t.stack.sectionTitle2}</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-5">
          {stack.map((item) => (
            <div
              key={item.name}
              className="stack-icon group flex flex-col items-center gap-2.5 cursor-default"
            >
              <div
                className="w-16 h-16 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center group-hover:border-white/10 group-hover:bg-white/[0.05] transition-all duration-300"
              >
                {item.devicon ? (
                  <i className={`${item.devicon} colored`} style={{ fontSize: 34 }} />
                ) : item.logoSrc ? (
                  <img
                    src={item.logoSrc}
                    alt={item.name}
                    style={{ width: 32, height: 32, objectFit: 'contain' }}
                  />
                ) : (
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-1 rounded-md tracking-wider"
                    style={{
                      background: `${item.color}18`,
                      color: item.color,
                      border: `1px solid ${item.color}35`,
                    }}
                  >
                    {item.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] text-white/35 group-hover:text-white/60 transition-colors text-center leading-tight max-w-[72px]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
