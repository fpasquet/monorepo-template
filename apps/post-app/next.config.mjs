/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        "\u0000?\u0000(.*)": "default"
      }
    }
  }
};

export default config;
