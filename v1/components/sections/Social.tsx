import { content } from '@/content/content'
import { KanjiMarker } from './KanjiMarker'

export function Social() {
  return (
    <section className="py-32 pb-48 px-8 sm:px-12 md:px-16">
      <div className="max-w-2xl ml-0 sm:ml-8">
        <KanjiMarker marker={content.japanese.sectionMarkers.social} className="mb-8" />
        <ul className="space-y-2 text-lg">
          {content.social.map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--color-paper)]/90 hover:text-[color:var(--color-patina)] underline decoration-[color:var(--color-ash)] decoration-1 underline-offset-4 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
