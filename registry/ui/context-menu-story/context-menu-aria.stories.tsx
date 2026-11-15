import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Pressable, type Selection } from "react-aria-components";
import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/bases/aria/components/ui/context-menu";

function ContextMenuBasic() {
  return (
    <ContextMenuTrigger>
      <Pressable>
        <button
          type="button"
          className="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
        >
          Right click here
        </button>
      </Pressable>
      <ContextMenu>
        <ContextMenuGroup>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem isDisabled>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  );
}

function ContextMenuWithShortcuts() {
  return (
    <ContextMenuTrigger>
      <Pressable>
        <button
          type="button"
          className="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
        >
          Right click here
        </button>
      </Pressable>
      <ContextMenu>
        <ContextMenuGroup>
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem isDisabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save As...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  );
}

function ContextMenuWithSubmenu() {
  return (
    <ContextMenuTrigger>
      <Pressable>
        <button
          type="button"
          className="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
        >
          Right click here
        </button>
      </Pressable>
      <ContextMenu>
        <ContextMenuGroup>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuGroup>
              <ContextMenuItem>Save Page...</ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenu>
    </ContextMenuTrigger>
  );
}

function ContextMenuWithCheckboxes() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["bookmarks-bar", "developer-tools"]),
  );

  return (
    <ContextMenuTrigger>
      <Pressable>
        <button
          type="button"
          className="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
        >
          Right click here
        </button>
      </Pressable>
      <ContextMenu>
        <ContextMenuGroup
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <ContextMenuItem id="bookmarks-bar">
            Show Bookmarks Bar
          </ContextMenuItem>
          <ContextMenuItem>Show Full URLs</ContextMenuItem>
          <ContextMenuItem id="developer-tools">
            Show Developer Tools
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  );
}

function ContextMenuWithRadio() {
  const [user, setUser] = React.useState("pedro");
  const [theme, setTheme] = React.useState("light");

  return (
    <ContextMenuTrigger>
      <Pressable>
        <button
          type="button"
          className="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
        >
          Right click here
        </button>
      </Pressable>
      <ContextMenu>
        <ContextMenuGroup>
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuGroup
            selectionMode="single"
            selectedKeys={[user]}
            onSelectionChange={(keys) =>
              setUser(
                keys === "all"
                  ? "pedro"
                  : (keys.values().next().value as string),
              )
            }
          >
            <ContextMenuItem id="pedro">Pedro Duarte</ContextMenuItem>
            <ContextMenuItem id="colm">Colm Tuite</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuGroup
            selectionMode="single"
            selectedKeys={theme}
            onSelectionChange={(keys) =>
              setTheme(
                keys === "all"
                  ? "light"
                  : (keys.values().next().value as string),
              )
            }
          >
            <ContextMenuItem id="light">Light</ContextMenuItem>
            <ContextMenuItem id="dark">Dark</ContextMenuItem>
            <ContextMenuItem id="system">System</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  );
}

/** Open actions for the current item with a right click. */
const meta = {
  id: "ui-aria-contextmenu",
  title: "ui/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  render: () => <ContextMenuBasic />,
} satisfies Meta<typeof ContextMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Open actions for the current item with a right click. */
export const Default: Story = {};

/** Display keyboard shortcuts alongside their actions. */
export const WithShortcuts: Story = {
  render: () => <ContextMenuWithShortcuts />,
};

/** Open related actions in a submenu. */
export const WithSubmenu: Story = { render: () => <ContextMenuWithSubmenu /> };

/** Toggle multiple settings independently. */
export const WithCheckboxes: Story = {
  render: () => <ContextMenuWithCheckboxes />,
};

/** Choose one setting at a time. */
export const WithRadioGroup: Story = { render: () => <ContextMenuWithRadio /> };

/** Open the context menu with a right click and dismiss it with Escape. */
export const ShouldOpenClose: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, canvas }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.pointer({
      keys: "[MouseRight]",
      target: canvas.getByText("Right click here"),
    });
    await waitFor(() =>
      expect(body.getByRole("menuitem", { name: "Back" })).toBeVisible(),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(body.queryByRole("menu")).not.toBeInTheDocument(),
    );
  },
};
