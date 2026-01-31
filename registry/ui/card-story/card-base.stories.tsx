// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BellRing } from "lucide-react";

import { Button } from "@/bases/base/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/bases/base/components/ui/card";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

/**
 * Displays a card with header, content, and footer.
 */
const meta = {
  title: "ui/base/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    className: "w-96",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the card.
 */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center gap-4">
            <BellRing className="size-6" />
            <div>
              <p>{notification.title}</p>
              <p className="text-foreground/60">{notification.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="link">Close</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Use the `CardAction` component to add interactive elements in the header.
 */
export const WithCardAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Team Settings</CardTitle>
        <CardDescription>Manage your team preferences</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Configure team members, permissions, and notifications.</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">Cancel</Button>
        <Button className="ml-auto">Save Changes</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * A minimal card with only content, no header or footer.
 */
export const MinimalCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p className="text-sm">
          This is a minimal card with only content. Perfect for displaying
          simple information without the need for a header or footer.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * A card with only a header section, no content or footer.
 */
export const HeaderOnly: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
        <CardDescription>
          Your account summary at a glance. Click for details.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};
