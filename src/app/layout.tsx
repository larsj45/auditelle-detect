import type { Metadata } from 'next'
import Script from 'next/script'
import { getResellerConfig } from '@/lib/config'
import { siteOrigin } from '@/lib/site-origin'
import { ConfigProvider } from '@/components/ConfigProvider'
import { CookieConsent } from '@/components/CookieConsent'
import './globals.css'

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
    siteName: config.name,
    url: siteOrigin(config),
  },
  twitter: {
    card: 'summary_large_image',
    title: config.seo.ogTitle,
    description: config.seo.ogDescription,
  },
  // No canonical here: a layout-level canonical is inherited by every page that
  // does not set its own, pointing /tester, /contact etc. at the home page.
  metadataBase: new URL(siteOrigin(config)),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const themeVars = {
    '--navy': config.theme.navy,
    '--navy-light': config.theme.navyLight,
    '--accent': config.theme.accent,
    '--accent-hover': config.theme.accentHover,
    '--accent-light': config.theme.accentLight,
    '--text-primary': config.theme.navy,
    '--hero-gradient': config.theme.heroGradient,
  } as React.CSSProperties

  return (
    <html lang={config.htmlLang}>
      <body style={themeVars}>
        <ConfigProvider config={config}>
          {children}
          {config.googleAdsId && <CookieConsent />}
        </ConfigProvider>
        {/* Plausible Analytics — lightweight, GDPR-friendly, no cookies */}
        <Script
          defer
          data-domain={config.domain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {config.googleAdsId && (
          <>
            {/* Consent Mode v2 — must load BEFORE gtag.js */}
            <Script id="consent-mode-default" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied',
                  'wait_for_update': 500
                });
              `}
            </Script>
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
