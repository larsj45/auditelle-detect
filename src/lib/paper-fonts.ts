import { Newsreader, Public_Sans } from 'next/font/google'

// Fonts of the 'paper' skin (auditelle-fr). Same families as the Lettrine
// editorial pages on lettrine.eu (see src/components/editorial/editorialFonts.ts),
// so Lettrine keeps one identity on both domains. preload: false keeps other
// brands' pages from preloading fonts they never use.
const paperSerif = Newsreader({
  subsets: ['latin'],
  variable: '--font-paper-serif',
  display: 'swap',
  preload: false,
})

const paperSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-paper-sans',
  display: 'swap',
  preload: false,
})

export const paperFontVariables = `${paperSerif.variable} ${paperSans.variable}`
