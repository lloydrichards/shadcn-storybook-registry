import { Button } from "@/bases/aria/components/ui/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "lucide-react";

import { Tooltip, TooltipTrigger } from "@/bases/aria/components/ui/tooltip";
import { expect, userEvent, waitFor, within } from "storybook/test";

/**
 * A popup that displays information related to an element when the element
 * receives keyboard focus or the mouse hovers over it.
 */
const meta: Meta<typeof Tooltip> = {
  id: "ui-aria-tooltip",
  title: "ui/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "radio",
      },
    },
    children: {
      control: "text",
    },
  },
  args: {
    placement: "top",
    children: "Add to library",
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <TooltipTrigger>
      <Button>
        <Plus className="h-4 w-4" />
        <span className="sr-only">Add</span>
      </Button>
      <Tooltip {...args} />
    </TooltipTrigger>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the tooltip.
 */
export const Default: Story = {};

/**
 * Use the `bottom` side to display the tooltip below the element.
 */
export const Bottom: Story = {
  args: {
    placement: "bottom",
  },
};

/**
 * Use the `left` side to display the tooltip to the left of the element.
 */
export const Left: Story = {
  args: {
    placement: "left",
  },
};

/**
 * Use the `right` side to display the tooltip to the right of the element.
 */
export const Right: Story = {
  args: {
    placement: "right",
  },
};

/** Reveal the hint with keyboard focus and dismiss it with Escape. */
export const ShouldShowOnFocus: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Add" })).toHaveFocus();
    await expect(await body.findByRole("tooltip")).toHaveTextContent(
      "Add to library",
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("tooltip")).toBeNull());
  },
};
