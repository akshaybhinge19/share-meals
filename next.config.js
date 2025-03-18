/** @type {import('next').NextConfig} */
const nextConfig = {
//   output: "export", // Enable static exports
//   images: {
//     unoptimized: true, // Disable Image Optimization API
//   },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
  reactStrictMode: true,
};

// added to trigger deployment gh-pages
module.exports = nextConfig;
