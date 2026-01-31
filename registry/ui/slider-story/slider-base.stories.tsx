// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Slider } from "@/bases/base/components/ui/slider";

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "ui/base/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    defaultValue: [33],
    max: 100,
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
 * Use the `disabled` prop to disable the slider.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
