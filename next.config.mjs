/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/duxoxictr/**',
      },
    ],
  },
  typedRoutes: true,
  experimental: {
  },
  compiler: {
    styledComponents: true
  }
};

export default nextConfig;
