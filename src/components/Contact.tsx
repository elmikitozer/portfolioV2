import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  {
    label: 'GitHub',
    value: 'elmikitozer',
    href: 'https://github.com/elmikitozer',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Mikaya Yevou',
    href: 'https://linkedin.com/in/mikaya-yevou',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'mikayay@icloud.com',
    href: 'mailto:mikayay@icloud.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-content', start: 'top 80%' },
      })

      gsap.from('.contact-link', {
        x: -30, opacity: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.contact-link', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="contact-content">
          <p className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase mb-3">
            // 04 — Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Travaillons{' '}
            <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            Disponible à partir de mai 2026 pour des opportunités en
            Full Stack ou ingénierie IA. Ouvert aux missions freelance
            en parallèle.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-link flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-indigo-500/40 bg-white/[0.02] hover:bg-indigo-500/5 text-white/60 hover:text-white transition-all duration-200 group min-w-[180px] justify-center"
            >
              <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                {link.icon}
              </span>
              <span className="text-sm">{link.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
