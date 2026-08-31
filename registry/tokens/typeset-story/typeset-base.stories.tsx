import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";
import { expect, userEvent, waitFor } from "storybook/test";

import { Button } from "@/bases/base/components/ui/button";

import "./typeset.css";

/**
 * Applies shadcn Typeset rhythm to semantic HTML and rendered Markdown.
 *
 * This registry adopts Typeset as paired Base UI and Radix UI Storybook
 * stories. The bundled `typeset.css` supports these stories and is not a
 * standalone application distribution. Applications should generate and own
 * their CSS with the [shadcn Typeset builder](https://ui.shadcn.com/typeset),
 * then import it after Tailwind.
 *
 * Typeset inherits theme colors, fonts, and radius. Use `--typeset-size`,
 * `--typeset-leading`, and `--typeset-flow` to control its rhythm; the
 * surrounding layout owns its measure.
 */
const meta = {
  title: "design/base/Typeset",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: (Story) => (
    <div className="w-full min-w-sm max-w-2xl px-6">
      <Story />
    </div>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const getPresentation = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  const bounds = element.getBoundingClientRect();

  return {
    backgroundColor: style.backgroundColor,
    borderBlockEnd: style.borderBlockEnd,
    borderBlockStart: style.borderBlockStart,
    color: style.color,
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    height: bounds.height,
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
    marginBlockEnd: style.marginBlockEnd,
    marginBlockStart: style.marginBlockStart,
    paddingBlockEnd: style.paddingBlockEnd,
    paddingBlockStart: style.paddingBlockStart,
    width: bounds.width,
  };
};

/**
 * Shows headings, lists, quotes, code, and tables under one reading rhythm.
 * This complements the Typography stories, which document raw tokens.
 */
export const Documentation: Story = {
  render: () => (
    <article className="typeset typeset-docs">
      <h1>Build a registry people can trust</h1>
      <p>
        A useful registry shows how components behave, explains their purpose,
        and keeps the installed source easy to own.
      </p>
      <h2>Review the important states</h2>
      <p>
        Start with the common path, then include the boundaries a consumer is
        likely to encounter.
      </p>
      <ul>
        <li>Use semantic HTML for meaningful structure.</li>
        <li>Keep examples small enough to understand at a glance.</li>
        <li>
          Verify interactive states with focused <code>play</code> tests.
        </li>
      </ul>
      <blockquote>
        <p>A story is documentation that can prove its own behavior.</p>
      </blockquote>
      <pre>
        <code>{`bun run test:storybook\nbun run registry:build`}</code>
      </pre>
      <table>
        <thead>
          <tr>
            <th>Surface</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Typography</td>
            <td>Raw design tokens</td>
          </tr>
          <tr>
            <td>Typeset</td>
            <td>Rendered content rhythm</td>
          </tr>
        </tbody>
      </table>
    </article>
  ),
};

/** Keep wide semantic tables readable with an opt-in horizontal scroller. */
export const ResponsiveTable: Story = {
  render: () => (
    <article className="typeset typeset-docs">
      <h2>Release compatibility</h2>
      <p>
        Wrap a wide table in <code>typeset-scroll</code> when preserving every
        column is more useful than allowing the cells to compress.
      </p>
      <div className="typeset-scroll max-w-lg" data-testid="table-scroller">
        <table>
          <thead>
            <tr>
              <th>Release</th>
              <th>React</th>
              <th>Tailwind</th>
              <th>Storybook</th>
              <th>Browser tests</th>
              <th>Registry format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Current</td>
              <td>19.2</td>
              <td>4.3</td>
              <td>10.4</td>
              <td>Playwright</td>
              <td>v3 JSON</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  ),
  play: async ({ canvas }) => {
    const scroller = canvas.getByTestId("table-scroller");
    await expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth);
    await expect(canvas.getByRole("table")).toBeVisible();
  },
};

function ChatExample() {
  const [continued, setContinued] = useState(false);

  return (
    <div className="w-full rounded-xl border bg-muted/30 p-4">
      <div className="typeset typeset-chat" data-testid="chat-content">
        <p data-testid="existing-block">
          Typeset uses forward-only spacing so streamed content can be appended
          without changing blocks already on screen.
        </p>
        {continued ? (
          <p>
            This paragraph arrived later, while the first paragraph kept the
            same computed presentation.
          </p>
        ) : null}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        disabled={continued}
        onClick={() => setContinued(true)}
      >
        {continued ? "Response continued" : "Continue response"}
      </Button>
    </div>
  );
}

/** Manually append another response block to the conversation. */
export const Chat: Story = {
  render: () => <ChatExample />,
};

const streamedResponse =
  "New text arrives a few characters at a time while the completed paragraph above stays visually stable.";

function StreamingText({
  intervalMs = 35,
  startDelay = 400,
}: {
  intervalMs?: number;
  startDelay?: number;
}) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setLength((current) => {
          if (current >= streamedResponse.length) {
            window.clearInterval(interval);
            return current;
          }

          return current + 1;
        });
      }, intervalMs);
    }, startDelay);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [intervalMs, startDelay]);

  return (
    <p>
      <span aria-hidden="true" data-testid="streamed-text">
        {streamedResponse.slice(0, length)}
        {length < streamedResponse.length ? (
          <span className="animate-pulse">▍</span>
        ) : null}
      </span>
      <span className="sr-only" aria-live="polite">
        {length < streamedResponse.length
          ? "Response is streaming"
          : streamedResponse}
      </span>
    </p>
  );
}

function StreamingExample({
  intervalMs,
  startDelay,
}: {
  intervalMs?: number;
  startDelay?: number;
}) {
  const [run, setRun] = useState(0);

  return (
    <div className="w-full rounded-xl border bg-muted/30 p-4">
      <div className="typeset typeset-chat">
        <p>
          Typeset keeps completed blocks stable while a response is still
          arriving.
        </p>
        <StreamingText
          key={run}
          intervalMs={intervalMs}
          startDelay={startDelay}
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => setRun((current) => current + 1)}
      >
        Replay stream
      </Button>
    </div>
  );
}

/** Preview a response arriving over time with story-only timing. */
export const Streaming: Story = {
  render: () => <StreamingExample />,
};

/** Verify appending a response does not restyle completed content. */
export const ShouldPreserveExistingContentWhenAppendingResponse: Story = {
  name: "should preserve existing chat content when appending a response",
  tags: ["!dev", "!autodocs"],
  render: () => <ChatExample />,
  play: async ({ canvas }) => {
    const existingBlock = canvas.getByTestId("existing-block");
    const presentation = getPresentation(existingBlock);

    await userEvent.click(
      canvas.getByRole("button", { name: "Continue response" }),
    );
    await canvas.findByText(/This paragraph arrived later/);

    await expect(getPresentation(existingBlock)).toEqual(presentation);
  },
};

/** Verify timed content completes and restarts when replayed. */
export const ShouldRestartStreamingWhenReplayed: Story = {
  name: "should restart streaming when replayed",
  tags: ["!dev", "!autodocs"],
  render: () => <StreamingExample intervalMs={1} startDelay={50} />,
  play: async ({ canvas }) => {
    const streamedText = canvas.getByTestId("streamed-text");

    await waitFor(
      () => expect(streamedText).toHaveTextContent(streamedResponse),
      { timeout: 2_000 },
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Replay stream" }),
    );
    const replayedText = canvas.getByTestId("streamed-text");
    await waitFor(() => expect(replayedText).toHaveTextContent("▍"));
    await waitFor(
      () => expect(replayedText).toHaveTextContent(streamedResponse),
      { timeout: 2_000 },
    );
  },
};

/** Opt a component subtree out with a class or data attribute. */
export const EscapeHatch: Story = {
  render: () => (
    <article className="typeset typeset-docs">
      <h2>Mix prose with application UI</h2>
      <p>Typeset styles this paragraph as part of the surrounding document.</p>
      <div className="not-typeset mt-6 rounded-lg border bg-muted p-4">
        <p className="font-medium text-sm">Class-based opt-out</p>
        <p className="mt-1 text-muted-foreground text-sm">
          This entire subtree keeps its component-owned spacing and typography.
        </p>
      </div>
      <div data-not-typeset className="mt-4 rounded-lg border bg-muted p-4">
        <p className="font-medium text-sm">Attribute-based opt-out</p>
        <div className="typeset mt-1 text-muted-foreground text-sm">
          A nested typeset container stays opted out with the rest of this
          subtree.
        </div>
      </div>
    </article>
  ),
};
