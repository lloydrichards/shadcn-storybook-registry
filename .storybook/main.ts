import type { StorybookConfig } from "@storybook/nextjs-vite";

const registry = process.env.STORYBOOK_REGISTRY ?? "radix";
if (registry !== "base" && registry !== "radix") {
  throw new Error("STORYBOOK_REGISTRY must be base or radix");
}

const config: StorybookConfig = {
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
