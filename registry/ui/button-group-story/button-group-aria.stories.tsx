import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent } from "storybook/test";
import { Popover, PopoverTrigger } from "@/bases/aria/components/ui/popover";
import { Button } from "@/bases/aria/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/bases/aria/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/bases/aria/components/ui/dropdown-menu";
import { Field } from "@/bases/aria/components/ui/field";
import { Input } from "@/bases/aria/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/bases/aria/components/ui/input-group";
import { Label } from "@/bases/aria/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/bases/aria/components/ui/select";
import { Tooltip, TooltipTrigger } from "@/bases/aria/components/ui/tooltip";
import {
  PlusIcon,
  MinusIcon,
  AudioLinesIcon,
  ChevronDownIcon,
  VolumeX,
  CheckIcon,
  AlertTriangleIcon,
  UserRoundXIcon,
  ShareIcon,
  CopyIcon,
  TrashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "lucide-react";

function ButtonGroupBasic() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Another Button</Button>
      </ButtonGroup>
    </div>
  );
}

function ButtonGroupVertical() {
  return (
    <div className="flex gap-6">
      <ButtonGroup
        orientation="vertical"
        aria-label="Media controls"
        className="h-fit"
      >
        <Button variant="outline" size="icon" aria-label="Increase">
          <PlusIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Decrease">
          <MinusIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}

function MessageInputGroup() {
  const [voice, setVoice] = useState(false);
  return (
    <ButtonGroup aria-label="Message composer">
      <Button variant="outline" aria-label="Add attachment">
        <PlusIcon />
      </Button>
      <InputGroup>
        <InputGroupInput
          aria-label="Message"
          disabled={voice}
          placeholder={voice ? "Record audio..." : "Send a message..."}
        />
        <InputGroupAddon align="inline-end">
          <TooltipTrigger>
            <InputGroupButton
              aria-label="Voice mode"
              aria-pressed={voice}
              size="icon-xs"
              onPress={() => setVoice(!voice)}
            >
              <AudioLinesIcon />
            </InputGroupButton>
            <Tooltip>Voice mode</Tooltip>
          </TooltipTrigger>
        </InputGroupAddon>
      </InputGroup>
    </ButtonGroup>
  );
}

function ButtonGroupWithInput() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline">Button</Button>
        <Input placeholder="Type something here..." />
      </ButtonGroup>
      <ButtonGroup>
        <Input placeholder="Type something here..." />
        <Button variant="outline">Button</Button>
      </ButtonGroup>
    </div>
  );
}

function ButtonGroupWithDropdown() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline">Update</Button>

        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" aria-label="More actions">
            <ChevronDownIcon />
          </Button>
          <DropdownMenu placement="bottom end">
            <DropdownMenuItem>Disable</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Uninstall</DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Follow</Button>

        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" aria-label="More actions">
            <ChevronDownIcon />
          </Button>
          <DropdownMenu placement="bottom end" className="w-50">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <VolumeX />
                Mute Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckIcon />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertTriangleIcon />
                Report Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserRoundXIcon />
                Block User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShareIcon />
                Share Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CopyIcon />
                Copy Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <TrashIcon />
                Delete Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </ButtonGroup>
    </div>
  );
}

const currencyItems = [
  { label: "$", value: "$" },
  { label: "€", value: "€" },
  { label: "£", value: "£" },
];

function ButtonGroupWithSelect() {
  return (
    <Field>
      <Label htmlFor="amount">Amount</Label>
      <ButtonGroup>
        <Select aria-label="Currency" defaultValue={currencyItems[0].value}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {currencyItems.map((item) => (
                <SelectItem key={item.value} id={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input id="amount" placeholder="Enter amount to send" />
        <Button variant="outline" aria-label="Send amount">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </Field>
  );
}

function ButtonGroupPaginationSplit() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-xs" aria-label="Previous page">
          <ArrowLeftIcon />
        </Button>
        <Button variant="outline" size="icon-xs" aria-label="Next page">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}

/** Group related controls into a single row or column. */
const meta = {
  id: "ui-aria-buttongroup",
  title: "ui/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  render: () => <ButtonGroupBasic />,
} satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Group related controls into a single row or column. */
export const Default: Story = {};

/** Stack controls vertically. */
export const Orientation: Story = { render: () => <ButtonGroupVertical /> };

/** Nest groups to separate related actions. */
export const Nested: Story = { render: () => <ButtonGroupPaginationSplit /> };

/** Place a text field alongside its action. */
export const WithInput: Story = { render: () => <ButtonGroupWithInput /> };

/** Keep the primary action visible and group secondary actions in a menu. */
export const WithDropdownMenu: Story = {
  render: () => <ButtonGroupWithDropdown />,
};

/** Change the currency before entering an amount. */
export const WithSelect: Story = { render: () => <ButtonGroupWithSelect /> };

/** Split the primary action from its adjacent icon button. */
export const Split: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">New file</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" aria-label="Add another file">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  ),
};

/** Separate commands that act on the same selection. */
export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Paste</Button>
    </ButtonGroup>
  ),
};

/** Toggle voice mode to switch between text and audio input. */
export const WithInputGroup: Story = { render: () => <MessageInputGroup /> };

/** Open task details using the secondary half of the button group. */
export const WithPopover: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Tasks</Button>
      <PopoverTrigger>
        <Button variant="outline" aria-label="Show task details">
          <ChevronDownIcon />
        </Button>
        <Popover placement="bottom end" aria-label="Task details">
          No tasks are currently running.
        </Popover>
      </PopoverTrigger>
    </ButtonGroup>
  ),
};

/** Verify that voice mode disables text entry and can be switched off. */
export const ShouldToggleVoiceInput: Story = {
  ...WithInputGroup,
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("button", { name: "Voice mode" });
    const input = canvas.getByRole("textbox", { name: "Message" });
    await userEvent.click(toggle);
    await expect(input).toBeDisabled();
    await userEvent.click(toggle);
    await expect(input).toBeEnabled();
  },
};
