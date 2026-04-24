import Link from 'next/link'
import { Ja } from '@/components/Ja'
import SandboxLoader from '@/components/Playground/SandboxLoader'

export const metadata = {
  title: 'Playground',
  description: 'A small physics toy — click and drag to throw things.',
}

export default function PlaygroundPage() {
  return (
    <div className="fixed inset-0">
      <SandboxLoader />

      <div className="absolute top-8 left-8 z-10 flex items-center gap-6">
        <Link
          href="/"
          className="text-sm text-[color:var(--color-patina)] hover:text-[color:var(--color-paper)] transition-colors underline decoration-[color:var(--color-ash)] decoration-1 underline-offset-4"
        >
          &larr; back
        </Link>
        <Ja
          className="text-2xl opacity-50 [font-family:var(--font-serif-jp)]"
          title="asobu — play"
          aria-label="asobu — play"
        >
          遊
        </Ja>
      </div>

      <div className="absolute bottom-8 right-8 z-10 max-w-xs text-right">
        <p className="text-xs text-[color:var(--color-ash)] italic leading-relaxed">
          A small toy. Click and drag to throw things around. Nothing to
          accomplish — just play.
        </p>
      </div>
    </div>
  )
}
