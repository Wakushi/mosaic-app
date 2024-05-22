/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty")
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.masterworks.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "theredwindows.net",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
