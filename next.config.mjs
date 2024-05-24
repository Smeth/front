/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['pub-06cec14001984a6eb96293e99a86db73.r2.dev'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'pub-06cec14001984a6eb96293e99a86db73.r2.dev',
              pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '/**',
            },
            {
              protocol: 'https',
              hostname: '1cddc53db1beaf805f88b3b5692cadad.r2.cloudflarestorage.com',
              pathname: '/**',
          }
        ],
    }
};

export default nextConfig;
