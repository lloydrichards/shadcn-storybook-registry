import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Used to display textual user input from keyboard.
 */
const meta: Meta<typeof Kbd> = {
  title: "ui/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Use the KbdGroup component to group keyboard keys together.
 */
export const Group: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground text-sm">
        Use{" "}
        <KbdGroup>
          <Kbd {...args}>Ctrl + B</Kbd>
          <Kbd {...args}>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        to open the command palette
      </p>
    </div>
  ),
};

/**
 * Use the Kbd component inside a Button component to display a keyboard key inside a button.
 */
export const WithButton: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" className="pr-2">
        Accept <Kbd {...args}>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" className="pr-2">
        Cancel <Kbd {...args}>Esc</Kbd>
      </Button>
    </div>
  ),
};

/**
 * You can use the Kbd component inside a Tooltip component to display a tooltip with a keyboard key.
 */
export const WithTooltip: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <TooltipProvider>
        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline">
                Save
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2">
                Save Changes <Kbd {...args}>S</Kbd>
              </div>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline">
                Print
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2">
                Print Document{" "}
                <KbdGroup>
                  <Kbd {...args}>Ctrl</Kbd>
                  <Kbd {...args}>P</Kbd>
                </KbdGroup>
              </div>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>{" "}
      </TooltipProvider>
    </div>
  ),
};

/**
 * You can use the Kbd component inside a InputGroupAddon component to display a keyboard key inside an input group.
 */
export const WithInputGroup: Story = {
  render: (args) => (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd {...args}>⌘</Kbd>
          <Kbd {...args}>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
