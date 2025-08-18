/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: './dist',
  images: {
    domains: ['raw.githubusercontent.com', 'pokeapi.co'],
  },
};

export default nextConfig;
