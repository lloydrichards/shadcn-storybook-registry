import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  ClockIcon,
  SearchIcon,
  TerminalIcon,
} from "lucide-react";
import { expect, userEvent, waitFor } from "storybook/test";

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/bases/base/components/ui/trace";

/** Trace records agent steps, tool calls, and their results in expandable rows. */
const meta = {
  title: "ui/base/Trace",
  component: Trace,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { className: "w-full max-w-lg" },
  render: (args) => (
    <Trace {...args}>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Read the project configuration</TraceTitle>
        <TraceDescription>2 files</TraceDescription>
      </TraceLine>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <TerminalIcon />
            </TraceIcon>
            <TraceTitle>Ran the component tests</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <pre className="whitespace-pre-wrap font-mono text-sm">
            3 tests passed. No failures.
          </pre>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  ),
} satisfies Meta<typeof Trace>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Show completed work and let readers expand a tool result. */
export const Default: Story = {};

/** Describe running, pending, and failed work in text as well as color. */
export const Statuses: Story = {
  render: (args) => (
    <Trace {...args}>
      <TraceLine status="running">
        <TraceIcon>
          <SearchIcon />
        </TraceIcon>
        <TraceTitle>Searching the project files</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <ClockIcon />
        </TraceIcon>
        <TraceTitle>Pending: review the matching files</TraceTitle>
      </TraceLine>
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <CircleAlertIcon />
            </TraceIcon>
            <TraceTitle>Failed to fetch the build log</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          The request timed out. Retry after the build service is available.
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  ),
};

/** Expand a summary into steps, then expand a step into its output. */
export const NestedSteps: Story = {
  render: (args) => (
    <Trace {...args}>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <SearchIcon />
            </TraceIcon>
            <TraceTitle>Investigated the failing build</TraceTitle>
            <TraceDescription>2 steps</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <TraceLine>
              <TraceIcon>
                <CircleCheckIcon />
              </TraceIcon>
              <TraceTitle>Read the package scripts</TraceTitle>
            </TraceLine>
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <TerminalIcon />
                  </TraceIcon>
                  <TraceTitle>Ran the type checker</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                No type errors found.
              </TraceCollapsibleContent>
            </TraceCollapsible>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  ),
};

/** Open a result by pointer and close it with the keyboard. */
export const ShouldExpandToolOutput: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", {
      name: "Ran the component tests",
    });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByText("3 tests passed. No failures."),
    ).toBeVisible();
    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await waitFor(() =>
      expect(canvas.queryByText("3 tests passed. No failures.")).toBeNull(),
    );
  },
};

/** Reach nested steps with Tab and toggle each level with Enter or Space. */
export const ShouldNavigateNestedSteps: Story = {
  ...NestedSteps,
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const summary = canvas.getByRole("button", {
      name: "Investigated the failing build 2 steps",
    });
    await userEvent.tab();
    await expect(summary).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(summary).toHaveAttribute("aria-expanded", "true");
    const step = await canvas.findByRole("button", {
      name: "Ran the type checker",
    });
    await userEvent.tab();
    await expect(step).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(step).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("No type errors found.")).toBeVisible();
    await userEvent.keyboard("{Enter}");
    await expect(step).toHaveAttribute("aria-expanded", "false");
    await waitFor(() =>
      expect(canvas.queryByText("No type errors found.")).toBeNull(),
    );
  },
};
