import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // The portfolio home page is a self-contained static document.
      beforeFiles: [{ source: "/", destination: "/portfolio/index.html" }],
    };
  },
};

export default nextConfig;
