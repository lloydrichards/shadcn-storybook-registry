// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { expect, fn, userEvent, within } from "storybook/test";

/**
 * A drawer component for React.
 */
const meta = {
  title: "ui/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: {
    onOpenChange: fn(),
    onClose: fn(),
    onAnimationEnd: fn(),
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className="bg-primary text-primary-foreground rounded px-4 py-2">
            Submit
          </DrawerClose>
          <DrawerClose className="hover:underline">Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the drawer.
 */
export const Default: Story = {};

export const ShouldOpenCloseContinue: Story = {
  name: "when clicking Continue button, should close the dialog",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);

    // Open the dialog
    await userEvent.click(await canvas.findByRole("button", { name: "Open" }));
    await expect(args.onOpenChange).toHaveBeenCalled();

    const dialog = await canvas.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("data-state", "open");

    // Close the dialog
    await userEvent.click(
      await canvas.findByRole("button", { name: "Submit" }),
      { delay: 100 },
    );
    await expect(args.onClose).toHaveBeenCalled();
    expect(dialog).toHaveAttribute("data-state", "closed");
  },
};
