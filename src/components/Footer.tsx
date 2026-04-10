export default function Footer() {
  return (
    <footer className="relative py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-mono text-xs text-white/20">
          © {new Date().getFullYear()} Mikaya Yevou
        </span>
        <span className="font-mono text-xs text-white/20">
          Built with React · Three.js · GSAP
        </span>
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="font-mono text-xs text-indigo-400/40 hover:text-indigo-400 transition-colors"
        >
          ↑ Back to top
        </a>
      </div>
    </footer>
  )
}
