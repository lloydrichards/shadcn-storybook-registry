import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/bases/base/components/ui/questionnaire";

type QuestionnaireAnswers = {
  approach: FormDataEntryValue | null;
  checks: FormDataEntryValue[];
  timing: FormDataEntryValue | null;
};

type QuestionnaireStoryArgs = React.ComponentProps<typeof Questionnaire> & {
  onAnswersSubmit: (answers: QuestionnaireAnswers) => void;
};

const items = [
  {
    name: "approach",
    required: true,
    choices: [
      { value: "smallest" },
      { value: "incremental" },
      { value: "replace" },
    ],
  },
  {
    name: "checks",
    choices: [{ value: "tests" }, { value: "types" }, { value: "visual" }],
  },
  {
    name: "timing",
    required: true,
    choices: [{ value: "now" }, { value: "cycle" }, { value: "backlog" }],
  },
] as const;

const submissionItems = [items[2]] as const;

/**
 * A multi-step questionnaire with fixed, multiple-choice, and freeform answers.
 */
const meta = {
  title: "ui/base/Questionnaire",
  component: Questionnaire,
  tags: ["autodocs"],
  argTypes: {
    className: { control: false },
    items: { control: false },
    onAnswersSubmit: { table: { disable: true } },
    onSubmit: { control: false },
    shortcuts: {
      control: "inline-radio",
      options: ["letters", "numbers"],
    },
  },
  parameters: { layout: "centered" },
  decorators: (Story) => (
    <div className="w-full min-w-sm max-w-lg">
      <Story />
    </div>
  ),
  args: { onAnswersSubmit: fn(), shortcuts: "letters" },
  render: ({ onAnswersSubmit, shortcuts = "letters", ...props }) => {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      onAnswersSubmit({
        approach: formData.get("approach"),
        checks: formData.getAll("checks"),
        timing: formData.get("timing"),
      });
    }

    return (
      <Questionnaire
        {...props}
        className="w-full max-w-lg"
        items={items}
        shortcuts={shortcuts}
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        <QuestionnaireItem name="approach" required>
          <QuestionnaireTitle>
            How should we approach this change?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose a strategy or describe a more specific approach.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="smallest">
              <span className="font-medium">Make the smallest safe change</span>
              <QuestionnaireChoiceDescription>
                Keep the implementation focused on the requested behavior.
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="incremental">
              Refactor one module at a time
            </QuestionnaireChoice>
            <QuestionnaireChoice value="replace">
              Replace the implementation completely
            </QuestionnaireChoice>
            <QuestionnaireInput
              aria-label="Another approach"
              placeholder="Describe another approach…"
            />
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem name="checks" multiple>
          <QuestionnaireTitle>
            What should be checked before handoff?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Select every relevant check, or skip this optional question.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="tests">Tests</QuestionnaireChoice>
            <QuestionnaireChoice value="types">
              Type checking
            </QuestionnaireChoice>
            <QuestionnaireChoice value="visual">
              Visual review
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem name="timing" required>
          <QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose when the implementation should start.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="now">Start now</QuestionnaireChoice>
            <QuestionnaireChoice value="cycle">
              Next development cycle
            </QuestionnaireChoice>
            <QuestionnaireChoice value="backlog">
              Add it to the backlog
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
          <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    );
  },
} satisfies Meta<QuestionnaireStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Combines required and optional questions in one navigable flow. */
export const Default: Story = {};

/** Starts on the optional step to demonstrate multiple selection and skipping. */
export const MultipleChoice: Story = {
  args: {
    defaultItem: "checks",
  },
};

/** Demonstrates required validation and submission in a focused one-step flow. */
export const Submission: Story = {
  render: ({ onAnswersSubmit, shortcuts = "letters" }) => {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      onAnswersSubmit({
        approach: null,
        checks: [],
        timing: formData.get("timing"),
      });
    }

    return (
      <Questionnaire
        className="w-full max-w-lg"
        items={submissionItems}
        shortcuts={shortcuts}
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        <QuestionnaireItem name="timing" required>
          <QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose when the implementation should start.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="now">Start now</QuestionnaireChoice>
            <QuestionnaireChoice value="cycle">
              Next development cycle
            </QuestionnaireChoice>
            <QuestionnaireChoice value="backlog">
              Add it to the backlog
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    );
  },
};

/** Verifies validation, navigation, answer preservation, and submission. */
export const ShouldValidateNavigateAndSubmit: Story = {
  name: "when completing a questionnaire, should preserve and submit answers",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvas, step }) => {
    const nextButton = canvas.getByRole("button", { name: "Next" });

    await step("validate the required first question", async () => {
      await userEvent.click(nextButton);
      await expect(canvas.getByRole("alert")).toHaveTextContent(
        "Choose an answer to continue.",
      );
    });

    await step("enter a freeform answer and continue with Enter", async () => {
      const input = canvas.getByRole("textbox", { name: "Another approach" });
      await userEvent.type(input, "Keep the public API stable");
      await userEvent.keyboard("{Enter}");
      await expect(
        canvas.getByRole("group", {
          name: "What should be checked before handoff?",
        }),
      ).toBeVisible();
    });

    await step("select multiple answers", async () => {
      await userEvent.click(canvas.getByRole("checkbox", { name: "Tests" }));
      await userEvent.click(
        canvas.getByRole("checkbox", { name: "Visual review" }),
      );
    });

    await step("navigate back and preserve every answer", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Previous" }));
      await expect(
        canvas.getByRole("textbox", { name: "Another approach" }),
      ).toHaveValue("Keep the public API stable");
      await userEvent.click(nextButton);
      await expect(
        canvas.getByRole("checkbox", { name: "Tests" }),
      ).toBeChecked();
      await expect(
        canvas.getByRole("checkbox", { name: "Visual review" }),
      ).toBeChecked();
      await userEvent.click(nextButton);
    });

    await step("submit the collected answers", async () => {
      await userEvent.click(canvas.getByRole("radio", { name: "Start now" }));
      await userEvent.click(canvas.getByRole("button", { name: "Save plan" }));
      await expect(args.onAnswersSubmit).toHaveBeenCalledWith({
        approach: "Keep the public API stable",
        checks: ["tests", "visual"],
        timing: "now",
      });
    });
  },
};

/** Verifies keyboard selection and explicitly skipping an optional question. */
export const ShouldSkipOptionalQuestion: Story = {
  name: "when skipping an optional question, should submit no answer for it",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvas, step }) => {
    await step("answer the required first question", async () => {
      const firstQuestion = canvas.getByRole("group", {
        name: "How should we approach this change?",
      });
      const firstAnswer = canvas.getByRole("radio", {
        name: /Make the smallest safe change/,
      });

      firstQuestion.focus();
      await userEvent.keyboard("a");
      await expect(firstAnswer).toBeChecked();
      await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    });

    await step("skip the optional question", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Skip" }));
      await expect(
        canvas.getByRole("group", { name: "When should work begin?" }),
      ).toBeVisible();
    });

    await step("submit without an optional answer", async () => {
      await userEvent.click(
        canvas.getByRole("radio", { name: "Next development cycle" }),
      );
      await userEvent.click(canvas.getByRole("button", { name: "Save plan" }));
      await expect(args.onAnswersSubmit).toHaveBeenCalledWith({
        approach: "smallest",
        checks: [],
        timing: "cycle",
      });
    });
  },
};
