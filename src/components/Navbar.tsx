import { useEffect, useState } from 'react'

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setActive(href)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5'
          : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={handleClick('#hero')}
          className="font-mono text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          MY<span className="text-white/30">_</span>
        </a>

        <ul className="flex items-center gap-8">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleClick(link.href)}
                className={`text-sm font-medium transition-colors relative group ${
                  active === link.href
                    ? 'text-indigo-400'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:mikayay@icloud.com"
          className="hidden md:flex items-center gap-2 px-4 py-1.5 text-xs font-mono border border-indigo-500/40 text-indigo-400 rounded-full hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-200"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Disponible mai 2026
        </a>
      </div>
    </nav>
  )
}
