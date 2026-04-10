import { useEffect, useRef } from 'react'

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: 15, height: 15, opacity: 0.2, color: '#fff' }}
  >
    <path
      fillRule="evenodd"
      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
      clipRule="evenodd"
    />
  </svg>
)

export default function PVStudioCard({ tags }: { tags: string[] }) {
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
    const interval = 1000 / 12  // 12 fps

    const draw = (ts: number) => {
      animId = requestAnimationFrame(draw)
      if (ts - lastTime < interval) return
      lastTime = ts

      const img = ctx.createImageData(W, H)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255
        d[i] = v; d[i + 1] = v; d[i + 2] = v
        d[i + 3] = Math.floor(Math.random() * 55)
      }
      ctx.putImageData(img, 0, 0)
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div
      className="project-card-item relative rounded-2xl overflow-hidden border border-white/[0.04]"
      style={{ background: '#000', cursor: 'not-allowed', minHeight: 200 }}
    >
      {/* Static scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.08) 1px, rgba(0,0,0,0.08) 2px)',
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
          opacity: 0.13,
          mixBlendMode: 'screen',
          zIndex: 3,
        }}
      />

      {/* Scrolling scanline band */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 60,
          background: 'rgba(255,255,255,0.06)',
          animation: 'scanline-move 3s linear infinite',
          zIndex: 4,
        }}
      />

      {/* Card content */}
      <div className="relative p-6" style={{ zIndex: 5 }}>
        {/* Top row: domain + lock icon */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="font-mono text-xs"
            style={{ color: '#1f1f1f' }}
          >
            pvstudio.com
          </span>
          <LockIcon />
        </div>

        {/* Title with VHS glitch */}
        <h3
          className="pvs-glitch font-mono text-lg font-semibold mb-2"
          data-text="PV Studio"
          style={{ color: '#1a1a1a' }}
        >
          PV Studio
        </h3>

        {/* Description placeholder */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: '#111' }}
        >
          Site d'une directrice artistique et coordinatrice de défilés. Direction visuelle haut de gamme.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-xs font-mono rounded border"
              style={{ borderColor: '#1a1a1a', color: '#1a1a1a', background: 'transparent' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Building badge */}
        <div className="flex items-center gap-1.5">
          <span
            className="font-mono text-xs tracking-wider"
            style={{ color: '#333' }}
          >
            [ BUILDING <span className="blink-cursor">_</span> ]
          </span>
        </div>
      </div>
    </div>
  )
}
