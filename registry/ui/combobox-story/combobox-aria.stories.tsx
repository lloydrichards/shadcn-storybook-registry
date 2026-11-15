import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Combobox,
  ComboboxChip,
  ComboboxChipList,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/bases/aria/components/ui/combobox";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

function FrameworkPicker({
  isDisabled = false,
  showClear = false,
}: {
  isDisabled?: boolean;
  showClear?: boolean;
}) {
  return (
    <Combobox
      aria-label="Framework"
      allowsEmptyCollection
      isDisabled={isDisabled}
      defaultValue={showClear ? frameworks[0] : undefined}
    >
      <ComboboxInput placeholder="Select a framework" showClear={showClear} />
      <ComboboxContent>
        <ComboboxList
          renderEmptyState={() => (
            <ComboboxEmpty>No items found.</ComboboxEmpty>
          )}
        >
          {frameworks.map((item) => (
            <ComboboxItem key={item} id={item} textValue={item}>
              {item}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function ComboboxMultiple() {
  return (
    <Combobox
      aria-label="Frameworks"
      selectionMode="multiple"
      defaultValue={[frameworks[0]]}
      allowsEmptyCollection
    >
      <ComboboxChips>
        <ComboboxChipList<{ name: string }>>
          {(value) => (
            <ComboboxChip id={value.name} textValue={value.name}>
              {value.name}
            </ComboboxChip>
          )}
        </ComboboxChipList>
        <ComboboxChipsInput />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxList
          renderEmptyState={() => (
            <ComboboxEmpty>No items found.</ComboboxEmpty>
          )}
        >
          {frameworks.map((item) => (
            <ComboboxItem
              key={item}
              id={item}
              textValue={item}
              value={{ name: item }}
            >
              {item}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

/** Search a list of choices and select one or more matching items. */
const meta = {
  id: "ui-aria-combobox",
  title: "ui/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  render: () => <FrameworkPicker />,
} satisfies Meta<typeof Combobox>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Search a list of choices and select one or more matching items. */
export const Default: Story = {};

/** Disable the framework picker. */
export const Disabled: Story = { render: () => <FrameworkPicker isDisabled /> };

/** Clear the selected framework with the reset button. */
export const WithClear: Story = { render: () => <FrameworkPicker showClear /> };

/** Display selected frameworks as removable chips. */
export const Multiple: Story = { render: () => <ComboboxMultiple /> };

/** Filter frameworks and select the matching option. */
export const ShouldSearchAndSelect: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, canvas }) => {
    const input = canvas.getByRole("combobox", { name: "Framework" });
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.type(input, "Svelt");
    const option = await body.findByRole("option", { name: "SvelteKit" });
    await expect(body.getAllByRole("option")).toHaveLength(1);
    await userEvent.click(option);
    await waitFor(() => expect(input).toHaveValue("SvelteKit"));
    await expect(input).toHaveAttribute("aria-expanded", "false");
  },
};

/** Clear a preselected framework. */
export const ShouldClearSelection: Story = {
  ...WithClear,
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox", { name: "Framework" });
    await expect(input).toHaveValue("Next.js");
    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(input).toHaveValue("");
  },
};

/** Remove a selected framework without disturbing another chip. */
export const ShouldAddAndRemoveSelection: Story = {
  ...Multiple,
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, canvasElement }) => {
    const input = canvas.getByRole("combobox", { name: "Frameworks" });
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.type(input, "Svelt");
    await userEvent.click(
      await body.findByRole("option", { name: "SvelteKit" }),
    );
    await userEvent.keyboard("{Escape}");
    await userEvent.click(
      await canvas.findByRole("button", { name: /remove SvelteKit/i }),
    );
    await waitFor(() =>
      expect(
        canvas.queryByRole("button", { name: /remove SvelteKit/i }),
      ).not.toBeInTheDocument(),
    );
    await expect(
      canvas.getByRole("button", { name: /remove Next.js/i }),
    ).toBeVisible();
  },
};

/** Use the arrow key to open the list and Enter to select the focused framework. */
export const ShouldNavigateWithKeyboard: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, canvasElement }) => {
    const input = canvas.getByRole("combobox", { name: "Framework" });
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    const option = await within(canvasElement.ownerDocument.body).findByRole(
      "option",
      { name: "Next.js" },
    );
    await waitFor(() =>
      expect(input).toHaveAttribute("aria-activedescendant", option.id),
    );
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(input).toHaveValue("Next.js"));
    await expect(input).toHaveAttribute("aria-expanded", "false");
  },
};
