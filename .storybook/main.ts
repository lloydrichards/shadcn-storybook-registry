import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../registry/**/*.mdx",
    "../registry/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
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
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
