import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'
import type { ProProject } from '../data'

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ width: 14, height: 14 }}
  >
    <path
      fillRule="evenodd"
      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
      clipRule="evenodd"
    />
  </svg>
)

interface Props {
  project: ProProject & { description: string }
}

export default function ProProjectCard({ project }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    VanillaTilt.init(cardRef.current, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.12,
      perspective: 800,
    })
    return () => {
      if (cardRef.current && 'vanillaTilt' in cardRef.current) {
        (cardRef.current as HTMLDivElement & { vanillaTilt: { destroy: () => void } }).vanillaTilt.destroy()
      }
    }
  }, [])

  const handleClick = () => {
    if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="tilt-card group relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Top accent line */}
      <div style={{ height: 2, background: project.color, opacity: 0.8 }} />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.color}12 0%, transparent 65%)`,
          boxShadow: `inset 0 1px 0 0 ${project.color}20`,
        }}
      />

      <div className="tilt-card-inner p-6 relative z-10">
        {/* Domain + link icon */}
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-xs text-white/20">{project.domain}</span>
          <span
            className="opacity-0 group-hover:opacity-60 transition-opacity duration-200"
            style={{ color: project.color }}
          >
            <ExternalLinkIcon />
          </span>
        </div>

        <h3 className="font-mono text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-200">
          {project.name}
        </h3>

        <p className="text-sm text-white/50 leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
