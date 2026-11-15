import { expect, userEvent, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/bases/aria/components/ui/tabs";

/**
 * A set of layered sections of content—known as tab panels—that are displayed
 * one at a time.
 */
const meta = {
  id: "ui-aria-tabs",
  title: "ui/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    defaultSelectedKey: "account",
    className: "w-96",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Settings" className="grid grid-cols-2">
        <TabsTrigger id="account">Account</TabsTrigger>
        <TabsTrigger id="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent id="account">Make changes to your account here.</TabsContent>
      <TabsContent id="password">Change your password here.</TabsContent>
    </Tabs>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the tabs.
 */
export const Default: Story = {};

export const ShouldChangeTabs: Story = {
  name: "should change the content when clicking a tab",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const tabs = await canvas.findAllByRole("tab");

    for (let i = 0; i < tabs.length; i++) {
      await step(`click the '${tabs[i].innerText}' tab`, async () => {
        await userEvent.click(tabs[i]);
        await waitFor(() =>
          expect(tabs[i]).toHaveAttribute("aria-selected", "true"),
        );
        await expect(
          canvas.getByRole("tabpanel", { name: tabs[i].innerText }),
        ).toBeVisible();
      });

      await step("check other tabs are not selected", async () => {
        for (let j = 0; j < tabs.length; j++) {
          if (j !== i) {
            expect(tabs[j]).toHaveAttribute("aria-selected", "false");
            await waitFor(() =>
              expect(
                canvas.queryByRole("tabpanel", {
                  name: tabs[j].innerText,
                }),
              ).toBeNull(),
            );
          }
        }
      });
    }
  },
};
