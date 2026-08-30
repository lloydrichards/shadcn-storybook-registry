# shadcn Storybook Registry

This is a registry of [Storybook](https://storybook.js.org/) stories for
[shadcn/ui](https://ui.shadcn.com/) components. It is built from the
[shadcn-registry-template](https://github.com/shadcn-ui/registry-template) and
uses the shadcn CLI to publish separate Base UI and Radix UI registries.

## How to Use

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
