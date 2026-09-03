import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography is hotlinked from Unsplash's CDN until the restaurant's own
    // shots are dropped into /public/photos. See src/lib/photos.ts.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
