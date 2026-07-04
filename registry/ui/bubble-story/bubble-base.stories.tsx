// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckIcon, InfoIcon, ThumbsUpIcon } from "lucide-react";
import type * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/bases/base/components/ui/bubble";
import { Button } from "@/bases/base/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/bases/base/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/bases/base/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/bases/base/components/ui/tooltip";

/**
 * Displays conversational content in a framed or unframed message bubble.
 */
const meta: Meta<typeof Bubble> = {
  title: "ui/base/Bubble",
  component: Bubble,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "muted",
        "tinted",
        "outline",
        "ghost",
        "destructive",
      ],
    },
    align: {
      control: "select",
      options: ["start", "end"],
    },
  },
  args: {
    variant: "default",
    align: "start",
  },
  decorators: (Story) => (
    <div className="w-full min-w-sm max-w-md">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Bubble>;

export default meta;

type Story = StoryObj<typeof meta>;

function BubbleExample({
  children,
  ...props
}: React.ComponentProps<typeof Bubble>) {
  return (
    <Bubble {...props}>
      <BubbleContent>{children}</BubbleContent>
    </Bubble>
  );
}

/**
 * The default bubble is a strong primary surface for current-user messages.
 */
export const Default: Story = {
  render: (args) => (
    <BubbleExample {...args}>
      I checked the registry output and removed the stale route.
    </BubbleExample>
  ),
};

/**
 * Use the secondary variant for standard conversation content.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <BubbleExample {...args}>
      The component JSON now lives under the UI registry.
    </BubbleExample>
  ),
};

/**
 * Use the muted variant for quiet supporting content.
 */
export const Muted: Story = {
  args: {
    variant: "muted",
  },
  render: (args) => (
    <BubbleExample {...args}>
      This note has lower emphasis than the main reply.
    </BubbleExample>
  ),
};

/**
 * Use the tinted variant for a softer primary treatment.
 */
export const Tinted: Story = {
  args: {
    variant: "tinted",
  },
  render: (args) => (
    <BubbleExample {...args}>
      I can preserve the chat tone without using the full primary color.
    </BubbleExample>
  ),
};

/**
 * Use the outline variant for secondary rich content.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => (
    <BubbleExample {...args}>
      Here is the command output you asked me to review.
    </BubbleExample>
  ),
};

/**
 * Use the destructive variant for failed actions or error messages.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <BubbleExample {...args}>
      Failed to send. Check your connection and try again.
    </BubbleExample>
  ),
};

/**
 * Use the ghost variant for assistant text or markdown-like content.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
  render: (args) => (
    <BubbleExample {...args}>
      Ghost bubbles work well when assistant messages should read like regular
      text instead of framed chat surfaces.
    </BubbleExample>
  ),
};

/**
 * Align a bubble to the end for current-user messages.
 */
export const AlignedEnd: Story = {
  args: {
    align: "end",
  },
  render: (args) => (
    <BubbleExample {...args}>Sure. Hit me with your best demo.</BubbleExample>
  ),
};

/**
 * Group consecutive bubbles from the same sender.
 */
export const Group: Story = {
  render: () => (
    <BubbleGroup>
      <Bubble variant="secondary">
        <BubbleContent>Can you tell me what changed?</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>The registry entries now match the files.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

/**
 * Render bubble content as a button for quick replies.
 */
export const ButtonBubble: Story = {
  args: {
    variant: "muted",
  },
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent render={<button type="button" />}>
        I forgot my password
      </BubbleContent>
    </Bubble>
  ),
};

/**
 * Use reactions for emoji counts or compact quick actions.
 */
export const Reactions: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <Bubble {...args} className="mb-4">
      <BubbleContent>
        Tests passed on the first try. Looking good.
      </BubbleContent>
      <BubbleReactions role="img" aria-label="Reactions: thumbs up and party">
        <span>👍</span>
        <span>🎉</span>
      </BubbleReactions>
    </Bubble>
  ),
};

/**
 * Compose long content with Collapsible for show more interactions.
 */
export const CollapsibleBubble: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <Collapsible className="flex flex-col gap-2">
      <Bubble {...args}>
        <BubbleContent>
          The accessibility review found two focus states that were visually too
          subtle in dark mode.
        </BubbleContent>
      </Bubble>
      <CollapsibleContent>
        <Bubble {...args}>
          <BubbleContent>
            I checked the dialog, menu, and drawer paths because each one
            renders focusable controls inside an overlay.
          </BubbleContent>
        </Bubble>
      </CollapsibleContent>
      <CollapsibleTrigger className="w-fit text-sm underline underline-offset-4 hover:text-primary">
        Show more
      </CollapsibleTrigger>
    </Collapsible>
  ),
};

/**
 * Pair a bubble with Tooltip to reveal metadata on hover or focus.
 */
export const TooltipBubble: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<div />}>
          <Bubble {...args}>
            <BubbleContent>Yes, removed it from the registry.</BubbleContent>
          </Bubble>
        </TooltipTrigger>
        <TooltipContent>Read yesterday</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Pair a bubble with Popover to show additional detail on demand.
 */
export const PopoverBubble: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <Popover>
      <Bubble {...args}>
        <BubbleContent render={<PopoverTrigger />}>
          Failed to run the command.
        </BubbleContent>
      </Bubble>
      <PopoverContent className="max-w-xs text-sm">
        The process exited before Storybook finished loading.
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Verify quick-reply bubbles expose a clickable button.
 */
export const ButtonInteraction: Story = {
  tags: ["!dev", "!autodocs"],
  args: {
    variant: "muted",
  },
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent render={<button type="button" />}>
        I need help with my subscription
      </BubbleContent>
    </Bubble>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /subscription/i });

    await userEvent.click(button);
    expect(button).toHaveFocus();
  },
};

/**
 * Verify collapsible bubble content can be expanded.
 */
export const CollapsibleExpanded: Story = {
  tags: ["!dev", "!autodocs"],
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <Collapsible className="flex flex-col gap-2">
      <Bubble {...args}>
        <BubbleContent>The short summary is visible first.</BubbleContent>
      </Bubble>
      <CollapsibleContent>
        <Bubble {...args}>
          <BubbleContent>
            The hidden implementation detail is now visible.
          </BubbleContent>
        </Bubble>
      </CollapsibleContent>
      <CollapsibleTrigger className="w-fit text-sm underline underline-offset-4 hover:text-primary">
        Show more
      </CollapsibleTrigger>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /show more/i }));
    expect(canvas.getByText(/hidden implementation detail/i)).toBeVisible();
  },
};

/**
 * Verify interactive reaction buttons have accessible labels.
 */
export const AccessibleReactions: Story = {
  tags: ["!dev", "!autodocs"],
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <Bubble {...args} className="mb-4">
      <BubbleContent>Can I run the formatter?</BubbleContent>
      <BubbleReactions>
        <Button aria-label="Approve" size="icon-xs" variant="secondary">
          <CheckIcon />
        </Button>
        <Button aria-label="Thumbs up" size="icon-xs" variant="secondary">
          <ThumbsUpIcon />
        </Button>
        <Button
          aria-label="More information"
          size="icon-xs"
          variant="secondary"
        >
          <InfoIcon />
        </Button>
      </BubbleReactions>
    </Bubble>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole("button", { name: /approve/i }),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole("button", { name: /thumbs up/i }),
    ).toBeInTheDocument();
  },
};
