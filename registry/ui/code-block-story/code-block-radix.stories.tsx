import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/bases/radix/components/ui/code-block";
import { useHighlightedCode } from "@/bases/radix/hooks/use-highlighted-code";

const source = 'const message = "Hello, world!";\nconsole.log(message);';

/** Display source code, terminal output, and diffs, with optional copying and syntax highlighting. */
const meta = {
  title: "ui/radix/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { className: "w-[min(36rem,calc(100vw-2rem))]" },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockHeader>
        <CodeBlockTitle>hello.ts</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={source} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{source}</CodeBlockContent>
    </CodeBlock>
  ),
} satisfies Meta<typeof CodeBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Show a plain code snippet with a title and copy action. */
export const Default: Story = {};

/** Add line numbers and choose the first number for a source excerpt. */
export const LineNumbers: Story = {
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockContent lineNumbers startLine={12}>
        {source}
      </CodeBlockContent>
    </CodeBlock>
  ),
};

/** Wrap long output within the container on narrow screens. */
export const Wrapped: Story = {
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockContent wrap>
        {
          "GET /api/components?registry=base&category=storybook&include=dependencies&format=json returned 200 OK after loading the requested component examples."
        }
      </CodeBlockContent>
    </CodeBlock>
  ),
};

/** Present a terminal command and its deterministic output. */
export const TerminalOutput: Story = {
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockHeader>
        <CodeBlockTitle>Terminal</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent>
        {"$ bun run build\nCompiled successfully\nGenerated static pages"}
      </CodeBlockContent>
      <CodeBlockFooter>Process exited with code 0</CodeBlockFooter>
    </CodeBlock>
  ),
};

/** Mark removed and added lines when reviewing a change. */
export const Diff: Story = {
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockHeader>
        <CodeBlockTitle>greeting.ts</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        <CodeBlockLine>{"function greet(name: string) {"}</CodeBlockLine>
        <CodeBlockLine variant="removed">
          {'  return "Hello " + name;'}
        </CodeBlockLine>
        <CodeBlockLine variant="added">
          {"  return `Hello, ${name}!`;"}
        </CodeBlockLine>
        <CodeBlockLine>{"}"}</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  ),
};

function HighlightedExample() {
  const lines = useHighlightedCode(source, "typescript");
  return (
    <CodeBlock className="w-[min(36rem,calc(100vw-2rem))]">
      <CodeBlockHeader>
        <CodeBlockTitle>hello.ts</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  );
}

/** Load the optional Shiki highlighter, retaining plain text while the language loads. */
export const SyntaxHighlighted: Story = {
  render: () => <HighlightedExample />,
  play: async ({ canvasElement }) => {
    const code = canvasElement.querySelector("code");
    if (!code) throw new Error("Highlighted code is missing");
    await expect(code).toHaveTextContent('const message = "Hello, world!";');
    await expect(code).toHaveTextContent("console.log(message);");
    await waitFor(
      () => {
        const tokens = Array.from(code.querySelectorAll("span[style]"));
        const coloredTokens = tokens.filter((token) => {
          const style = (token as HTMLElement).style;
          return (
            style.getPropertyValue("--shiki-light") &&
            style.getPropertyValue("--shiki-dark")
          );
        });
        expect(coloredTokens.length).toBeGreaterThan(0);
        expect(
          coloredTokens.some((token) => token.textContent?.includes("const")),
        ).toBe(true);
      },
      { timeout: 10000 },
    );
  },
};

/** Use the destructive variant for an error message or failed command. */
export const ErrorOutput: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockContent wrap>
        {
          'Error: Missing registry component "example".\nCheck the component name and try again.'
        }
      </CodeBlockContent>
    </CodeBlock>
  ),
};

/** Use the small size for compact snippets. */
export const Small: Story = { args: { size: "sm" } };

/** Copy exact source text and announce success after the clipboard write resolves. */
export const ShouldCopySource: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clipboard =
      canvasElement.ownerDocument.defaultView?.navigator.clipboard;
    if (!clipboard) throw new Error("Clipboard API is unavailable");
    const original = Object.getOwnPropertyDescriptor(clipboard, "writeText");
    const writeText =
      fn<(value: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.defineProperty(clipboard, "writeText", {
      configurable: true,
      value: writeText,
    });
    try {
      await userEvent.click(canvas.getByRole("button", { name: "Copy" }));
      await expect(writeText).toHaveBeenCalledTimes(1);
      await expect(writeText).toHaveBeenCalledWith(source);
      await expect(
        await canvas.findByRole("button", { name: "Copied" }),
      ).toBeVisible();
      await expect(canvas.getByText("Copied")).toHaveAttribute(
        "aria-live",
        "polite",
      );
    } finally {
      if (original) Object.defineProperty(clipboard, "writeText", original);
      else Reflect.deleteProperty(clipboard, "writeText");
    }
  },
};
