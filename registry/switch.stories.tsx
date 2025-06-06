import { expect, userEvent } from "storybook/test";
// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Switch } from "@/components/ui/switch";

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "ui/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label htmlFor={args.id} className="peer-disabled:text-foreground/50">
        Airplane Mode
      </label>
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
 * Use the `disabled` prop to disable the switch.
 */
export const Disabled: Story = {
  args: {
    id: "disabled-switch",
    disabled: true,
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
