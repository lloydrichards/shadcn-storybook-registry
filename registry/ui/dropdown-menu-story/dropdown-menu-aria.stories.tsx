import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/bases/aria/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/bases/aria/components/ui/dropdown-menu";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  LayoutIcon,
  ActivityIcon,
  PanelLeftIcon,
} from "lucide-react";

function DropdownMenuBasic() {
  return (
    <DropdownMenuTrigger>
      <Button variant="outline" className="w-fit">
        Open
      </Button>
      <DropdownMenu>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem isDisabled>API</DropdownMenuItem>
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}

function DropdownMenuWithShortcuts() {
  return (
    <DropdownMenuTrigger>
      <Button variant="outline" className="w-fit">
        Open
      </Button>
      <DropdownMenu>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}

function DropdownMenuWithSubmenu() {
  return (
    <DropdownMenuTrigger>
      <Button variant="outline" className="w-fit">
        Open
      </Button>
      <DropdownMenu>
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>

            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Message</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>More...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}

function DropdownMenuWithRadio() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenuTrigger>
      <Button variant="outline" className="w-fit">
        Radio Group
      </Button>
      <DropdownMenu>
        <DropdownMenuGroup
          selectionMode="single"
          selectedKeys={[position]}
          onSelectionChange={(keys) =>
            setPosition(
              keys === "all"
                ? "bottom"
                : (keys.values().next().value as string),
            )
          }
        >
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuItem id="top">
            <ArrowUpIcon />
            Top
          </DropdownMenuItem>
          <DropdownMenuItem id="bottom">
            <ArrowDownIcon />
            Bottom
          </DropdownMenuItem>
          <DropdownMenuItem id="right" isDisabled>
            <ArrowRightIcon />
            Right
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}

function DropdownMenuWithCheckboxes() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["status-bar"]),
  );

  return (
    <DropdownMenuTrigger>
      <Button variant="outline" className="w-fit">
        Checkboxes
      </Button>
      <DropdownMenu className="min-w-40">
        <DropdownMenuGroup
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuItem id="status-bar">
            <LayoutIcon />
            Status Bar
          </DropdownMenuItem>
          <DropdownMenuItem id="activity-bar" isDisabled>
            <ActivityIcon />
            Activity Bar
          </DropdownMenuItem>
          <DropdownMenuItem id="panel">
            <PanelLeftIcon />
            Panel
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}

/** Open a menu of actions and settings from a button. */
const meta = {
  id: "ui-aria-dropdownmenu",
  title: "ui/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  render: () => <DropdownMenuBasic />,
} satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Open a menu of actions and settings from a button. */
export const Default: Story = {};

/** Display keyboard shortcuts alongside their actions. */
export const WithShortcuts: Story = {
  render: () => <DropdownMenuWithShortcuts />,
};

/** Open related actions in a submenu. */
export const WithSubmenus: Story = {
  render: () => <DropdownMenuWithSubmenu />,
};

/** Choose one setting at a time. */
export const WithRadioItems: Story = {
  render: () => <DropdownMenuWithRadio />,
};

/** Toggle multiple settings independently. */
export const WithCheckboxes: Story = {
  render: () => <DropdownMenuWithCheckboxes />,
};

/** Selecting an action closes the menu and returns focus to the trigger. */
export const ShouldOpenClose: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, canvas }) => {
    const body = within(canvasElement.ownerDocument.body),
      trigger = canvas.getByRole("button", { name: "Open" });
    await userEvent.click(trigger);
    await userEvent.click(
      await body.findByRole("menuitem", { name: "Profile" }),
    );
    await waitFor(() =>
      expect(body.queryByRole("menu")).not.toBeInTheDocument(),
    );
    await expect(trigger).toHaveFocus();
  },
};
