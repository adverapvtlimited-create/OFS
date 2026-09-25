const rawStrapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_API_URL ||
  process.env.STRAPI_URL ||
  'http://localhost:1337';

let strapiHost = 'localhost';
let strapiPort = '1337';
let strapiProtocol = 'http';

try {
  const parsed = new URL(rawStrapiUrl);
  strapiHost = parsed.hostname;
  strapiPort = parsed.port;
  strapiProtocol = parsed.protocol.replace(':', '');
} catch {}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'gsap', 'lenis'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      ...(strapiHost !== 'localhost' && strapiHost !== '127.0.0.1'
        ? [
            {
              protocol: strapiProtocol,
              hostname: strapiHost,
              ...(strapiPort ? { port: strapiPort } : {}),
              pathname: '/uploads/**',
            },
          ]
        : []),
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/services', destination: '/#what-we-offer', permanent: true },
      { source: '/service', destination: '/#what-we-offer', permanent: true },
      { source: '/services/engineering-epc', destination: '/engineering-epc-support-services', permanent: true },
      { source: '/services/engineering-epc-support', destination: '/engineering-epc-support-services', permanent: true },
      { source: '/services/warehouse-2', destination: '/warehouse', permanent: true },
      { source: '/services/:slug', destination: '/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
