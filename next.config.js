/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
    images: {
      domains: [
        'contextent.s3.amazonaws.com',
        'localhost',
        'enttrainer.s3.amazonaws.com'
      ],
    },
  };
  
  module.exports = nextConfig;
