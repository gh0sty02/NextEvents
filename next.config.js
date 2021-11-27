/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_PASSWORD: "Ihatelove@99",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: false,
};
