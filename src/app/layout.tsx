import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { getResellerConfig } from '@/lib/config'
import { ConfigProvider } from '@/components/ConfigProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const config = await getResellerConfig()

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    title: config.seo.ogTitle,
    description: config.seo.ogDescription,
    type: 'website',
    locale: config.locale,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={config.htmlLang}>
      <body className={inter.className}>
        <ConfigProvider config={config}>
          {children}
        </ConfigProvider>
        {config.googleAdsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAdsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-tag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.googleAdsId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
