# shadcn Storybook Registry

This is a registry of [storybook](https://storybook.js.org/) stories for all the
[shadcn](https://ui.shadcn.com/) components. Build using the
[shadcn-registry-template](https://github.com/shadcn-ui/registry-template) and
using the shadcn CLI to build the registry.

## How to Use

The shadcn CLI allows you to import any component or file as long as you point
it to a registry JSON. This registry is a JSON file that contains all the
information needed to build the registry.

```bash
npx shadcn@latest add <Registry URL>
```

You can visit the [storybook registry](https://registry.lloydrichards.dev/) and
copy the URL to the registry JSON file or copy the command directly.

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

4. Add/update the stories in the `src/registry` directory
5. Add/update the `registry.json` file
6. Build the registry

   ```bash
   bun registry:build
   ```

### Testing

1. Run the local development server

   ```bash
   bun dev
   ```

2. test the registry by running the shadcn CLI

   ```bash
   npx shadcn@latest add http://localhost:3000/r/your-component.json
   ```

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) to view
the full documentation.
