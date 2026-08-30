import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      {
        source: "/storybook/",
        destination: "/storybook/index.html",
      },
    ];
  },
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
};

export default nextConfig;
