/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;