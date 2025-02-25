/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
}

// added to trigger deployment gh-pages
module.exports = nextConfig
