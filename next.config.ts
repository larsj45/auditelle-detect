import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/essai-gratuit',
        destination: '/signup',
        permanent: false,
      },
      {
        source: '/demo',
        destination: '/demo-video',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
