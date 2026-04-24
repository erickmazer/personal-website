'use client'

import { useRef, useCallback, useEffect } from 'react'
import { Canvas, type ThreeEvent } from '@react-three/fiber'
import {
  Physics,
  RigidBody,
  CuboidCollider,
  type RapierRigidBody,
} from '@react-three/rapier'

const P = {
  ink: '#1a1712',
  paper: '#e1d6c3',
  patina: '#8a6f4e',
  moss: '#5a6b4f',
  ash: '#7a7268',
}

interface ShapeSpec {
  id: number
  type: 'box' | 'sphere' | 'tetra'
  pos: [number, number, number]
  color: string
  scale: number
}

const INITIAL_SHAPES: ShapeSpec[] = [
  { id: 0, type: 'sphere', pos: [-2.5, 4.0, 0.5], color: P.patina, scale: 0.6 },
  { id: 1, type: 'box', pos: [-1.2, 5.5, -0.8], color: P.paper, scale: 0.55 },
  { id: 2, type: 'tetra', pos: [0.0, 6.5, 0.6], color: P.moss, scale: 0.75 },
  { id: 3, type: 'sphere', pos: [1.4, 4.8, -0.3], color: P.patina, scale: 0.5 },
  { id: 4, type: 'box', pos: [2.6, 5.2, 0.8], color: P.ash, scale: 0.45 },
  { id: 5, type: 'tetra', pos: [-2.0, 7.2, -0.5], color: P.patina, scale: 0.65 },
  { id: 6, type: 'sphere', pos: [0.5, 5.8, -1.2], color: P.moss, scale: 0.55 },
  { id: 7, type: 'box', pos: [-0.8, 7.8, 0.2], color: P.patina, scale: 0.5 },
  { id: 8, type: 'tetra', pos: [1.8, 8.2, -0.6], color: P.paper, scale: 0.6 },
  { id: 9, type: 'sphere', pos: [-1.6, 9.0, 0.8], color: P.ash, scale: 0.5 },
  { id: 10, type: 'box', pos: [2.2, 9.5, 0.1], color: P.moss, scale: 0.55 },
  { id: 11, type: 'tetra', pos: [0.2, 10.2, 0.5], color: P.patina, scale: 0.5 },
]

interface DraggableShapeProps {
  spec: ShapeSpec
  registerRef: (id: number, body: RapierRigidBody) => void
}

function DraggableShape({ spec, registerRef }: DraggableShapeProps) {
  const bodyRef = useRef<RapierRigidBody>(null)

  useEffect(() => {
    if (bodyRef.current) registerRef(spec.id, bodyRef.current)
  }, [spec.id, registerRef])

  const draggingRef = useRef(false)
  const dragStart = useRef<{ x: number; y: number; t: number } | null>(null)
  const lastMove = useRef<{ x: number; y: number; t: number } | null>(null)

  const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    draggingRef.current = true
    dragStart.current = { x: e.clientX, y: e.clientY, t: performance.now() }
    lastMove.current = { x: e.clientX, y: e.clientY, t: performance.now() }

    if (bodyRef.current) {
      bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
    }

    const onMove = (ev: globalThis.PointerEvent) => {
      if (!draggingRef.current) return
      lastMove.current = { x: ev.clientX, y: ev.clientY, t: performance.now() }
    }

    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)

      if (!draggingRef.current || !bodyRef.current || !dragStart.current || !lastMove.current) {
        draggingRef.current = false
        return
      }

      const dt = Math.max(0.01, (lastMove.current.t - dragStart.current.t) / 1000)
      const dx = (lastMove.current.x - dragStart.current.x) / dt
      const dy = (lastMove.current.y - dragStart.current.y) / dt

      const SCALE = 0.003
      bodyRef.current.applyImpulse({ x: dx * SCALE, y: -dy * SCALE, z: 0 }, true)

      draggingRef.current = false
      dragStart.current = null
      lastMove.current = null
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [])

  const geom =
    spec.type === 'box' ? (
      <boxGeometry args={[1, 1, 1]} />
    ) : spec.type === 'sphere' ? (
      <sphereGeometry args={[0.5, 24, 24]} />
    ) : (
      <tetrahedronGeometry args={[0.7]} />
    )

  return (
    <RigidBody
      ref={bodyRef}
      position={spec.pos}
      restitution={0.3}
      friction={0.7}
      colliders={spec.type === 'sphere' ? 'ball' : 'cuboid'}
    >
      <mesh
        scale={spec.scale}
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
      >
        {geom}
        <meshStandardMaterial color={spec.color} roughness={0.7} metalness={0.1} />
      </mesh>
    </RigidBody>
  )
}

function Scene({
  registerRef,
}: {
  registerRef: (id: number, body: RapierRigidBody) => void
}) {
  return (
    <>
      <ambientLight intensity={0.25} color={P.paper} />
      <directionalLight
        position={[5, 12, 8]}
        intensity={1.2}
        color={P.paper}
        castShadow
      />
      <fog attach="fog" args={[P.ink, 15, 40]} />

      <RigidBody type="fixed" colliders={false} position={[0, -2, 0]}>
        <CuboidCollider args={[50, 0.5, 50]} />
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[100, 1, 100]} />
          <meshStandardMaterial color={P.ink} roughness={1} />
        </mesh>
      </RigidBody>

      {INITIAL_SHAPES.map((spec) => (
        <DraggableShape key={spec.id} spec={spec} registerRef={registerRef} />
      ))}
    </>
  )
}

export default function Sandbox() {
  const bodies = useRef<Map<number, RapierRigidBody>>(new Map())

  const registerRef = useCallback((id: number, body: RapierRigidBody) => {
    bodies.current.set(id, body)
  }, [])

  const handleReset = useCallback(() => {
    for (const spec of INITIAL_SHAPES) {
      const b = bodies.current.get(spec.id)
      if (!b) continue
      b.setTranslation({ x: spec.pos[0], y: spec.pos[1], z: spec.pos[2] }, true)
      b.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true)
      b.setLinvel({ x: 0, y: 0, z: 0 }, true)
      b.setAngvel({ x: 0, y: 0, z: 0 }, true)
    }
  }, [])

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 5, 14], fov: 40 }}
        style={{ background: P.ink }}
      >
        <Physics gravity={[0, -9.81, 0]}>
          <Scene registerRef={registerRef} />
        </Physics>
      </Canvas>

      <button
        onClick={handleReset}
        data-reset
        className="absolute top-8 right-8 z-10 text-sm text-[color:var(--color-paper)] border border-[color:var(--color-ash)] bg-transparent rounded-sm px-4 py-2 hover:bg-[color:var(--color-ash)]/20 transition-colors tracking-wide"
      >
        reset
      </button>
    </>
  )
}
