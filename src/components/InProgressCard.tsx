import { useEffect, useRef } from 'react'
import type { ProProject } from '../data'
import { LockIcon } from './icons'

interface Props {
  project: ProProject & { description: string }
}

export default function InProgressCard({ project }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = 200
    const H = 150
    canvas.width = W
    canvas.height = H

    let animId: number
    let lastTime = 0
    const interval = 1000 / 18

    const draw = (ts: number) => {
      animId = requestAnimationFrame(draw)
      if (ts - lastTime < interval) return
      lastTime = ts

      const img = ctx.createImageData(W, H)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255
        d[i] = v; d[i + 1] = v; d[i + 2] = v
        d[i + 3] = Math.floor(Math.random() * 90)
      }
      ctx.putImageData(img, 0, 0)
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div
      className="pvs-card-shake project-card-item relative rounded-2xl overflow-hidden border border-white/10 h-full"
      style={{ background: '#06060a', cursor: 'not-allowed' }}
    >
      {/* Top accent line — signal corrompu */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, #0ff 0%, #f00 40%, #0ff 70%, transparent 100%)', opacity: 0.5 }} />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)',
          zIndex: 2,
        }}
      />

      {/* Canvas grain noise */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          opacity: 0.28,
          mixBlendMode: 'screen',
          zIndex: 3,
        }}
      />

      {/* Scrolling scanline band */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 60,
          background: 'rgba(255,255,255,0.04)',
          animation: 'scanline-move 2.5s linear infinite',
          zIndex: 4,
        }}
      />

      {/* Content */}
      <div className="relative p-6 flex flex-col h-full" style={{ zIndex: 5 }}>
        {/* Logo  */}
        <div className="flex items-center justify-between mb-4">
          {project.logoSrc ? (
            <img
              src={project.logoSrc}
              alt={project.name}
              style={{ height: 34, maxWidth: 110, objectFit: 'contain', objectPosition: 'left center', opacity: 0.85 }}
            />
          ) : (
            <span className="font-mono text-xs text-white/30">{project.domain}</span>
          )}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-wider" style={{ color: 'rgba(0,255,255,0.6)' }}>
              [ BUILDING <span className="blink-cursor">_</span> ]
            </span>
          </div>
        </div>

        {/* Domain */}
        <p className="font-mono text-xs text-white/25 mb-2">{project.domain}</p>

        {/* Title with VHS glitch */}
        <h3
          className="pvs-glitch font-mono text-lg font-semibold mb-2"
          data-text={project.name}
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {project.description}
        </p>

        {/* Tags + lock */}
        <div className="flex items-center justify-between gap-1.5 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 text-xs font-mono rounded border"
                style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.35)', background: 'transparent' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <LockIcon />
        </div>
      </div>
    </div>
  )
}
