import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '')].filter(Boolean),
  },
}

export default nextConfig
