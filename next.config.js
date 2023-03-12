/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/ws/:path*',
  //       destination: 'https://dev.kkini.site/ws/:path*',
  //     },
  //     {
  //       source: '/topic/public/:path*',
  //       destination: 'https://dev.kkini.site/topic/public/:path*',
  //     },
  //     {
  //       source: '/app/chat.sendMessage/:path*',
  //       destination: 'https://dev.kkini.site/app/chat.sendMessage/:path*',
  //     },
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://dev.kkini.site/:path*',
  //     },
  //     {
  //       source: '/',
  //       destination: 'http://localhost:3000',
  //     },
  //     {
  //       source: '/oauth2',
  //       destination: 'https://dev.kkini.site',
  //     },
  //     {
  //       source: '/login',
  //       destination: 'https://dev.kkini.site',
  //     },
  //   ];
  // },
  // https://dev.kkini.site/ws?info
  // async rewrite() {
  //   return [
  //     {
  //       source: '/ws/:path*',
  //       destination: 'https://dev.kkini.site/ws/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
