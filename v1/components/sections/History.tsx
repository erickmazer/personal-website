import { content } from '@/content/content'
import { KanjiMarker } from './KanjiMarker'

export function History() {
  return (
    <section className="py-32 px-8 sm:px-12 md:px-16">
      <div className="max-w-2xl ml-0 sm:ml-8">
        <KanjiMarker marker={content.japanese.sectionMarkers.history} className="mb-8" />
        <div className="prose prose-lg max-w-none text-[color:var(--color-paper)]/90 leading-relaxed whitespace-pre-line">
          {content.history.text}
        </div>
      </div>
    </section>
  )
}
