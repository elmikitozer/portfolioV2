import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

interface Project {
  id: number
  name: string
  description: string
  tags: string[]
  emoji: string
  color: string
}

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    VanillaTilt.init(cardRef.current, {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      perspective: 800,
    })
    return () => {
      if (cardRef.current && 'vanillaTilt' in cardRef.current) {
        (cardRef.current as HTMLDivElement & { vanillaTilt: { destroy: () => void } }).vanillaTilt.destroy()
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="tilt-card group relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 60%)`,
          boxShadow: `inset 0 1px 0 0 ${project.color}20`,
        }}
      />

      {/* Top border glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)` }}
      />

      <div className="tilt-card-inner p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{project.emoji}</span>
          <div
            className="w-2 h-2 rounded-full opacity-60"
            style={{ background: project.color }}
          />
        </div>

        <h3 className="font-mono text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-200">
          {project.name}
        </h3>

        <p className="text-sm text-white/50 leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
