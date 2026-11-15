import { Button } from "@/bases/aria/components/ui/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Popover, PopoverTrigger } from "@/bases/aria/components/ui/popover";
import { expect, userEvent, waitFor, within } from "storybook/test";

/**
 * Displays rich content in a portal, triggered by a button.
 */
const meta = {
  id: "ui-aria-popover",
  title: "ui/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {},

  render: (args) => (
    <PopoverTrigger>
      <Button>Open</Button>
      <Popover {...args} aria-label="Details">
        Place content for the popover here.
      </Popover>
    </PopoverTrigger>
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
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("click the trigger to open the popover", async () => {
      await userEvent.click(
        await canvasBody.findByRole("button", { name: /open/i }),
      );
      expect(await canvasBody.findByRole("dialog")).toBeInTheDocument();
    });

    await step("press Escape to close the popover", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() => {
        expect(canvasBody.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  },
};
