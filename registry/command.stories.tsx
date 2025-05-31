// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommandSeparator } from "cmdk";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { expect, userEvent } from "storybook/test";

/**
 * Fast, composable, unstyled command menu for React.
 */
const meta = {
  title: "ui/Command",
  component: Command,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    className: "rounded-lg w-96 border shadow-md",
  },
  render: (args) => (
    <Command {...args}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem disabled>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the command.
 */
export const Default: Story = {};

export const ShouldFindExact: Story = {
  name: "when typing an exact match, should find one result",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox");

    await userEvent.type(input, "calendar", { delay: 100 });
    expect(canvas.getAllByRole("option", { name: /calendar/i })).toHaveLength(
      1,
    );
  },
};
export const ShouldFindPartial: Story = {
  name: "when typing a partial match, should find multiple results",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox");

    await userEvent.type(input, "se", { delay: 100 });
    expect(canvas.getAllByRole("option").length).toBeGreaterThan(1);
    expect(canvas.getAllByRole("option", { name: /search/i })).toHaveLength(1);
  },
};
export const ShouldFindNone: Story = {
  name: "when typing no match, should find no results",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox");

    await userEvent.type(input, "story", { delay: 100 });
    expect(canvas.queryAllByRole("option", { hidden: false })).toHaveLength(0);
    expect(canvas.getByText(/no results/i)).toBeVisible();
  },
};
