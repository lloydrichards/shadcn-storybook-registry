import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/bases/aria/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/bases/aria/components/ui/sidebar";
import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
} from "lucide-react";

/**
 * A composable, themeable and customizable sidebar component.
 */
const meta = {
  id: "ui-aria-sidebar",
  title: "ui/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  argTypes: {
    side: {
      options: ["left", "right"],
      control: { type: "radio" },
    },
    variant: {
      options: ["sidebar", "floating", "inset"],
      control: { type: "radio" },
    },
    collapsible: {
      options: ["offcanvas", "icon", "none"],
      control: { type: "radio" },
    },
  },
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "icon",
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
        <section className="m-4">
          <SidebarTrigger />
          <div className="size-full" />
        </section>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof Sidebar>;

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

/**
 * A simple sidebar with a group of menu items.
 */
export const Default: Story = {
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  ),
};

/**
 * A simple sidebar with a footer menu item.
 */
export const Footer: Story = {
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenuTrigger>
              <SidebarMenuButton>
                <User2 /> Username
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
              <DropdownMenu placement="top" className="w-(--trigger-width)">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  ),
};

export const ShouldCloseOpen: Story = {
  ...Default,
  name: "when clicking the trigger, should close and open the sidebar",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, canvasElement, step }) => {
    const sidebarBtn = await canvas.findByRole("button", {
      name: /toggle/i,
    });
    const sidebar = canvasElement.querySelector('[data-slot="sidebar"]');
    await step("close the sidebar", async () => {
      await userEvent.click(sidebarBtn);
      await expect(sidebar).toHaveAttribute("data-state", "collapsed");
    });

    await step("reopen the sidebar", async () => {
      await userEvent.click(sidebarBtn);
      await expect(sidebar).toHaveAttribute("data-state", "expanded");
    });
  },
};
