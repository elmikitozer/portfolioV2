import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import type { Lang } from '../i18n'

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : ('fr' as Lang))

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#050508]/90 backdrop-blur-xl border-b border-white/5'
            : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={scrollTo('#hero')}
            className="font-mono text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors z-10"
          >
            MY<span className="text-white/30">_</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={scrollTo(link.href)}
                  className="text-sm font-medium text-white/50 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-indigo-500/40 text-white/40 hover:text-white transition-all duration-200"
              aria-label="Toggle language"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            {/* Availability — desktop only */}
            <a
              href="mailto:mikayay@icloud.com"
              className="hidden md:flex items-center gap-2 px-4 py-1.5 text-xs font-mono border border-indigo-500/30 text-indigo-400 rounded-full hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t.nav.available}
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-px bg-white/70 transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[5px]' : ''
                }`}
              />
              <span
                className={`block w-5 h-px bg-white/70 transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-px bg-white/70 transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={scrollTo(link.href)}
              className="text-2xl font-semibold text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:mikayay@icloud.com"
            className="mt-4 flex items-center gap-2 px-5 py-2.5 text-sm font-mono border border-indigo-500/30 text-indigo-400 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.nav.available}
          </a>
        </div>
      </div>
    </>
  )
}
