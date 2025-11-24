/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Ensure Turbopack resolves the framework from the workspace root
    root: __dirname,
  },
}

module.exports = nextConfig


