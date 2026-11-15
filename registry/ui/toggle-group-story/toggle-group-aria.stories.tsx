import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bold, Italic, Underline } from "lucide-react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/bases/aria/components/ui/toggle-group";

/**
 * A set of two-state buttons that can be toggled on or off.
 */
const meta = {
  id: "ui-aria-togglegroup",
  title: "ui/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  argTypes: {
    selectionMode: {
      options: ["multiple", "single"],
      control: { type: "radio" },
    },
  },
  args: {
    variant: "default",
    size: "default",
    selectionMode: "multiple",
    isDisabled: false,
  },
  render: (args) => (
    <ToggleGroup aria-label="Formatting" {...args}>
      <ToggleGroupItem id="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem id="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem id="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the toggle group.
 */
export const Default: Story = {};

/**
 * Use the `outline` variant to emphasizing the individuality of each button
 * while keeping them visually cohesive.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

/**
 * Use the `single` type to create exclusive selection within the button
 * group, allowing only one button to be active at a time.
 */
export const Single: Story = {
  args: {
    selectionMode: "single",
  },
};

/**
 * Use the `sm` size for a compact version of the button group, featuring
 * smaller buttons for spaces with limited real estate.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Use the `lg` size for a more prominent version of the button group, featuring
 * larger buttons for emphasis.
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Add the `isDisabled` prop to a button to prevent interactions.
 */
export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

/** Enable two formatting options in a multiple-selection group. */
export const KeyboardInteraction: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const bold = canvas.getByRole("button", { name: "Toggle bold" });
    const italic = canvas.getByRole("button", { name: "Toggle italic" });
    bold.focus();
    await userEvent.keyboard(" {ArrowRight} ");
    await expect(bold).toHaveAttribute("aria-pressed", "true");
    await expect(italic).toHaveAttribute("aria-pressed", "true");
  },
};
