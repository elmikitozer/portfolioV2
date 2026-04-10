import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="relative py-8 px-5 md:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <span className="font-mono text-xs text-white/20">
          © {new Date().getFullYear()} Mikaya Yevou
        </span>
        <span className="font-mono text-xs text-white/20">{t.footer.built}</span>
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-mono text-xs text-indigo-400/40 hover:text-indigo-400 transition-colors"
        >
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
