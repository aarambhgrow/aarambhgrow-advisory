import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this project. Without it, Next.js walks up
    // the tree looking for a lockfile and can settle on a parent directory.
    root: __dirname,
  },
};

export default nextConfig;
