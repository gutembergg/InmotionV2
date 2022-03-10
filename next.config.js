/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

module.exports = nextTranslate({
  reactStrictMode: true,
  staticPageGenerationTimeout: 10000,
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      "checkout.postfinance.ch",
    ],
    // minimumCacheTTL: 60,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/inmotion-mobility",
        permanent: true,
      },
    ];
  },
});
