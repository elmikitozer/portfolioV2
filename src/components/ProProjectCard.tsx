import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'
import type { ProProject } from '../data'
import { ExternalLinkIcon } from './icons'

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
      className="tilt-card group relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden cursor-pointer h-full"
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

      <div className="tilt-card-inner p-6 relative z-10 flex flex-col h-full">
        {/* Logo + link icon */}
        <div className="flex items-start justify-between mb-4">
          {project.logoSrc ? (
            <img
              src={project.logoSrc}
              alt={project.name}
              style={{ height: 36, maxWidth: 120, objectFit: 'contain', objectPosition: 'left center', opacity: 0.9 }}
            />
          ) : (
            <span className="font-mono text-xs text-white/20">{project.domain}</span>
          )}
          <span
            className="opacity-0 group-hover:opacity-60 transition-opacity duration-200"
            style={{ color: project.color }}
          >
            <ExternalLinkIcon />
          </span>
        </div>

        <p className="font-mono text-xs text-white/20 mb-2">{project.domain}</p>

        <h3 className="font-mono text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-200">
          {project.name}
        </h3>

        <p className="text-sm text-white/50 leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
