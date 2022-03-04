/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  reactStrictMode: true,
  staticPageGenerationTimeout: 10000,
  images: {
    domains: [
      "dx7l6anesh.preview.infomaniak.website",
      "checkout.postfinance.ch",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
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
