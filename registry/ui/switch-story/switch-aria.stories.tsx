import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/bases/aria/components/ui/label";
import { Switch } from "@/bases/aria/components/ui/switch";

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  id: "ui-aria-switch",
  title: "ui/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} aria-label="Airplane Mode" />
      <Label htmlFor={args.id}>Airplane Mode</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the switch.
 */
export const Default: Story = {
  args: {
    id: "default-switch",
  },
};

/**
 * Use the `isDisabled` prop to disable the switch.
 */
export const Disabled: Story = {
  args: {
    id: "disabled-switch",
    isDisabled: true,
  },
};

export const ShouldToggle: Story = {
  name: "when clicking the switch, should toggle it on and off",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const switchBtn = await canvas.findByRole("switch");

    await step("toggle the switch on", async () => {
      await userEvent.click(switchBtn);
      await expect(switchBtn).toBeChecked();
    });

    await step("toggle the switch off", async () => {
      await userEvent.click(switchBtn);
      await expect(switchBtn).not.toBeChecked();
    });
  },
};
