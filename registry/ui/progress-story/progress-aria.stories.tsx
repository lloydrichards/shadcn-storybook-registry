import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Progress } from "@/bases/aria/components/ui/progress";

/**
 * Displays an indicator showing the completion progress of a task, typically
 * displayed as a progress bar.
 */
const meta = {
  id: "ui-aria-progress",
  title: "ui/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    "aria-label": "Progress",
    value: 30,
    maxValue: 100,
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the progress.
 */
export const Default: Story = {};

/**
 * When the progress is indeterminate.
 */
export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
};

/**
 * When the progress is completed.
 */
export const Completed: Story = {
  args: {
    value: 100,
  },
};
