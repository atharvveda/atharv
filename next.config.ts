import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false, // Enforce no trailing slashes for canonical URLs
  compress: true, // Enable gzip compression for performance

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
