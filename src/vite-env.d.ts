/// <reference types="vite/client" />

declare module 'vanilla-tilt' {
  interface TiltOptions {
    max?: number
    speed?: number
    glare?: boolean
    'max-glare'?: number
    perspective?: number
    scale?: number
    reverse?: boolean
    reset?: boolean
    easing?: string
    transition?: boolean
    axis?: 'x' | 'y' | null
    startX?: number
    startY?: number
    gyroscope?: boolean
  }

  interface VanillaTiltElement extends HTMLElement {
    vanillaTilt: {
      destroy: () => void
    }
  }

  const VanillaTilt: {
    init(elements: HTMLElement | HTMLElement[], options?: TiltOptions): void
  }

  export default VanillaTilt
}
