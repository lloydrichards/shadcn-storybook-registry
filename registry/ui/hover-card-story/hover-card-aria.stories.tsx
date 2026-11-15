import { expect, userEvent, waitFor, within } from "storybook/test";
import { Focusable } from "react-aria-components";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  HoverCard,
  HoverCardTrigger,
} from "@/bases/aria/components/ui/hover-card";

/**
 * For sighted users to preview content available behind a link.
 */
const meta = {
  id: "ui-aria-hovercard",
  title: "ui/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  argTypes: {},
  args: { children: null },
  render: (args) => (
    <HoverCardTrigger>
      <Focusable>
        <button type="button" className="rounded-md border px-3 py-2">
          Hover
        </button>
      </Focusable>
      <HoverCard {...args}>
        The React Framework - created and maintained by @vercel.
      </HoverCard>
    </HoverCardTrigger>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the hover card.
 */
export const Default: Story = {};

/**
 * Use the `delay` and `closeDelay` props to control the delay before the
 * hover card opens and closes.
 */
export const Instant: Story = {
  render: (args) => (
    <HoverCardTrigger delay={0} closeDelay={0}>
      <Focusable>
        <button type="button" className="rounded-md border px-3 py-2">
          Hover
        </button>
      </Focusable>
      <HoverCard {...args}>
        The React Framework - created and maintained by @vercel.
      </HoverCard>
    </HoverCardTrigger>
  ),
};

export const ShouldShowOnHover: Story = {
  ...Instant,
  name: "when hovering over trigger, should show hover card content",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("Hover over the trigger element", async () => {
      await userEvent.click(canvasElement);
      await userEvent.hover(await canvasBody.findByText(/hover/i));
      await waitFor(() =>
        expect(
          canvasBody.queryByText(/created and maintained by @vercel/i),
        ).toBeVisible(),
      );
    });
    await step("Dismiss the preview by clicking outside", async () => {
      await userEvent.click(canvasElement);
      await waitFor(() =>
        expect(
          canvasBody.queryByText(/created and maintained by @vercel/i),
        ).toBeNull(),
      );
    });
  },
};
