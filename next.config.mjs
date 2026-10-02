import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.92"],
  // Blog posts live as .mdx files in content/blog and are imported by app/blogs.
  pageExtensions: ["js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
