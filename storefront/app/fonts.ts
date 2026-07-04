import { Archivo, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'

/**
 * Fonts are self-hosted at build time by next/font (no runtime request → no
 * layout shift, CWV-safe). `display: swap` + fallback metrics avoid FOIT.
 * Exposed as CSS variables consumed by styles/tokens.css.
 *   Display  → Archivo (industrial grotesk, uppercase headlines)
 *   UI/body  → Hanken Grotesk (legible workhorse)
 *   Mono     → JetBrains Mono (spec readouts, badges, eyebrows)
 */

export const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

export const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const fontVariables = `${archivo.variable} ${hanken.variable} ${jetbrains.variable}`
