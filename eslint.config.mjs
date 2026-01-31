import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/purity": "warn",
    },
  },
];

export default eslintConfig;
