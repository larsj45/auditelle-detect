import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auditelle — Détection IA la plus précise du marché',
  description: 'Détectez le contenu généré par intelligence artificielle avec une précision de 99,9%. ChatGPT, Claude, Gemini et plus. Vérification par des tiers, taux de faux positifs quasi nul.',
  keywords: ['détection IA', 'détection ChatGPT', 'détection plagiat IA', 'intégrité académique', 'Auditelle'],
  openGraph: {
    title: 'Auditelle — Détection IA la plus précise du marché',
    description: 'Détectez le contenu IA avec une précision de 99,9%. Résultats vérifiés par des tiers.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        {/* Google Ads Tag — AW-17962560127 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17962560127"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17962560127');
          `}
        </Script>
      </body>
    </html>
  )
}
