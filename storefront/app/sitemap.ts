import type { MetadataRoute } from 'next'
import { BRAND } from '@/lib/brand'
import { LOCALES } from '@/lib/i18n'
import { getAllModels, getAllParts } from '@/lib/content'

/** XML sitemap with hreflang alternates for sv/en across all routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.siteUrl
  const staticPaths = [
    '',
    'motorcyklar',
    'delar',
    'jamfor',
    'tjanster/registrering',
    'om',
    'support',
    'leverans-returer',
    'aterforsaljare',
    'kontakt',
    'villkor',
    'angerratt',
    'integritet',
  ]
  const modelPaths = getAllModels().map((m) => `motorcyklar/${m.handle}`)
  const partPaths = getAllParts().map((p) => `delar/${p.handle}`)
  const all = [...staticPaths, ...modelPaths, ...partPaths]

  return all.map((path) => {
    const languages: Record<string, string> = {}
    for (const l of LOCALES) languages[l] = `${base}/${l}${path ? '/' + path : ''}`
    return {
      url: `${base}/${LOCALES[0]}${path ? '/' + path : ''}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path.includes('/') ? 0.7 : 0.8,
      alternates: { languages },
    }
  })
}
