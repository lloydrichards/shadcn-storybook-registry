// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";

import { Bubble, BubbleContent } from "@/bases/radix/components/ui/bubble";
import { Button } from "@/bases/radix/components/ui/button";
import { Marker, MarkerContent } from "@/bases/radix/components/ui/marker";
import { Message, MessageContent } from "@/bases/radix/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
} from "@/bases/radix/components/ui/message-scroller";

/**
 * Provides chat transcript scrolling with anchoring, jump controls, and live-edge behavior.
 */
const meta: Meta<typeof MessageScroller> = {
  title: "ui/radix/MessageScroller",
  component: MessageScroller,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: (Story) => (
    <div className="h-96 w-full min-w-sm max-w-lg rounded-md border">
      <Story />
    </div>
  ),
} satisfies Meta<typeof MessageScroller>;

export default meta;

type Story = StoryObj<typeof meta>;

type TranscriptMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const transcript: TranscriptMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "Can you review the activation dip after workspace creation?",
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "The sharpest drop is between creating the workspace and inviting the first teammate.",
  },
  {
    id: "m3",
    role: "user",
    content: "What should I compare before we change the onboarding flow?",
  },
  {
    id: "m4",
    role: "assistant",
    content:
      "Compare template users, blank workspace users, and people who skip invites but return within 24 hours.",
  },
  {
    id: "m5",
    role: "user",
    content: "Can you turn that into an experiment?",
  },
  {
    id: "m6",
    role: "assistant",
    content:
      "Create a variant that shows a short checklist after workspace creation, then measure first invite completion and 24-hour return rate.",
  },
];

function StoryShell({
  children,
  controls,
}: {
  children: React.ReactNode;
  controls?: React.ReactNode;
}) {
  return (
    <div className="flex size-full min-h-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      {controls ? (
        <div className="shrink-0 border-t p-2">{controls}</div>
      ) : null}
    </div>
  );
}

function ScrollerSlot({ children }: { children: React.ReactNode }) {
  return <div className="size-full min-h-0 overflow-hidden">{children}</div>;
}

function RestoreMessagePosition({
  messageId,
  onRestored,
}: {
  messageId: string | null;
  onRestored: () => void;
}) {
  const { scrollToMessage } = useMessageScroller();

  React.useLayoutEffect(() => {
    if (!messageId) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      scrollToMessage(messageId, { align: "start", behavior: "auto" });
      onRestored();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messageId, onRestored, scrollToMessage]);

  return null;
}

function TranscriptMessage({ message }: { message: TranscriptMessage }) {
  const isUser = message.role === "user";

  return (
    <Message align={isUser ? "end" : "start"}>
      <MessageContent>
        <Bubble variant={isUser ? "default" : "secondary"}>
          <BubbleContent>{message.content}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}

function Transcript({
  messages = transcript,
  anchorRole = "user",
}: {
  messages?: TranscriptMessage[];
  anchorRole?: TranscriptMessage["role"];
}) {
  return (
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent>
          {messages.map((message) => (
            <MessageScrollerItem
              key={message.id}
              messageId={message.id}
              scrollAnchor={message.role === anchorRole}
            >
              <TranscriptMessage message={message} />
            </MessageScrollerItem>
          ))}
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  );
}

/**
 * The default transcript scrolls within a height-constrained container.
 */
export const Default: Story = {
  render: () => (
    <MessageScrollerProvider>
      <Transcript />
    </MessageScrollerProvider>
  ),
};

/**
 * Anchor new turns to user messages so the prompt starts near the top edge.
 */
export const AnchoringTurns: Story = {
  render: () => {
    const [messages, setMessages] = React.useState(transcript.slice(0, 2));

    return (
      <StoryShell
        controls={
          <Button
            size="sm"
            onClick={() =>
              setMessages((current) => [
                ...current,
                {
                  id: `user-${current.length}`,
                  role: "user",
                  content: "What should we inspect next?",
                },
                {
                  id: `assistant-${current.length}`,
                  role: "assistant",
                  content: "Start with the story coverage and registry output.",
                },
              ])
            }
          >
            Send Message
          </Button>
        }
      >
        <ScrollerSlot>
          <MessageScrollerProvider autoScroll>
            <Transcript messages={messages} />
          </MessageScrollerProvider>
        </ScrollerSlot>
      </StoryShell>
    );
  },
};

/**
 * Auto-scroll follows the live edge while a scripted response streams in.
 */
export const Streaming: Story = {
  render: () => {
    const [reply, setReply] = React.useState("Ready to stream.");

    return (
      <StoryShell
        controls={
          <Button
            size="sm"
            onClick={() =>
              setReply(
                "Streaming is simulated. The reply grows while the scroller keeps the live edge in view.",
              )
            }
          >
            Send
          </Button>
        }
      >
        <ScrollerSlot>
          <MessageScrollerProvider autoScroll>
            <Transcript
              messages={[
                ...transcript.slice(0, 3),
                {
                  id: "streaming",
                  role: "assistant",
                  content: reply,
                },
              ]}
            />
          </MessageScrollerProvider>
        </ScrollerSlot>
      </StoryShell>
    );
  },
};

/**
 * Open a saved transcript at the last anchored turn.
 */
export const OpeningPosition: Story = {
  render: () => (
    <MessageScrollerProvider defaultScrollPosition="last-anchor">
      <Transcript />
    </MessageScrollerProvider>
  ),
};

/**
 * Prepend earlier messages without moving the reader away from the visible row.
 */
export const LoadHistory: Story = {
  render: () => {
    const earlier: TranscriptMessage[] = [
      {
        id: "h1",
        role: "user",
        content: "Did the deploy include billing changes?",
      },
      {
        id: "h2",
        role: "assistant",
        content: "No. The app deploy only changed the export queue worker.",
      },
    ];
    const [messages, setMessages] = React.useState(transcript.slice(2));
    const [restoreMessageId, setRestoreMessageId] = React.useState<
      string | null
    >(null);
    const restoreComplete = React.useCallback(() => {
      setRestoreMessageId(null);
    }, []);

    return (
      <MessageScrollerProvider defaultScrollPosition="start">
        <StoryShell
          controls={
            <Button
              size="sm"
              onClick={() => {
                setRestoreMessageId(messages[0]?.id ?? null);
                setMessages((current) => [...earlier, ...current]);
              }}
            >
              Load History
            </Button>
          }
        >
          <ScrollerSlot>
            <Transcript messages={messages} />
            <RestoreMessagePosition
              messageId={restoreMessageId}
              onRestored={restoreComplete}
            />
          </ScrollerSlot>
        </StoryShell>
      </MessageScrollerProvider>
    );
  },
};

function JumpControls() {
  const { scrollToMessage, scrollToEnd } = useMessageScroller();
  const [status, setStatus] = React.useState("Ready to jump");

  function jumpTo(messageId: string, label: string) {
    const didScroll = scrollToMessage(messageId, { align: "start" });
    setStatus(didScroll ? `Jumped to ${label}` : `${label} is not available`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b p-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => jumpTo("m1", "first message")}
      >
        First
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => jumpTo("m5", "latest question")}
      >
        Latest Question
      </Button>
      <Button
        size="sm"
        onClick={() => {
          const didScroll = scrollToEnd();
          setStatus(didScroll ? "Jumped to end" : "Already at end");
        }}
      >
        End
      </Button>
      <Marker variant="separator" className="ml-auto">
        <MarkerContent>{status}</MarkerContent>
      </Marker>
    </div>
  );
}

/**
 * Use external controls to jump to stable message ids.
 */
export const JumpToMessage: Story = {
  render: () => (
    <MessageScrollerProvider>
      <div className="flex size-full min-h-0 flex-col overflow-hidden">
        <JumpControls />
        <div className="min-h-0 flex-1 overflow-hidden">
          <Transcript />
        </div>
      </div>
    </MessageScrollerProvider>
  ),
};

function ScrollStatus() {
  const scrollable = useMessageScrollerScrollable();

  return (
    <Marker>
      <MarkerContent>
        {scrollable.start || scrollable.end
          ? "More transcript content is available."
          : "All messages fit in the viewport."}
      </MarkerContent>
    </Marker>
  );
}

/**
 * Read scroll state for custom status text or controls.
 */
export const ScrollState: Story = {
  render: () => (
    <MessageScrollerProvider>
      <div className="flex size-full min-h-0 flex-col overflow-hidden">
        <div className="shrink-0 border-b p-2">
          <ScrollStatus />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          <Transcript />
        </div>
      </div>
    </MessageScrollerProvider>
  ),
};

/**
 * Verify external controls can scroll to the latest transcript turn.
 */
export const ScrollToLatest: Story = {
  tags: ["!dev", "!autodocs"],
  render: () => (
    <MessageScrollerProvider>
      <div className="flex size-full min-h-0 flex-col overflow-hidden">
        <JumpControls />
        <div className="min-h-0 flex-1 overflow-hidden">
          <Transcript />
        </div>
      </div>
    </MessageScrollerProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const endButton = canvas.getByRole("button", { name: "End" });

    await userEvent.click(endButton);
    expect(endButton).toHaveFocus();
  },
};

/**
 * Verify loading history preserves the visible transcript position.
 */
export const PrependHistoryPreservesPosition: Story = {
  tags: ["!dev", "!autodocs"],
  render: LoadHistory.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", { name: /load history/i }),
    );
    expect(canvas.getByText(/billing changes/i)).toBeInTheDocument();
  },
};
