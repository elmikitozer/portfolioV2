import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 120
const CONNECTION_DISTANCE = 120
const MOUSE_REPEL_RADIUS = 150
const MOUSE_REPEL_FORCE = 0.3

interface Particle {
  vx: number
  vy: number
  ox: number
  oy: number
}

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 2000)
    camera.position.z = 500

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const particleMeta: Particle[] = []
    const w = mount.clientWidth
    const h = mount.clientHeight

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * w
      const y = (Math.random() - 0.5) * h
      const z = (Math.random() - 0.5) * 200
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      particleMeta.push({
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        ox: x,
        oy: y,
      })
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 2.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    })

    const points = new THREE.Points(particleGeo, particleMat)
    scene.add(points)

    // Line connections
    const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.15,
        vertexColors: false,
      }),
    )
    scene.add(lineMat)

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.nx = (e.clientX / window.innerWidth - 0.5) * w
      mouseRef.current.ny = -(e.clientY / window.innerHeight - 0.5) * h
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // Animation loop
    let animId: number
    let lineCount = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)

      // Smooth mouse
      mouseRef.current.x += (mouseRef.current.nx - mouseRef.current.x) * 0.06
      mouseRef.current.y += (mouseRef.current.ny - mouseRef.current.y) * 0.06

      const pos = particleGeo.attributes['position'] as THREE.BufferAttribute
      lineCount = 0

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const meta = particleMeta[i]

        // Move
        meta.vx += (Math.random() - 0.5) * 0.01
        meta.vy += (Math.random() - 0.5) * 0.01
        meta.vx *= 0.98
        meta.vy *= 0.98

        let px = pos.getX(i) + meta.vx
        let py = pos.getY(i) + meta.vy

        // Mouse repulsion
        const dx = px - mouseRef.current.x
        const dy = py - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
          const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS
          meta.vx += (dx / dist) * force * MOUSE_REPEL_FORCE
          meta.vy += (dy / dist) * force * MOUSE_REPEL_FORCE
        }

        // Wrap edges
        const hw = w / 2
        const hh = h / 2
        if (px > hw) px = -hw
        if (px < -hw) px = hw
        if (py > hh) py = -hh
        if (py < -hh) py = hh

        pos.setXY(i, px, py)
      }

      pos.needsUpdate = true

      // Draw connections
      const linePosAttr = lineGeo.attributes['position'] as THREE.BufferAttribute
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const ax = pos.getX(i)
          const ay = pos.getY(i)
          const bx = pos.getX(j)
          const by = pos.getY(j)
          const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)
          if (d < CONNECTION_DISTANCE) {
            const base = lineCount * 6
            linePosAttr.array[base] = ax
            linePosAttr.array[base + 1] = ay
            linePosAttr.array[base + 2] = pos.getZ(i)
            linePosAttr.array[base + 3] = bx
            linePosAttr.array[base + 4] = by
            linePosAttr.array[base + 5] = pos.getZ(j)
            lineCount++
          }
        }
      }

      lineGeo.setDrawRange(0, lineCount * 2)
      linePosAttr.needsUpdate = true

      // Pulse opacity
      const t = Date.now() * 0.001;
      (particleMat as THREE.PointsMaterial).opacity = 0.6 + Math.sin(t * 0.8) * 0.2

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
