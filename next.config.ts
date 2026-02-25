import type { NextConfig } from "next";

import redirectConfig from "./config/redirects";

const resellerId = process.env.RESELLER_ID || 'auditelle-fr'

const nextConfig: NextConfig = {
  async redirects() {
    return redirectConfig[resellerId] || redirectConfig['auditelle-fr'] || []
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
