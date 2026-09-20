/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'ofsgroupindia.com'],
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
    ],
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
