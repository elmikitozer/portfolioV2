import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { education } from '../data'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-heading', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-heading', start: 'top 85%' },
      })
      gsap.from('.edu-item', {
        x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: '.edu-item', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const [featured, ...rest] = education
  const restWithText = rest.map((item, i) => ({
    ...item,
    program: t.education.items[i]?.program ?? '',
  }))

  return (
    <section id="education" ref={sectionRef} className="relative py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="edu-heading mb-12 md:mb-16">
          <p className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase mb-3">
            {t.education.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {t.education.sectionTitle1}{' '}
            <span className="gradient-text">{t.education.sectionTitle2}</span>
          </h2>
        </div>

        {/* Featured — ESCP */}
        <div className="edu-item edu-featured rounded-2xl bg-white/[0.02] p-5 md:p-6 mb-8 md:mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="edu-logo-box">
              <img src={featured.logoSrc} alt={featured.school} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                  {featured.school}
                </h3>
                <span className="font-mono text-xs shrink-0 sm:mt-0.5" style={{ color: 'var(--gold)' }}>
                  {featured.period}
                </span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mt-1">
                {t.education.featured.program} · {t.education.featured.place}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {t.education.featured.tags.map(tag => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 text-xs font-mono rounded border"
                style={{ borderColor: 'rgba(212,175,55,0.3)', color: 'var(--gold)', background: 'transparent' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Rest */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/20 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {restWithText.map((item) => (
              <div key={item.id} className="edu-item edu-card relative md:pl-10 group">
                <div
                  className="absolute left-0 top-6 w-2 h-2 rounded-full border-2 hidden md:block transition-all duration-300 group-hover:scale-150"
                  style={{
                    borderColor: '#6366f1',
                    backgroundColor: '#6366f140',
                    left: '1px',
                    transform: 'translateX(-50%)',
                  }}
                />

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 md:p-6 hover:border-indigo-500/20 hover:bg-white/[0.035] transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="edu-logo-box">
                      <img src={item.logoSrc} alt={item.school} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                          {item.school}
                        </h3>
                        <span className="font-mono text-xs text-white/30 shrink-0 sm:mt-0.5">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed mt-1">
                        {item.program}
                      </p>
                    </div>
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
