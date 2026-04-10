import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences } from '../data'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function CompanyLogo({
  src,
  initials,
  bg,
  color,
  logoPadding = '6px 10px',
}: {
  src?: string
  initials: string
  bg: string
  color: string
  logoPadding?: string
}) {
  if (src) {
    return (
      <div
        className="rounded-xl shrink-0 overflow-hidden flex items-center justify-center"
        style={{
          width: 100,
          height: 44,
          background: '#ffffff',
          padding: logoPadding,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        <img
          src={src}
          alt={initials}
          className="w-full h-full object-contain"
          onError={(e) => {
            const parent = (e.target as HTMLImageElement).parentElement
            if (parent) {
              parent.style.background = bg
              parent.style.padding = '0'
              parent.style.width = '44px'
              parent.innerHTML = `<span style="font-family:monospace;font-weight:700;font-size:13px;color:#fff;letter-spacing:0.05em">${initials}</span>`
            }
          }}
        />
      </div>
    )
  }
  return (
    <div
      className="rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border"
      style={{
        width: 44,
        height: 44,
        background: bg,
        borderColor: `${color}40`,
        color: '#fff',
        letterSpacing: '0.05em',
        boxShadow: `0 0 16px ${color}20`,
      }}
    >
      {initials}
    </div>
  )
}

export default function Experience() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-heading', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-heading', start: 'top 85%' },
      })
      gsap.from('.exp-item', {
        x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: '.exp-item', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const expsWithText = experiences.map((e, i) => ({
    ...e,
    role: t.experience.items[i]?.role ?? '',
    period: t.experience.items[i]?.period ?? '',
    description: t.experience.items[i]?.description ?? '',
  }))

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="exp-heading mb-12 md:mb-16">
          <p className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase mb-3">
            {t.experience.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {t.experience.sectionTitle1}{' '}
            <span className="gradient-text">{t.experience.sectionTitle2}</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/20 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {expsWithText.map((exp) => (
              <div key={exp.id} className="exp-item relative md:pl-10 group">
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-6 w-2 h-2 rounded-full border-2 hidden md:block transition-all duration-300 group-hover:scale-150"
                  style={{
                    borderColor: exp.color,
                    backgroundColor: exp.color + '40',
                    left: '1px',
                    transform: 'translateX(-50%)',
                  }}
                />

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 md:p-6 hover:border-indigo-500/20 hover:bg-white/[0.035] transition-all duration-300">
                  {/* Header row: logo + info + period */}
                  <div className="flex items-start gap-4 mb-4">
                    <CompanyLogo
                      src={exp.logoSrc}
                      initials={exp.logoInitials}
                      bg={exp.logoBg}
                      color={exp.color}
                      logoPadding={exp.logoPadding}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div>
                          <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                            {exp.role}
                          </h3>
                          <p
                            className="font-mono text-sm font-medium"
                            style={{ color: exp.color }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-white/30 shrink-0 sm:mt-0.5">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
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
