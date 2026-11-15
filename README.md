# shadcn Storybook Registry

This is a registry of [Storybook](https://storybook.js.org/) stories for
[shadcn/ui](https://ui.shadcn.com/) components. It is built from the
[shadcn-registry-template](https://github.com/shadcn-ui/registry-template) and
uses the shadcn CLI to publish separate Base UI and Radix UI registries.

## How to Use

### Prepare your Storybook project

Start with a React + TypeScript project configured with shadcn/ui and Tailwind
CSS 4. Initialize shadcn/ui before installing stories, and choose the matching
Base UI or Radix UI registry. Installing a story does not configure Storybook.

Initialize Storybook with its [Next.js + Vite framework](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite)
or [React + Vite framework](https://storybook.js.org/docs/get-started/frameworks/react-vite).
Keep `storybook`, its framework package, and official addons on the same version.

The setup below was checked with CLI installation, TypeScript, and a production
Storybook build of the Button story in these isolated consumer configurations:

| Framework | Storybook | React | Tailwind CSS | Registry |
| --- | --- | --- | --- | --- |
| Next.js 16.3.3 with `@storybook/nextjs-vite` | 10.5.10 | 19.2.8 | 4.3.3 | Radix UI |
| React + Vite 8.3.8 with `@storybook/react-vite` | 10.5.10 | 19.2.8 | 4.3.3 | Base UI |

These checks cover the Button story, not the entire collection or browser
interaction tests. Other frameworks and Storybook versions are unverified.

### Configure stories and styles

If your Storybook setup does not include `@storybook/addon-docs`, install it at
the same version as Storybook. For the verified version:

```bash
npm install --save-dev @storybook/addon-docs@10.5.10
```

Include the directory where shadcn installs stories in `.storybook/main.ts`.
For a project with `src/`:

```typescript
import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/nextjs-vite",
};

export default config;
```

For React + Vite, use `@storybook/react-vite` in this configuration **and in the
type imports of installed stories**. The registry currently ships
`Meta` and `StoryObj` imports from `@storybook/nextjs-vite`; adapt them after
installation. Keep `storybook/test` and `storybook/actions` imports unchanged.

Import your application's Tailwind entry CSS, including its shadcn theme
variables, in `.storybook/preview.ts`:

```typescript
import "../src/app/globals.css";
```

Use your actual CSS path, such as `../src/index.css` for a Vite app. Keep the
Tailwind PostCSS or Vite plugin active in Storybook so utilities are generated.

Ensure TypeScript and Storybook resolve the aliases in `components.json` to the
same directories. If Vite does not resolve your `@/` alias, merge an explicit
alias into `viteFinal` in `.storybook/main.ts`:

```typescript
import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";

// Inside the Storybook config:
viteFinal: async (config) =>
  mergeConfig(config, {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../src", import.meta.url)),
      },
    },
  }),
```

For projects without `src/`, adjust the story glob, CSS import, and alias target to the project root.

The a11y addon is optional for accessibility checks. To run `play` functions in
CI, configure Storybook's [Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)
and its browser dependencies. Neither addon is required to build the Button
example. The registry's test-codegen addon is also optional.

### Add Registry to Your Project

Configure this registry in your `components.json`:

```jsonc
{
  "registries": {
    "@storybook": "https://registry.lloydrichards.dev/v3/radix/{name}.json"
    // Or for base UI projects
    // "@storybook": "https://registry.lloydrichards.dev/v3/base/{name}.json"
  }
}
```

### Install Components

```bash
# Install using registry namespace
npx shadcn@latest add @storybook/button-story

# Or install directly via URL
npx shadcn@latest add https://registry.lloydrichards.dev/v3/radix/button-story.json
# npx shadcn@latest add https://registry.lloydrichards.dev/v3/base/button-story.json
```

You can visit the [storybook registry](https://registry.lloydrichards.dev/) to
browse available components and copy installation commands.

### Troubleshoot installed stories

- **Stories do not appear:** Check the `stories` glob against the installed file
  location and restart Storybook.
- **Components are unstyled:** Import your application's CSS in `preview.ts` and
  check its Tailwind plugin and shadcn theme variables.
- **`@/components` cannot be resolved:** Match Storybook's alias to TypeScript
  and `components.json`. Check the installed component path.
- **`@storybook/nextjs-vite` cannot be resolved in a Vite app:** Change the
  installed story's type import to `@storybook/react-vite`.
- **Variants appear as `unknown` in docs:** This is tracked in
  [#28](https://github.com/lloydrichards/shadcn-storybook-registry/issues/28).
  Framework and version agnosticism is tracked separately in
  [#4](https://github.com/lloydrichards/shadcn-storybook-registry/issues/4).

## How to Contribute

### Getting Started

1. Clone the repository
2. Install the dependencies

   ```bash
   bun install
   ```

3. Run the development server

   ```bash
   bun dev
   ```

4. Add or update paired stories in `registry/`. UI component stories use
   `*-base.stories.tsx` and `*-radix.stories.tsx` files.
5. Update the matching entries in `registry.base.json` and
   `registry.radix.json`.
6. Build both v3 registries:

   ```bash
   bun run registry:build
   ```

   Generated output is written to `public/v3/base` and `public/v3/radix`.

### Run separate Storybooks

Run `bun run storybook:base` or `bun run storybook:radix` to explore one
library locally on port 6006. `bun run storybook` opens Radix UI, matching the
registry website's default. Stop one server before starting the other.

`bun run build` builds both Storybooks before building the Next.js app.
The deployment serves a chooser at `/storybook/`, Base UI at
`/storybook/base/`, and Radix UI at `/storybook/radix/`. Existing story IDs
remain unchanged. Registry preview links open the matching library.

To build only one library, run `bun run storybook:build:base` or
`bun run storybook:build:radix`. Each command preserves the other library's
output. `bun run storybook:build` clears old output, builds both libraries,
and verifies that every registry preview resolves in the matching story index.
`bun run build-storybook` is an alias for this aggregate build.

Run `bun run test:storybook` to test both libraries, or use
`bun run test:storybook:base` and `bun run test:storybook:radix` separately.
`bun run test` runs unit tests and both Storybook suites.

### Testing

1. Run the local development server

   ```bash
   bun dev
   ```

2. Test a registry item through the local route handler:

   ```bash
   npx shadcn@latest add http://localhost:3000/registry/radix/button-story
   # Or use /registry/base/button-story for the Base UI variant.
   ```

3. Run the project checks:

   ```bash
   bun run lint
   bun run type-check
   bun run test:unit
   bun run test:storybook
   ```

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) to view
the full documentation.
