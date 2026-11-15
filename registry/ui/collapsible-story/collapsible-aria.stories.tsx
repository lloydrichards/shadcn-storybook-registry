import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Info } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/bases/aria/components/ui/collapsible";
import { expect, userEvent } from "storybook/test";

/**
 * An interactive component which expands/collapses a panel.
 */
const meta = {
  id: "ui-aria-collapsible",
  title: "ui/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    className: "w-96",
    isDisabled: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger className="flex gap-2">
        <h3 className="font-semibold">Can I use this in my project?</h3>
        <Info className="size-6" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the collapsible.
 */
export const Default: Story = {};

/**
 * Use the `isDisabled` prop to disable the interaction.
 */
export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const ShouldOpenClose: Story = {
  name: "when collapsable trigger is clicked, should show content",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    const trigger = await canvas.findByRole("button");

    await step("Open the collapsible", async () => {
      await userEvent.click(trigger, { delay: 100 });
      expect(await canvas.queryByText(/yes/i, { exact: true })).toBeVisible();
    });

    await step("Close the collapsible", async () => {
      await userEvent.click(trigger, { delay: 100 });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(canvas.getByText(/yes/i)).not.toBeVisible();
    });
  },
};
