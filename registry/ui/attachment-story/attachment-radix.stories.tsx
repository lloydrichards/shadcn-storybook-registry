// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  CheckIcon,
  ClockIcon,
  CopyIcon,
  DownloadIcon,
  FileCodeIcon,
  FileSearchIcon,
  FileTextIcon,
  ImageIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import type * as React from "react";
import { expect, userEvent, within } from "storybook/test";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/bases/radix/components/ui/attachment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/bases/radix/components/ui/dialog";
import { Spinner } from "@/bases/radix/components/ui/spinner";

/**
 * Displays file and image attachments with metadata, states, and actions.
 */
const meta: Meta<typeof Attachment> = {
  title: "ui/radix/Attachment",
  component: Attachment,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "uploading", "processing", "error", "done"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    state: "done",
    size: "default",
    orientation: "horizontal",
  },
  decorators: (Story) => (
    <div className="w-full min-w-sm max-w-md">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Attachment>;

export default meta;

type Story = StoryObj<typeof meta>;

function FileAttachment({
  name = "sales-dashboard.pdf",
  description = "PDF · 2.4 MB",
  icon = <FileTextIcon />,
  actionLabel = "Remove sales-dashboard.pdf",
  ...props
}: React.ComponentProps<typeof Attachment> & {
  name?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
}) {
  return (
    <Attachment {...props}>
      <AttachmentMedia>{icon}</AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{name}</AttachmentTitle>
        <AttachmentDescription>{description}</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label={actionLabel}>
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}

/**
 * The default attachment uses an icon, title, metadata, and an action.
 */
export const Default: Story = {
  render: (args) => <FileAttachment {...args} />,
};

/**
 * Use image media and vertical orientation for image previews.
 */
export const ImagePreview: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <Attachment {...args}>
      <AttachmentMedia variant="image">
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=240&q=80"
          alt="Workspace"
          width={96}
          height={96}
          unoptimized
        />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>workspace.png</AttachmentTitle>
        <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove workspace.png">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
};

/**
 * Use the uploading state for active file uploads.
 */
export const Uploading: Story = {
  args: {
    state: "uploading",
  },
  render: (args) => (
    <FileAttachment
      {...args}
      name="design-system.zip"
      description="Uploading · 64%"
      icon={<Spinner />}
    />
  ),
};

/**
 * Use the processing state after upload while a file is being prepared.
 */
export const Processing: Story = {
  args: {
    state: "processing",
  },
  render: (args) => (
    <FileAttachment
      {...args}
      name="market-research.pdf"
      description="Processing document"
      icon={<ClockIcon />}
    />
  ),
};

/**
 * Use the error state when an attachment needs user attention.
 */
export const ErrorState: Story = {
  args: {
    state: "error",
  },
  render: (args) => (
    <FileAttachment
      {...args}
      name="financial-model.xlsx"
      description="Upload failed. Try again."
      icon={<XIcon />}
    />
  ),
};

/**
 * Use the small size for compact attachment rows.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <FileAttachment
      {...args}
      name="briefing-notes.pdf"
      description="PDF · 1.4 MB"
    />
  ),
};

/**
 * Use the extra small size for dense composer previews.
 */
export const ExtraSmall: Story = {
  args: {
    size: "xs",
  },
  render: (args) => (
    <FileAttachment
      {...args}
      name="renderer.tsx"
      description="TSX · 12 KB"
      icon={<FileCodeIcon />}
    />
  ),
};

/**
 * Group attachments in a horizontally scrollable row.
 */
export const Group: Story = {
  render: () => (
    <AttachmentGroup tabIndex={0} role="group" aria-label="Attachments">
      <FileAttachment name="briefing-notes.pdf" description="PDF · 1.4 MB" />
      <FileAttachment
        name="workspace.png"
        description="PNG · 820 KB"
        icon={<ImageIcon />}
      />
      <FileAttachment
        name="customers.csv"
        description="CSV · 18 KB"
        icon={<FileTextIcon />}
      />
    </AttachmentGroup>
  ),
};

/**
 * Add multiple icon actions when the attachment supports file operations.
 */
export const WithActions: Story = {
  render: (args) => (
    <Attachment {...args}>
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>release-notes.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 980 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Download release-notes.pdf">
          <DownloadIcon />
        </AttachmentAction>
        <AttachmentAction aria-label="Copy link to release-notes.pdf">
          <CopyIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
};

/**
 * Use AttachmentTrigger for card-level preview while keeping attachment actions separate.
 */
export const Trigger: Story = {
  render: (args) => (
    <Dialog>
      <Attachment {...args}>
        <AttachmentMedia>
          <FileSearchIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>research-summary.pdf</AttachmentTitle>
          <AttachmentDescription>Open preview dialog</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove research-summary.pdf">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
        <DialogTrigger asChild>
          <AttachmentTrigger aria-label="Preview research-summary.pdf" />
        </DialogTrigger>
      </Attachment>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>research-summary.pdf</DialogTitle>
          <DialogDescription>
            Preview the selected attachment before sending it.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Verify attachment actions are independently clickable.
 */
export const ActionInteraction: Story = {
  tags: ["!dev", "!autodocs"],
  render: () => <FileAttachment actionLabel="Remove sales-dashboard.pdf" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: /remove sales-dashboard.pdf/i,
    });

    await userEvent.click(button);
    expect(button).toHaveFocus();
  },
};

/**
 * Verify triggers and actions remain separate interactive controls.
 */
export const TriggerInteraction: Story = {
  tags: ["!dev", "!autodocs"],
  render: () => (
    <Attachment>
      <AttachmentMedia>
        <CheckIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>handoff.md</AttachmentTitle>
        <AttachmentDescription>Markdown · 8 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove handoff.md">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
      <AttachmentTrigger aria-label="Open handoff.md" />
    </Attachment>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole("button", { name: /open handoff.md/i }),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole("button", { name: /remove handoff.md/i }),
    ).toBeInTheDocument();
  },
};
