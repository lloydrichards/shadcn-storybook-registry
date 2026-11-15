import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardContent } from "@/bases/aria/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/bases/aria/components/ui/command";
import {
  CalendarIcon,
  SmileIcon,
  CalculatorIcon,
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
} from "lucide-react";

function CommandInline() {
  return (
    <Card className="w-full p-0">
      <CardContent className="p-0">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList
            renderEmptyState={() => (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          >
            <CommandGroup heading="Suggestions">
              <CommandItem textValue="Calendar">
                <CalendarIcon />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem textValue="Search Emoji">
                <SmileIcon />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem textValue="Calculator">
                <CalculatorIcon />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem textValue="Profile">
                <UserIcon />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem textValue="Billing">
                <CreditCardIcon />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem textValue="Settings">
                <SettingsIcon />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
}

/** Filter commands and navigate the results with the keyboard. */
const meta = {
  id: "ui-aria-command",
  title: "ui/Command",
  component: Command,
  args: { children: null },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  render: () => <CommandInline />,
} satisfies Meta<typeof Command>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Filter commands and navigate the results with the keyboard. */
export const Default: Story = {};

/** Typing narrows the command list and displays an empty state for unmatched text. */
export const TypingInCombobox: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText("Type a command or search...");
    await userEvent.type(input, "calendar");
    await expect(
      await canvas.findByRole("menuitem", { name: /calendar/i }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("menuitem", { name: /calculator/i }),
    ).not.toBeInTheDocument();
    await userEvent.type(input, "zzz");
    await expect(await canvas.findByText("No results found.")).toBeVisible();
  },
};
