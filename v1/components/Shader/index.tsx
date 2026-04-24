'use client'

import dynamic from 'next/dynamic'
import { useShaderTier } from '@/lib/webgl'

const ShaderCanvas = dynamic(() => import('./ShaderCanvas'), {
  ssr: false,
  loading: () => null,
})

const CssFallback = dynamic(() => import('./CssFallback'), { ssr: false })

export default function ShaderBackground() {
  const tier = useShaderTier()

  if (tier === 'css') {
    return <CssFallback />
  }

  return <ShaderCanvas tier={tier} />
}
