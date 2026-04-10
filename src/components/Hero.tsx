import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ParticleField from './ParticleField'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.from(lineRef.current, {
      scaleX: 0, duration: 0.8, ease: 'power3.out', transformOrigin: 'left center',
    })
      .from(nameRef.current, { y: 60, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.4')
      .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from(metaRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleField />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 50%)',
          animation: 'gradientShift 12s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent mb-10 md:mb-12 opacity-60"
        />

        <h1
          ref={nameRef}
          className="glitch text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-5 md:mb-6"
          data-text="Mikaya Yevou"
        >
          <span className="gradient-text">Mikaya</span>
          <br />
          <span className="text-white">Yevou</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl font-light text-white/70 mb-4 tracking-wide"
        >
          {t.hero.subtitle}
        </p>

        <div
          ref={metaRef}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10"
        >
          <span className="font-mono text-xs text-indigo-400/80 border border-indigo-500/20 rounded-full px-3 py-1">
            {t.hero.school}
          </span>
          <span className="text-white/20 hidden sm:inline">·</span>
          <span className="font-mono text-xs text-indigo-400/80 border border-indigo-500/20 rounded-full px-3 py-1">
            {t.hero.degree}
          </span>
          <span className="text-white/20 hidden sm:inline">·</span>
          <span className="font-mono text-xs text-emerald-400/80 border border-emerald-500/20 rounded-full px-3 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            {t.hero.available}
          </span>
        </div>

        <div
          ref={ctaRef}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-5 py-2.5 md:px-6 md:py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="https://github.com/elmikitozer"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 md:px-6 md:py-3 border border-white/10 hover:border-white/30 text-white/70 hover:text-white text-sm font-medium rounded-full transition-all duration-200 hover:-translate-y-0.5"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs font-mono text-white/50 tracking-widest uppercase">{t.hero.scroll}</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
