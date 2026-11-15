import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";

import { DirectionProvider } from "@/bases/base/components/ui/direction";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/bases/base/components/ui/tabs";

/** Apply the same direction to primitive keyboard behavior and browser layout. */
function DirectionDemo({ direction = "ltr" }: { direction?: "ltr" | "rtl" }) {
  return (
    <DirectionProvider direction={direction}>
      <section dir={direction} className="w-80 space-y-3">
        <p className="text-muted-foreground text-sm">
          {direction === "rtl" ? "Right to left" : "Left to right"}
        </p>
        <Tabs defaultValue="account">
          <TabsList aria-label="Settings">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Manage your account details.
          </TabsContent>
          <TabsContent value="security">Manage your password.</TabsContent>
          <TabsContent value="notifications">
            Manage your notifications.
          </TabsContent>
        </Tabs>
      </section>
    </DirectionProvider>
  );
}

/** Direction controls the reading order and horizontal navigation of components. */
const meta = {
  id: "ui-base-direction",
  title: "ui/Direction",
  component: DirectionDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { direction: "ltr" },
  argTypes: {
    direction: { control: "radio", options: ["ltr", "rtl"] },
  },
} satisfies Meta<typeof DirectionDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Read and navigate tabs from left to right. */
export const Default: Story = {};

/** Reverse the tab order and arrow-key navigation for right-to-left interfaces. */
export const RightToLeft: Story = {
  args: { direction: "rtl" },
};

/** Move between tabs with the arrow key that follows the reading direction. */
export const ShouldNavigateLeftToRight: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const account = canvas.getByRole("tab", { name: "Account" });
    const security = canvas.getByRole("tab", { name: "Security" });
    await userEvent.click(account);
    await userEvent.keyboard("{ArrowRight}");
    await expect(security).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(security).toHaveAttribute("aria-selected", "true");
    await expect(
      canvas.getByRole("tabpanel", { name: "Security" }),
    ).toHaveTextContent("Manage your password.");
    await userEvent.keyboard("{ArrowLeft}");
    await expect(account).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(account).toHaveAttribute("aria-selected", "true");
  },
};

/** Keep keyboard navigation aligned with the reversed visual tab order. */
export const ShouldNavigateRightToLeft: Story = {
  args: { direction: "rtl" },
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const account = canvas.getByRole("tab", { name: "Account" });
    const security = canvas.getByRole("tab", { name: "Security" });
    await userEvent.click(account);
    await expect(account.getBoundingClientRect().left).toBeGreaterThan(
      security.getBoundingClientRect().left,
    );
    await userEvent.keyboard("{ArrowLeft}");
    await expect(security).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(security).toHaveAttribute("aria-selected", "true");
    await expect(
      canvas.getByRole("tabpanel", { name: "Security" }),
    ).toHaveTextContent("Manage your password.");
    await userEvent.keyboard("{ArrowRight}");
    await expect(account).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(account).toHaveAttribute("aria-selected", "true");
  },
};
