/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // for now
        domains: ['images.unsplash.com'],
    },
};

export default nextConfig;
