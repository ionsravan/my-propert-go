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
    baseUrl: "https://my-property-go-backend.onrender.com/api",
  },
};

module.exports = nextConfig;
