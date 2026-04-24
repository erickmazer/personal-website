import { content } from '@/content/content'
import { KanjiMarker } from './KanjiMarker'

export function Fatherhood() {
  const { quote, attribution } = content.fatherhood
  return (
    <section className="py-48 md:py-64 px-8 sm:px-12 md:px-16">
      <div className="max-w-2xl ml-0 sm:ml-16">
        <KanjiMarker marker={content.japanese.sectionMarkers.fatherhood} className="mb-16" />
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic leading-[1.4] text-[color:var(--color-paper)]/95">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {attribution && (
          <p className="mt-12 text-sm text-[color:var(--color-patina)] tracking-widest uppercase">
            — {attribution}
          </p>
        )}
      </div>
    </section>
  )
}
