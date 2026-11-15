import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/bases/aria/components/ui/resizable";
import { expect, fn, userEvent, waitFor } from "storybook/test";
/**
 * Accessible resizable panel groups and layouts with keyboard support.
 */
const meta: Meta<typeof ResizablePanelGroup> = {
  id: "ui-aria-resizablepanelgroup",
  title: "ui/ResizablePanelGroup",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  argTypes: {
    onLayoutChange: {
      control: false,
    },
  },
  args: {
    onLayoutChange: fn(),
    className: "max-w-96 rounded-lg border",
    orientation: "horizontal",
  },
  render: (args) => (
    <ResizablePanelGroup {...args}>
      <ResizablePanel defaultSize="50%">
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="25%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="75%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the resizable panel group.
 */
export const Default: Story = {};

/** Resize the first panel with the keyboard. */
export const KeyboardResize: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const [handle] = canvas.getAllByRole("separator");
    const initial = Number(handle.getAttribute("aria-valuenow"));
    handle.focus();
    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() =>
      expect(Number(handle.getAttribute("aria-valuenow"))).toBeGreaterThan(
        initial,
      ),
    );
  },
};
