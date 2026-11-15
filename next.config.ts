import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: process.env.LAB_PREVIEW_HOST
    ? [process.env.LAB_PREVIEW_HOST]
    : [],
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      {
        source: "/storybook/:registry(base|radix|aria)/",
        destination: "/storybook/:registry/index.html",
      },
    ];
  },
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
};

export default nextConfig;
