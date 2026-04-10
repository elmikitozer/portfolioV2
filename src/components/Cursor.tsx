import { useEffect, useRef } from 'react'

// Only render on devices with a precise pointer (mouse, not touch)
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0)

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (isTouchDevice()) return

    const TRAIL_COUNT = 8
    const trails: HTMLDivElement[] = []

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement('div')
      const size = 6 - i * 0.5
      el.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(99,102,241,${0.6 - i * 0.07});
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%,-50%);
        mix-blend-mode: screen;
      `
      document.body.appendChild(el)
      trails.push(el)
    }

    const trailPositions = trails.map(() => ({ x: -100, y: -100 }))

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const { x, y } = posRef.current

      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`
        dotRef.current.style.top = `${y}px`
      }

      ringPosRef.current.x += (x - ringPosRef.current.x) * 0.15
      ringPosRef.current.y += (y - ringPosRef.current.y) * 0.15
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPosRef.current.x}px`
        ringRef.current.style.top = `${ringPosRef.current.y}px`
      }

      trailPositions[0].x += (x - trailPositions[0].x) * 0.3
      trailPositions[0].y += (y - trailPositions[0].y) * 0.3
      for (let i = 1; i < TRAIL_COUNT; i++) {
        trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.35
        trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.35
        trails[i].style.left = `${trailPositions[i].x}px`
        trails[i].style.top = `${trailPositions[i].y}px`
      }
      trails[0].style.left = `${trailPositions[0].x}px`
      trails[0].style.top = `${trailPositions[0].y}px`
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      trails.forEach(t => t.remove())
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && isTouchDevice()) return null

  return (
    <>
      <div id="cursor" ref={dotRef} />
      <div id="cursor-trail" ref={ringRef} />
    </>
  )
}
