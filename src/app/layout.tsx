import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { getResellerConfig } from '@/lib/config'
import { ConfigProvider } from '@/components/ConfigProvider'
import { AttributionTracker } from '@/components/AttributionTracker'
import { CookieConsent } from '@/components/CookieConsent'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const config = await getResellerConfig()
const languageMap: Record<string, string> = {
  fr: 'French',
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
  sv: 'Swedish',
}

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
    url: `https://${config.domain}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: config.seo.ogTitle,
    description: config.seo.ogDescription,
  },
  alternates: {
    canonical: `https://${config.domain}`,
  },
  metadataBase: new URL(`https://${config.domain}`),
}

// Schema.org structured data for the SaaS product
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: config.name,
      url: `https://${config.domain}`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      description: config.seo.description,
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: config.creditPacks?.length
          ? (Math.min(...config.creditPacks.map((pack) => pack.totalPriceMinor)) / 100).toFixed(2)
          : '0',
        highPrice: '499',
        priceCurrency: config.currency,
        offerCount: config.plans.homepage.length,
      },
      featureList: 'AI Detection, Plagiarism Detection, Model Identification, Section Analysis, GDPR Compliant',
    },
    {
      '@type': 'Organization',
      name: config.name,
      url: `https://${config.domain}`,
      logo: `https://${config.domain}${config.logoColor}`,
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        email: config.supportEmail,
        contactType: 'customer service',
        availableLanguage: languageMap[config.htmlLang] || 'English',
      },
    },
    {
      '@type': 'WebSite',
      url: `https://${config.domain}`,
      name: config.name,
      description: config.seo.description,
      inLanguage: config.htmlLang,
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} style={themeVars}>
        <ConfigProvider config={config}>
          <Suspense fallback={null}>
            <AttributionTracker />
          </Suspense>
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
