// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { expect, userEvent, within } from "storybook/test";

/**
 * A visually persistent menu common in desktop applications that provides
 * quick access to a consistent set of commands.
 */
const meta = {
  title: "ui/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  argTypes: {},

  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Menubar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the menubar.
 */
export const Default: Story = {};

/**
 * A menubar with a submenu.
 */
export const WithSubmenu: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Actions</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Download</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * A menubar with radio items.
 */
export const WithRadioItems: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel inset>Device Size</MenubarLabel>
          <MenubarRadioGroup value="md">
            <MenubarRadioItem value="sm">Small</MenubarRadioItem>
            <MenubarRadioItem value="md">Medium</MenubarRadioItem>
            <MenubarRadioItem value="lg">Large</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * A menubar with checkbox items.
 */
export const WithCheckboxItems: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Filters</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Show All</MenubarItem>
          <MenubarGroup>
            <MenubarCheckboxItem checked>Unread</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Important</MenubarCheckboxItem>
            <MenubarCheckboxItem>Flagged</MenubarCheckboxItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const ShouldOpenClose: Story = {
  name: "when clicking an item, should close the menubar",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);

    await step("open the menubar", async () => {
      await userEvent.click(
        await canvasBody.findByRole("menuitem", { name: /file/i }),
      );
      expect(await canvasBody.findByRole("menu")).toBeInTheDocument();
    });

    const items = await canvasBody.findAllByRole("menuitem");
    expect(items).toHaveLength(5);

    await step("click the first item to close the menubar", async () => {
      await userEvent.click(items[0], { delay: 100 });
    });
  },
};
