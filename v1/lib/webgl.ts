'use client'

import { useMemo, useSyncExternalStore } from 'react'

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
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

export type ShaderTier = 'full' | 'reduced' | 'static' | 'css'

export function useShaderTier(): ShaderTier {
  const prefersReduced = usePrefersReducedMotion()

  return useMemo<ShaderTier>(() => {
    if (typeof window === 'undefined') return 'css'
    if (prefersReduced) return 'static'
    const detected = detectWebGL()
    if (!detected || !detected.webgl) return 'css'
    return 'full'
  }, [prefersReduced])
}
