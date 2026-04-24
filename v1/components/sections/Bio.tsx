import { content } from '@/content/content'
import { loadSection } from '@/lib/mdx'
import { KanjiMarker } from './KanjiMarker'

export async function Bio() {
  const section = await loadSection('bio')
  return (
    <section className="py-32 px-8 sm:px-12 md:px-16">
      <div className="max-w-2xl ml-0 sm:ml-8">
        <KanjiMarker marker={content.japanese.sectionMarkers.bio} className="mb-8" />
        <div className="prose prose-lg max-w-none text-[color:var(--color-paper)]/90 leading-relaxed">
          {section.kind === 'mdx'
            ? <section.Component />
            : <p>{section.value.text}</p>}
        </div>
      </div>
    </section>
  )
}
