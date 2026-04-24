import { content } from '@/content/content'
import { KanjiMarker } from './KanjiMarker'

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-32 pb-24 px-8 sm:px-12 md:px-16">
      <div className="max-w-3xl ml-0 sm:ml-8">
        <KanjiMarker marker={content.japanese.sectionMarkers.hero} className="mb-12" />
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-6">
          {content.hero.name}
        </h1>
        <p className="text-xl sm:text-2xl text-[color:var(--color-patina)] max-w-2xl leading-relaxed">
          {content.hero.tagline}
        </p>
      </div>
    </section>
  )
}
