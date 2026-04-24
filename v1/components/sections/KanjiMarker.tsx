import { Ja } from '@/components/Ja'

export interface KanjiMarkerData {
  char: string
  reading: string
  meaning: string
}

interface Props {
  marker: KanjiMarkerData
  className?: string
}

export function KanjiMarker({ marker, className = '' }: Props) {
  const tooltip = `${marker.reading} — ${marker.meaning}`
  return (
    <Ja
      className={`inline-block text-2xl opacity-50 [font-family:var(--font-serif-jp)] cursor-help ${className}`}
      title={tooltip}
      aria-label={tooltip}
    >
      {marker.char}
    </Ja>
  )
}
