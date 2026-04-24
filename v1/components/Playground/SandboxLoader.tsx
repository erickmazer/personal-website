'use client'

import dynamic from 'next/dynamic'

const Sandbox = dynamic(() => import('@/components/Playground/Sandbox'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center text-[color:var(--color-patina)]">
      Loading&hellip;
    </div>
  ),
})

export default function SandboxLoader() {
  return <Sandbox />
}
