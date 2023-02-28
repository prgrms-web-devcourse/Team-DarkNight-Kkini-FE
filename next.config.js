/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['maps.googleapis.com'],
    path: '/_next/image',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
    ],
  },
};

module.exports = nextConfig;

// 카카오 categorySearch -> 구글 textSearch -> 구글 getDetails
