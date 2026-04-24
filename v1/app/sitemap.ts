import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://erickmazer.com'
  const lastModified = new Date()
  return [
    { url: `${base}/`, lastModified, priority: 1.0 },
    { url: `${base}/playground`, lastModified, priority: 0.7 },
  ]
}
