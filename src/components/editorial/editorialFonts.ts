import { IBM_Plex_Mono, Newsreader, Public_Sans } from 'next/font/google'

const editorialSerif = Newsreader({
  subsets: ['latin'],
  variable: '--font-editorial-serif',
  display: 'swap',
})

const editorialSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-editorial-sans',
  display: 'swap',
})

const editorialMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-editorial-mono',
  display: 'swap',
})

export const editorialFontVariables = `${editorialSerif.variable} ${editorialSans.variable} ${editorialMono.variable}`
