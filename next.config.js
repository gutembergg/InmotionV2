/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  reactStrictMode: true,
  images: {
    domains: ["dx7l6anesh.preview.infomaniak.website"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
