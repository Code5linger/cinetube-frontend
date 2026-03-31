import type { NextConfig } from 'next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not defined! Please add it to .env.local for dev or Vercel env for production.',
  );
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/better-auth/:path*',
        destination: `${apiUrl}/api/better-auth/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
