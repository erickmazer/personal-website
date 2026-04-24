import { content } from '@/content/content'
import { KanjiMarker } from './KanjiMarker'

export function Media() {
  const { favorites, now } = content.media
  return (
    <section className="py-32 px-8 sm:px-12 md:px-16">
      <div className="max-w-5xl ml-0 sm:ml-8">
        <KanjiMarker marker={content.japanese.sectionMarkers.media} className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div>
            <h3 className="text-sm tracking-widest uppercase text-[color:var(--color-patina)] mb-4">Books</h3>
            <ul className="space-y-2 text-[color:var(--color-paper)]/90">
              {favorites.books.map((b, i) => (
                <li key={i}>
                  <span className="italic">{b.title}</span>
                  <span className="block text-sm text-[color:var(--color-ash)]">{b.author}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm tracking-widest uppercase text-[color:var(--color-patina)] mb-4">Films</h3>
            <ul className="space-y-2 text-[color:var(--color-paper)]/90">
              {favorites.movies.map((m, i) => (
                <li key={i}>
                  <span className="italic">{m.title}</span>
                  <span className="block text-sm text-[color:var(--color-ash)]">{m.director}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm tracking-widest uppercase text-[color:var(--color-patina)] mb-4">Series</h3>
            <ul className="space-y-2 text-[color:var(--color-paper)]/90">
              {favorites.series.map((s, i) => (
                <li key={i}>
                  <span className="italic">{s.title}</span>
                  <span className="block text-sm text-[color:var(--color-ash)]">{s.creator}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-md">
          <p className="text-xs tracking-widest uppercase text-[color:var(--color-patina)] mb-3 opacity-60">Right now</p>
          <dl className="text-sm space-y-1 text-[color:var(--color-paper)]/80">
            <div className="flex gap-3"><dt className="text-[color:var(--color-ash)] w-24">Reading</dt><dd>{now.reading}</dd></div>
            <div className="flex gap-3"><dt className="text-[color:var(--color-ash)] w-24">Watching</dt><dd>{now.watching}</dd></div>
            <div className="flex gap-3"><dt className="text-[color:var(--color-ash)] w-24">Listening</dt><dd>{now.listening}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
