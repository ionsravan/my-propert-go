/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
<<<<<<< HEAD
    // baseUrl: "https://my-property-go-backend.onrender.com/api",
=======
>>>>>>> 664e7a829a1b91a2668aeb8fd7045d612a68db37
    baseUrl: "https://api.wonderplots.com/api",
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;
