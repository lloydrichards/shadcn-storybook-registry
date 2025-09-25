# AGENTS.md

## Project Overview

This is a shadcn/ui Storybook registry focused on component documentation and
distribution. Development centers on the `registry/` directory for Storybook
stories that serve both documentation and installable component purposes.

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

- Stories: `registry/*.stories.tsx` for UI components
- Design tokens: `registry/tokens/*.stories.tsx` for Tailwind CSS token
  documentation
- Registry config: `registry.json` maps stories to dependencies

### Story Categories

- `ui/ComponentName` - Core shadcn/ui components
- `design/TokenName` - Design token documentation (color, typography, spacing,
  etc.)

### Story Naming & Documentation

- Follow existing JSDoc comment pattern for each story export
- Example:
  `/** Use the 'outline' button to reduce emphasis on secondary actions */`
- Main component gets descriptive JSDoc explaining overall purpose

## Storybook Conventions

### Story Structure

```typescript
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Component } from "@/components/ui/component";

const meta: Meta<typeof Component> = {
  title: "ui/Component",
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

- **Always use**: `@/components/ui/` imports (required for registry build)
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

Each story needs corresponding entry in `registry.json`:

```json
{
  "name": "component-story",
  "title": "Component Story",
  "type": "registry:ui",
  "meta": { "type": "ui", "story": "ui-component" },
  "registryDependencies": ["component"],
  "dependencies": ["external-lib"],
  "files": [{ "path": "registry/component.stories.tsx", "type": "registry:ui" }]
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

- **Focus on registry development**: Only work on `registry/` directory and
  Storybook files
- **Maintain consistency**: Follow existing patterns in story structure and
  naming
- **Test interactivity**: Add play functions for components with state changes
- **Registry dependencies**: Use correct dependency types (registry vs npm)
- **Always use @/ imports**: Required for registry build system

Always maintain consistency with existing patterns and run quality checks before
completion.
