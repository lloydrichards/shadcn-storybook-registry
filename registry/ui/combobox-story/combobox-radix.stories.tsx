import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/bases/radix/components/ui/combobox";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

/** Search a list of suggestions and select one or more values. Both registry variants use the Base UI combobox primitive. */
const meta = {
  id: "ui-radix-combobox",
  title: "ui/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  render: (args) => (
    <Combobox {...args} items={frameworks}>
      <ComboboxInput
        aria-label="Framework"
        placeholder="Select a framework"
        className="w-72"
      />
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item} disabled={item === "Nuxt.js"}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Search the frameworks, with Nuxt.js unavailable for selection. */
export const Default: Story = {};

/** Disable the combobox when the selection cannot be changed. */
export const Disabled: Story = { args: { disabled: true } };

/** Start with a selection and let the user clear it. */
export const WithClear: Story = {
  render: () => (
    <Combobox items={frameworks} defaultValue="Next.js">
      <ComboboxInput
        aria-label="Framework"
        placeholder="Select a framework"
        showTrigger={false}
        className="w-72"
      >
        <ComboboxPrimitive.Clear
          aria-label="Clear selection"
          className="px-2 text-xs"
        >
          Clear
        </ComboboxPrimitive.Clear>
      </ComboboxInput>
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

function MultipleExample() {
  const [value, setValue] = useState<string[]>(["Next.js"]);
  const anchor = useComboboxAnchor();

  return (
    <Combobox
      items={frameworks}
      multiple
      value={value}
      onValueChange={setValue}
    >
      <ComboboxChips ref={anchor} className="w-80">
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item} showRemove={false}>
              {item}
              <ComboboxPrimitive.ChipRemove
                aria-label="Remove selection"
                className="px-1"
              >
                ×
              </ComboboxPrimitive.ChipRemove>
            </ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput
          aria-label="Frameworks"
          placeholder="Add a framework"
        />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

/** Select several frameworks and remove individual selections with their chip buttons. */
export const Multiple: Story = { render: () => <MultipleExample /> };

/** Searching narrows the suggestions and selecting an option updates the input. */
export const ShouldSearchAndSelect: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const input = canvas.getByRole("combobox", { name: "Framework" });
    await userEvent.type(input, "sve");
    await userEvent.click(
      await body.findByRole("option", { name: "SvelteKit" }),
    );
    await expect(input).toHaveValue("SvelteKit");
    await expect(input).toHaveAttribute("aria-expanded", "false");
  },
};

/** An unmatched search explains that there are no suggestions. */
export const ShouldShowEmptyResults: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("combobox", {
      name: "Framework",
    });
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.type(input, "unavailable framework");
    await expect(await body.findByText("No frameworks found.")).toBeVisible();
    await expect(body.queryByRole("option")).not.toBeInTheDocument();
  },
};

/** Arrow keys select a suggestion, and Escape dismisses the reopened list. */
export const ShouldNavigateWithKeyboard: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("combobox", {
      name: "Framework",
    });
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(input).toHaveValue("Next.js");
    await userEvent.keyboard("{ArrowDown}");
    await expect(input).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{Escape}");
    await expect(input).toHaveAttribute("aria-expanded", "false");
    await expect(input).toHaveValue("Next.js");
  },
};

/** Clearing removes the selected value and returns the input to its placeholder. */
export const ShouldClearSelection: Story = {
  ...WithClear,
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Framework" });
    await expect(input).toHaveValue("Next.js");
    await userEvent.click(
      canvas.getByRole("button", { name: "Clear selection" }),
    );
    await expect(input).toHaveValue("");
  },
};

/** Multiple selection adds a chip, and its remove button removes only that value. */
export const ShouldAddAndRemoveSelection: Story = {
  ...Multiple,
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.type(
      canvas.getByRole("combobox", { name: "Frameworks" }),
      "sve",
    );
    await userEvent.click(
      await body.findByRole("option", { name: "SvelteKit" }),
    );
    await expect(canvas.getByText("SvelteKit")).toBeVisible();
    await userEvent.click(
      within(canvas.getByText("SvelteKit")).getByRole("button", {
        name: "Remove selection",
      }),
    );
    await waitFor(() =>
      expect(canvas.queryByText("SvelteKit")).not.toBeInTheDocument(),
    );
    await expect(canvas.getByText("Next.js")).toBeVisible();
  },
};
