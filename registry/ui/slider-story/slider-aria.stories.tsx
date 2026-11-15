import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Slider } from "@/bases/aria/components/ui/slider";

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  id: "ui-aria-slider",
  title: "ui/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    "aria-label": "Volume",
    defaultValue: 33,
    maxValue: 100,
    step: 1,
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the slider.
 */
export const Default: Story = {};

/**
 * Use the `orientation` prop to render a vertical slider.
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-40",
  },
};

/**
 * Use the `isDisabled` prop to disable the slider.
 */
export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

/** Adjust the volume one step with the arrow keys. */
export const KeyboardInteraction: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const slider = canvas.getByRole("slider");
    slider.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(slider).toHaveValue("34");
  },
};
