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
      { source: '/services/procurement-shipping', destination: '/procurement-shipping', permanent: true },
      { source: '/services/engineering-epc-support', destination: '/engineering-epc-support-services', permanent: true },
      { source: '/services/spare-parts-procurement', destination: '/spare-parts-procurement', permanent: true },
      { source: '/services/logistics-shipping', destination: '/logistics-shipping', permanent: true },
    ];
  },
};

export default nextConfig;
