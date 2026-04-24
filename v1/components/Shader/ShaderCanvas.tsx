import type { ShaderTier } from '@/lib/webgl'

interface ShaderCanvasProps {
  tier: Exclude<ShaderTier, 'css'>
}

export default function ShaderCanvas({ tier }: ShaderCanvasProps) {
  return <div data-shader-tier={tier} aria-hidden="true" />
}
