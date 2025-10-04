import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Check,
  CheckIcon,
  ChevronDownIcon,
  Code,
  Copy,
  CornerDownLeft,
  CreditCardIcon,
  HelpCircle,
  Info,
  InfoIcon,
  Link2Icon,
  LoaderIcon,
  MailIcon,
  MoreHorizontal,
  RefreshCcw,
  SearchIcon,
  Star,
  StarIcon,
} from "lucide-react";
import * as React from "react";

import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Display additional information or actions to an input or textarea.
 */
const meta: Meta<typeof InputGroup> = {
  title: "ui/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Input groups with icon addons for visual enhancement.
 */
export const WithIcons: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup {...args}>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <InputGroupInput type="email" placeholder="Enter your email" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <CreditCardIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <CheckIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <StarIcon />
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Display additional text information alongside inputs.
 */
export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup {...args}>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="!pl-0.5" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <InputGroupInput placeholder="Enter your username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <InputGroupTextarea placeholder="Enter your message" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-muted-foreground text-xs">
            120 characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Add buttons to perform actions within the input group.
 */
export const WithButtons: Story = {
  render: (args) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    };

    return (
      <div className="grid w-full max-w-sm gap-6">
        <InputGroup {...args}>
          <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Copy"
              title="Copy"
              size="icon-xs"
              onClick={() => {
                copyToClipboard("https://x.com/shadcn");
              }}
            >
              {isCopied ? <Check /> : <Copy />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="[--radius:9999px]">
          <Popover>
            <PopoverTrigger asChild>
              <InputGroupAddon>
                <InputGroupButton variant="secondary" size="icon-xs">
                  <Info />
                </InputGroupButton>
              </InputGroupAddon>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex flex-col gap-1 rounded-xl text-sm"
            >
              <p className="font-medium">Your connection is not secure.</p>
              <p>
                You should not enter any sensitive information on this site.
              </p>
            </PopoverContent>
          </Popover>
          <InputGroupAddon className="text-muted-foreground pl-1.5">
            https://
          </InputGroupAddon>
          <InputGroupInput id="input-secure-19" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setIsFavorite(!isFavorite)}
              size="icon-xs"
            >
              <Star
                data-favorite={isFavorite}
                className="data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600"
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup {...args}>
          <InputGroupInput placeholder="Type to search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary">Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  },
};

/**
 * Add tooltips to provide additional context or help.
 */
export const WithTooltips: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-4">
      <TooltipProvider>
        <InputGroup {...args}>
          <InputGroupInput placeholder="Enter password" type="password" />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  variant="ghost"
                  aria-label="Info"
                  size="icon-xs"
                >
                  <InfoIcon />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Password must be at least 8 characters</p>
              </TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup {...args}>
          <InputGroupInput placeholder="Your email address" />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  variant="ghost"
                  aria-label="Help"
                  size="icon-xs"
                >
                  <HelpCircle />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>We'll use this to send you notifications</p>
              </TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup {...args}>
          <InputGroupInput placeholder="Enter API key" />
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupAddon>
                <InputGroupButton
                  variant="ghost"
                  aria-label="Help"
                  size="icon-xs"
                >
                  <HelpCircle />
                </InputGroupButton>
              </InputGroupAddon>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Click for help with API keys</p>
            </TooltipContent>
          </Tooltip>
        </InputGroup>
      </TooltipProvider>
    </div>
  ),
};

/**
 * Input groups also work with textarea components.
 */
export const WithTextarea: Story = {
  render: (args) => {
    return (
      <div className="grid w-full max-w-md gap-4">
        <InputGroup {...args}>
          <InputGroupTextarea
            id="textarea-code-32"
            placeholder="console.log('Hello, world!');"
            className="min-h-[200px]"
          />
          <InputGroupAddon align="block-end" className="border-t">
            <InputGroupText>Line 1, Column 1</InputGroupText>
            <InputGroupButton size="sm" className="ml-auto" variant="default">
              Run <CornerDownLeft />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupAddon align="block-start" className="border-b">
            <InputGroupText className="font-mono font-medium">
              <Code />
              script.js
            </InputGroupText>
            <InputGroupButton className="ml-auto" size="icon-xs">
              <RefreshCcw />
            </InputGroupButton>
            <InputGroupButton variant="ghost" size="icon-xs">
              <Copy />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  },
};

/**
 * Show loading indicators while processing input.
 */
export const WithSpinner: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup {...args} data-disabled>
        <InputGroupInput placeholder="Searching..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Processing..." disabled />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Saving changes..." disabled />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Refreshing data..." disabled />
        <InputGroupAddon>
          <LoaderIcon className="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-muted-foreground">
            Please wait...
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Add labels within input groups to improve accessibility.
 */
export const WithLabels: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-4">
      <TooltipProvider>
        <InputGroup {...args}>
          <InputGroupInput id="email" placeholder="shadcn" />
          <InputGroupAddon>
            <Label htmlFor="email">@</Label>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup {...args}>
          <InputGroupInput id="email-2" placeholder="shadcn@vercel.com" />
          <InputGroupAddon align="block-start">
            <Label htmlFor="email-2" className="text-foreground">
              Email
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  variant="ghost"
                  aria-label="Help"
                  className="ml-auto rounded-full"
                  size="icon-xs"
                >
                  <InfoIcon />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>We'll use this to send you notifications</p>
              </TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </TooltipProvider>
    </div>
  ),
};

/**
 * Pair input groups with dropdown menus for complex interactions.
 */
export const WithDropdowns: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup {...args}>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                aria-label="More"
                size="icon-xs"
              >
                <MoreHorizontal />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Copy path</DropdownMenuItem>
              <DropdownMenuItem>Open location</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="[--radius:1rem]">
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost" className="!pr-1.5 text-xs">
                Search In... <ChevronDownIcon className="size-3" />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="[--radius:0.95rem]">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Blog Posts</DropdownMenuItem>
              <DropdownMenuItem>Changelog</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Wrap input groups with button groups to create prefixes and suffixes.
 */
export const WithButtonGroup: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-6">
      <ButtonGroup>
        <ButtonGroupText asChild>
          <Label htmlFor="url">https://</Label>
        </ButtonGroupText>
        <InputGroup {...args}>
          <InputGroupInput id="url" />
          <InputGroupAddon align="inline-end">
            <Link2Icon />
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.com</ButtonGroupText>
      </ButtonGroup>
    </div>
  ),
};
