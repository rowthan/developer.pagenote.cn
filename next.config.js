/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  assetPrefix: process.env.prefix || undefined,
  env: {
    prefix: process.env.prefix || '',
  },
  async rewrites() {
    return [
      {
        source: '/:path*.html',
        destination: '/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pagenote.cn',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }) // 针对 SVG 的处理规则

    return config
  },
}
