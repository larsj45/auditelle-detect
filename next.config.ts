import type { NextConfig } from "next";

// Redirects are build-time config — imported directly rather than via
// the async config loader (which can't run during next.config compilation).
// When adding a new reseller, add a conditional block based on RESELLER_ID.
import auditelleFr from "./config/auditelle-fr";

const resellerId = process.env.RESELLER_ID || 'auditelle-fr'

function getResellerRedirects() {
  switch (resellerId) {
    case 'auditelle-fr':
    default:
      return auditelleFr.redirects || []
  }
}

const nextConfig: NextConfig = {
  async redirects() {
    return getResellerRedirects()
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
};

export default nextConfig;
