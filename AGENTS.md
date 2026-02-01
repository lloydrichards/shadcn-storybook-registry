# AGENTS.md

## Project Overview

This is a shadcn/ui Storybook registry focused on component documentation and
distribution. The registry now ships separate Base UI and Radix UI story sets,
with v3 outputs for each registry.

## Quick Commands

- **Dev server**: `bun run storybook` (port 6006)
- **Build**: `bun run build` (builds Next.js app + Storybook)
- **Test all**: `bun run test`
- **Test Storybook**: `bun run test:storybook` (browser tests)
- **Test unit**: `bun run test:unit`
- **Lint**: `bun run lint`
- **Type check**: `bun run type-check`
- **Format**: `bun run format:write`

## Registry Development

### File Structure

- Stories: `registry/**/` with paired `*-base.stories.tsx` and
  `*-radix.stories.tsx` files per story folder
- Design tokens: `registry/tokens/**/` with base/radix story variants
- Base/Radix implementations: `bases/{base,radix}/components/ui/*`
- Registry configs: `registry.base.json` and `registry.radix.json`
- Registry outputs: `public/v3/base` and `public/v3/radix`

### Story Categories

- `ui/base/ComponentName` - Base UI story variants
- `ui/radix/ComponentName` - Radix UI story variants
- `design/base/TokenName` - Base UI design token stories
- `design/radix/TokenName` - Radix UI design token stories

### Story Naming & Documentation

- Pair story files by registry suffix: `*-base.stories.tsx` and
  `*-radix.stories.tsx`
- Match story titles to the registry prefix (`ui/base/...` or `ui/radix/...`)
- Follow existing JSDoc comment pattern for each story export
- Example:
  `/** Use the 'outline' button to reduce emphasis on secondary actions */`
- Main component gets descriptive JSDoc explaining overall purpose

## Storybook Conventions

### Story Structure

```typescript
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Component } from "@/bases/base/components/ui/component";

const meta: Meta<typeof Component> = {
  title: "ui/base/Component",
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    // Default args here unless story needs variants
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### Required Stories

- `Default`: Basic component usage
- Interactive components with state changes need `play` function test stories
- Common variants: Loading, Disabled, Small, Large, WithIcon as applicable

### Testing Stories

- Use `tags: ["!dev", "!autodocs"]` for test-only stories
- Include both success and error case tests for forms/validation
- Use `play` functions with `userEvent` and `expect` for interactions

## Code Style

### Imports

- **Story imports**: use `@/bases/base/components/ui/` or
  `@/bases/radix/components/ui/`
- **Registry output**: postbuild rewrites `@/bases/*/components` to
  `@/components` for published JSON
- **Framework**: `@storybook/nextjs-vite` for type imports
- **Icons**: `lucide-react` for consistent iconography

### TypeScript

- Use `satisfies Meta<typeof Component>` for type safety
- Prefer explicit types over `any`
- Define schemas with `zod` for forms

## Registry System

### Dependencies

- `registryDependencies`: shadcn/ui components (e.g., `["button", "form"]`)
- `dependencies`: External npm packages (e.g., `["lucide-react", "zod"]`)

### Registry Entry

Each story needs corresponding entry in `registry.base.json` or
`registry.radix.json`:

```json
{
  "name": "component-story",
  "title": "Component Story",
  "type": "registry:ui",
  "meta": { "type": "ui", "story": "ui-component" },
  "registryDependencies": ["component"],
  "dependencies": ["external-lib"],
  "files": [
    {
      "path": "registry/ui/component-story/component-base.stories.tsx",
      "type": "registry:component"
    }
  ]
}
```

## Testing Strategy

- **Storybook tests**: Browser-based with Playwright
- **Accessibility**: a11y addon configured with 'todo' level
- **Visual testing**: Stories serve as visual regression tests
- Run `bun run lint && bun run type-check` before completing tasks

## Common Patterns

### Form Components

- Use `react-hook-form` with `zod` validation
- Include both success/error test scenarios
- Use `action()` from Storybook for form submissions

### Charts

- Use `recharts` with `ChartContainer` wrapper
- Define `ChartConfig` for consistent theming
- Support responsive design

### Design Tokens

- Use `getComputedStyle()` to read CSS custom properties
- Display both CSS variable names and computed values
- Organize by functional vs component token types

## Important Notes

- **Focus on registry development**: Most work lives in `registry/`, but Base
  and Radix component implementations live under `bases/`
- **Registry builds**: run `bun run registry:build` to generate both v3
  registries and apply postbuild import rewrites
- **Maintain consistency**: Follow existing patterns in story structure and
  naming
- **Test interactivity**: Add play functions for components with state changes
- **Registry dependencies**: Use correct dependency types (registry vs npm)
- **Always use @/ imports**: Required for registry build system

Always maintain consistency with existing patterns and run quality checks before
completion.
