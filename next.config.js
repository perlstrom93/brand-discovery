/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asset.brandfetch.io',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
