// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  BookOpenCheckIcon,
  CheckIcon,
  FileTextIcon,
  GitBranchIcon,
  RotateCcwIcon,
  SearchIcon,
} from "lucide-react";
import { expect, userEvent, within } from "storybook/test";

import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/bases/base/components/ui/marker";
import { Spinner } from "@/bases/base/components/ui/spinner";

/**
 * Displays inline conversation status, notes, actions, and separators.
 */
const meta: Meta<typeof Marker> = {
  title: "ui/base/Marker",
  component: Marker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "separator", "border"],
    },
  },
  args: {
    variant: "default",
  },
  decorators: (Story) => (
    <div className="w-full min-w-sm max-w-md">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Marker>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default marker for inline notes and status updates.
 */
export const Default: Story = {
  render: (args) => (
    <Marker {...args}>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
  ),
};

/**
 * Use the border variant for status rows that separate the next row.
 */
export const Border: Story = {
  args: {
    variant: "border",
  },
  render: (args) => (
    <Marker {...args}>
      <MarkerContent>Opened implementation notes</MarkerContent>
    </Marker>
  ),
};

/**
 * Use the separator variant for date breaks or labeled transcript sections.
 */
export const Separator: Story = {
  args: {
    variant: "separator",
  },
  render: (args) => (
    <Marker {...args}>
      <MarkerContent>Today</MarkerContent>
    </Marker>
  ),
};

/**
 * Use `role="status"` for progress markers that should be announced.
 */
export const Status: Story = {
  render: (args) => (
    <Marker {...args} role="status">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent>Compacting conversation</MarkerContent>
    </Marker>
  ),
};

/**
 * Add shimmer to streaming or in-progress marker text.
 */
export const Shimmer: Story = {
  render: (args) => (
    <Marker {...args}>
      <MarkerContent className="shimmer">Thinking...</MarkerContent>
    </Marker>
  ),
};

/**
 * Add an icon to make a system note easier to scan.
 */
export const WithIcon: Story = {
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
  ),
};

/**
 * Render a marker as a button for inline transcript actions.
 */
export const ButtonMarker: Story = {
  render: (args) => (
    <Marker {...args} render={<button type="button" />}>
      <MarkerIcon>
        <RotateCcwIcon />
      </MarkerIcon>
      <MarkerContent>Revert this change</MarkerContent>
    </Marker>
  ),
};

/**
 * Render a marker as a link when the note navigates to related context.
 */
export const LinkMarker: Story = {
  render: (args) => (
    <Marker {...args} render={<a href="#pull-request" />}>
      <MarkerContent>View the pull request</MarkerContent>
    </Marker>
  ),
};

/**
 * Compose a short timeline with separators, bordered rows, and icon markers.
 */
export const Timeline: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <SearchIcon />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <BookOpenCheckIcon />
        </MarkerIcon>
        <MarkerContent>Implementation notes are up to date</MarkerContent>
      </Marker>
    </div>
  ),
};

/**
 * Verify interactive markers expose a button and respond to clicks.
 */
export const ButtonInteraction: Story = {
  tags: ["!dev", "!autodocs"],
  render: () => (
    <Marker render={<button type="button" />}>
      <MarkerIcon>
        <CheckIcon />
      </MarkerIcon>
      <MarkerContent>Mark as resolved</MarkerContent>
    </Marker>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /mark as resolved/i });

    await userEvent.click(button);
    expect(button).toHaveFocus();
  },
};

/**
 * Verify status markers keep progress text available to assistive tech.
 */
export const StatusAnnounced: Story = {
  tags: ["!dev", "!autodocs"],
  render: () => (
    <Marker role="status">
      <MarkerIcon>
        <FileTextIcon />
      </MarkerIcon>
      <MarkerContent>Reading project files</MarkerContent>
    </Marker>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("status")).toHaveTextContent(
      "Reading project files",
    );
  },
};
