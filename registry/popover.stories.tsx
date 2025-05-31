// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { expect, userEvent, within } from "storybook/test";

/**
 * Displays rich content in a portal, triggered by a button.
 */
const meta = {
  title: "ui/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {},

  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the popover.
 */
export const Default: Story = {};

export const ShouldOpenClose: Story = {
  name: "when clicking the trigger, should open and close the popover",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    // Show the popover
    await userEvent.click(
      await canvasBody.findByRole("button", { name: /open/i }),
    );
    const popover = await canvasBody.findByRole("dialog");
    expect(popover).toBeInTheDocument();

    // Click the trigger to hide the popover
    await userEvent.click(
      await canvasBody.findByRole("button", { name: /open/i }),
    );
    expect(popover).toHaveAttribute("data-state", "closed");
  },
};
