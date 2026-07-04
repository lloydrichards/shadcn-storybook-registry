// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { expect, userEvent, within } from "storybook/test";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/bases/radix/components/ui/attachment";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/bases/radix/components/ui/avatar";
import { Bubble, BubbleContent } from "@/bases/radix/components/ui/bubble";
import { Button } from "@/bases/radix/components/ui/button";
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/bases/radix/components/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/bases/radix/components/ui/message";
import { Spinner } from "@/bases/radix/components/ui/spinner";

/**
 * Lays out conversation messages with avatar, content, header, footer, and alignment.
 */
const meta: Meta<typeof Message> = {
  title: "ui/radix/Message",
  component: Message,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    align: {
      control: "select",
      options: ["start", "end"],
    },
  },
  args: {
    align: "start",
  },
  decorators: (Story) => (
    <div className="w-full min-w-sm max-w-md">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

function AvatarSlot() {
  return (
    <MessageAvatar>
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </MessageAvatar>
  );
}

/**
 * The default message row wraps a bubble surface.
 */
export const Default: Story = {
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>How can I help you today?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
};

/**
 * Align a message to the end for current-user messages.
 */
export const AlignedEnd: Story = {
  args: {
    align: "end",
  },
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        <Bubble>
          <BubbleContent>Deploying to prod real quick.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
};

/**
 * Add an avatar beside a message.
 */
export const WithAvatar: Story = {
  render: (args) => (
    <Message {...args}>
      <AvatarSlot />
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>
            The build failed during dependency installation.
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
};

/**
 * Group consecutive messages from the same sender.
 */
export const Group: Story = {
  render: () => (
    <MessageGroup>
      <Message>
        <MessageAvatar />
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>I checked the registry addresses.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <AvatarSlot />
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>
              The component and example JSON now live under the UI registry.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
};

/**
 * Use MessageHeader for sender names or concise context.
 */
export const Header: Story = {
  render: (args) => (
    <Message {...args}>
      <AvatarSlot />
      <MessageContent>
        <MessageHeader>Olivia</MessageHeader>
        <Bubble variant="secondary">
          <BubbleContent>I already checked the logs.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
};

/**
 * Use MessageFooter for delivery state or timestamps.
 */
export const Footer: Story = {
  args: {
    align: "end",
  },
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        <Bubble>
          <BubbleContent>Send the report to the team.</BubbleContent>
        </Bubble>
        <MessageFooter>Read yesterday</MessageFooter>
      </MessageContent>
    </Message>
  ),
};

/**
 * Place message-level actions in MessageFooter.
 */
export const Actions: Story = {
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>
            The install failure is coming from the workspace package.
          </BubbleContent>
        </Bubble>
        <MessageFooter className="gap-1">
          <Button variant="ghost" size="icon-xs" aria-label="Copy message">
            <CopyIcon />
          </Button>
          <Button variant="ghost" size="icon-xs" aria-label="Retry message">
            <RefreshCcwIcon />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  ),
};

/**
 * Add attachments inside message content.
 */
export const WithAttachment: Story = {
  render: (args) => (
    <Message {...args}>
      <AvatarSlot />
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>
            Done. Here is the PDF with the image added as the cover page.
          </BubbleContent>
        </Bubble>
        <Attachment>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Download sales-dashboard.pdf">
              <DownloadIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </MessageContent>
    </Message>
  ),
};

/**
 * Use a status marker for in-progress message work.
 */
export const WithStatus: Story = {
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        <Marker role="status">
          <MarkerIcon>
            <Spinner />
          </MarkerIcon>
          <MarkerContent>Checking the logs...</MarkerContent>
        </Marker>
      </MessageContent>
    </Message>
  ),
};

/**
 * Verify copy actions in the message footer are clickable.
 */
export const CopyAction: Story = {
  tags: ["!dev", "!autodocs"],
  render: () => (
    <Message>
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>Copy this message.</BubbleContent>
        </Bubble>
        <MessageFooter>
          <Button variant="ghost" size="icon-xs" aria-label="Copy message">
            <CopyIcon />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /copy message/i });

    await userEvent.click(button);
    expect(button).toHaveFocus();
  },
};

/**
 * Verify retry actions in failed messages are clickable.
 */
export const RetryAction: Story = {
  tags: ["!dev", "!autodocs"],
  render: () => (
    <Message>
      <MessageContent>
        <Bubble variant="destructive">
          <BubbleContent>Failed to send.</BubbleContent>
        </Bubble>
        <MessageFooter>
          <Button variant="ghost" size="icon-xs" aria-label="Retry message">
            <RefreshCcwIcon />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /retry message/i });

    await userEvent.click(button);
    expect(button).toHaveFocus();
  },
};
