'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import type { ShaderTier } from '@/lib/webgl'
import { GridNoiseMaterial } from './material'

extend({ GridNoiseMaterial })

interface ShaderCanvasProps {
  tier: Exclude<ShaderTier, 'css'>
}

const TIER_UNIFORMS = {
  full: { uGridSize: 48, uNoiseScale: 1.6, uIntensity: 0.35, uDistort: 0.018 },
  reduced: { uGridSize: 32, uNoiseScale: 1.2, uIntensity: 0.25, uDistort: 0.01 },
  static: { uGridSize: 32, uNoiseScale: 1.2, uIntensity: 0.25, uDistort: 0 },
} as const

function Scene({ tier }: { tier: Exclude<ShaderTier, 'css'> }) {
  const materialRef = useRef<InstanceType<typeof GridNoiseMaterial> | null>(null)
  const mouseSmooth = useRef(new THREE.Vector2(0.5, 0.5))
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5))
  const { size, invalidate } = useThree()

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseTarget.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const uniforms = useMemo(() => TIER_UNIFORMS[tier], [tier])

  useFrame((state, dt) => {
    const m = materialRef.current
    if (!m) return

    if (tier !== 'static') {
      mouseSmooth.current.lerp(mouseTarget.current, Math.min(0.1, dt * 6))
      m.uMouse.copy(mouseSmooth.current)
      m.uTime = state.clock.getElapsedTime()
    }

    m.uResolution.set(size.width, size.height)
  })

  useEffect(() => {
    if (tier === 'static' && materialRef.current) {
      materialRef.current.uTime = 0
      materialRef.current.uDistort = 0
      materialRef.current.uResolution.set(size.width, size.height)
      invalidate()
    }
  }, [tier, size.width, size.height, invalidate])

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <gridNoiseMaterial
        ref={materialRef}
        uGridSize={uniforms.uGridSize}
        uNoiseScale={uniforms.uNoiseScale}
        uIntensity={uniforms.uIntensity}
        uDistort={uniforms.uDistort}
        uColorInk={new THREE.Color('#1a1712')}
        uColorPatina={new THREE.Color('#8a6f4e')}
      />
    </mesh>
  )
}

export default function ShaderCanvas({ tier }: ShaderCanvasProps) {
  const [currentTier, setCurrentTier] = useState(tier)
  const [prevTier, setPrevTier] = useState(tier)
  if (tier !== prevTier) {
    setPrevTier(tier)
    setCurrentTier(tier)
  }

  const frameloop = currentTier === 'static' ? 'never' : 'always'

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: 'low-power' }}
        frameloop={frameloop}
        camera={{ position: [0, 0, 1] }}
      >
        <AdaptiveDpr pixelated />
        <PerformanceMonitor
          onDecline={() => setCurrentTier((t) => (t === 'full' ? 'reduced' : t))}
          onIncline={() => setCurrentTier((t) => (t === 'reduced' ? 'full' : t))}
        />
        <Scene tier={currentTier} />
      </Canvas>
    </div>
  )
}
