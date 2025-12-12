import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},

	generateStaticParams: async () => {
		return []
	},
}

export default nextConfig
