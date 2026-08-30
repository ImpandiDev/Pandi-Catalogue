/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'impandi.pythonanywhere.com',
                pathname: '/media/**',
            },
            {
                protocol: 'https',
                hostname: 'd1plsfvf92tren.cloudfront.net',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
