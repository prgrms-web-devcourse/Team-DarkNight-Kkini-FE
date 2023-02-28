/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'team-kkini-mukvengers-fe.vercel.app',
        pathname: '/_next/image/**',
      },
    ],
  },
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
