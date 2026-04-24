'use client'

import { useEffect, useState } from 'react'

export interface WebGLDetection {
  webgl2: boolean
  webgl: boolean
  maxTextureSize: number
}

export function detectWebGL(): WebGLDetection | null {
  if (typeof window === 'undefined') return null

  try {
    const canvas = document.createElement('canvas')
    const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null
    const gl = gl2 || (canvas.getContext('webgl') as WebGLRenderingContext | null)

    if (!gl) {
      return { webgl2: false, webgl: false, maxTextureSize: 0 }
    }

    return {
      webgl2: !!gl2,
      webgl: true,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE) as number,
    }
  } catch {
    return { webgl2: false, webgl: false, maxTextureSize: 0 }
  }
}

export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefers(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return prefers
}

export type ShaderTier = 'full' | 'reduced' | 'static' | 'css'

export function useShaderTier(): ShaderTier {
  const [tier, setTier] = useState<ShaderTier>('css') // SSR-safe default
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced) {
      setTier('static')
      return
    }

    const detected = detectWebGL()
    if (!detected || !detected.webgl) {
      setTier('css')
      return
    }

    // Default to 'full'. Task 16 hooks PerformanceMonitor to downgrade to 'reduced'.
    setTier('full')
  }, [prefersReduced])

  return tier
}
