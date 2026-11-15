import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "@/bases/aria/components/ui/checkbox";
import { Label } from "@/bases/aria/components/ui/label";
import { expect, userEvent, within } from "storybook/test";

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta: Meta<typeof Checkbox> = {
  id: "ui-aria-checkbox",
  title: "ui/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    id: "terms",
    isDisabled: false,
  },
  render: (args) => (
    <div className="flex space-x-2">
      <Checkbox {...args} aria-labelledby={`${args.id}-label`} />
      <Label id={`${args.id}-label`} htmlFor={args.id}>
        Accept terms and conditions
      </Label>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the checkbox.
 */
export const Default: Story = {};

/**
 * Use the `isDisabled` prop to disable the checkbox.
 */
export const Disabled: Story = {
  args: {
    id: "disabled-terms",
    isDisabled: true,
  },
};

export const ShouldToggleCheck: Story = {
  name: "when the checkbox is clicked, should toggle between checked and not checked",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.getByRole("checkbox", {
      name: "Accept terms and conditions",
    });
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox, { delay: 100 });
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox, { delay: 100 });
    expect(checkbox).toBeChecked();
  },
};
