import type { StorybookConfig } from "@storybook/nextjs-vite";

const registry = process.env.STORYBOOK_REGISTRY ?? "radix";
if (registry !== "base" && registry !== "radix" && registry !== "aria") {
  throw new Error("STORYBOOK_REGISTRY must be base, radix, or aria");
}

const config: StorybookConfig = {
  core: {
    allowedHosts: process.env.LAB_PREVIEW_HOST
      ? [process.env.LAB_PREVIEW_HOST]
      : [],
  },
  stories: [`../registry/**/*-${registry}.stories.@(js|jsx|mjs|ts|tsx)`],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "storybook-addon-test-codegen",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  docs: {},
  // Next.js serves public assets. Copying public into an output below it recurses.
  viteFinal: async (config) => ({
    ...config,
    publicDir: false,
    server: {
      ...config.server,
      hmr: process.env.LAB_PREVIEW_URL
        ? {
            ...(typeof config.server?.hmr === "object"
              ? config.server.hmr
              : {}),
            clientPort:
              Number(new URL(process.env.LAB_PREVIEW_URL).port) || 443,
          }
        : config.server?.hmr,
    },
    // Library-specific dependencies must not invalidate the other test run's cache.
    cacheDir: `node_modules/.cache/storybook/${registry}`,
    optimizeDeps: {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include ?? []), "radix-ui"],
    },
  }),
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
