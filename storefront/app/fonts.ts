import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'

/**
 * Type system — "modern premium" (the bee identity).
 * Display + UI  → Plus Jakarta Sans (clean, geometric-humanist, high-quality feel)
 * Mono          → JetBrains Mono (technical labels, eyebrows, spec readouts, badges)
 * Self-hosted at build by next/font (no runtime request → no layout shift).
 */

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const fontVariables = `${jakarta.variable} ${jetbrains.variable}`
