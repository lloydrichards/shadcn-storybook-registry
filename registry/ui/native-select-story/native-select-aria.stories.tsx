import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent } from "storybook/test";

import { Label } from "@/bases/aria/components/ui/label";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/bases/aria/components/ui/native-select";

/** A browser-native select for choosing one value from a list of options. */
const meta = {
  id: "ui-aria-nativeselect",
  title: "ui/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    "aria-label": "Fruit",
    defaultValue: "apple",
    disabled: false,
    size: "default",
  },
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  ),
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Choose a fruit using the browser's native option menu. */
export const Default: Story = {};

/** Use the small size in compact forms and toolbars. */
export const Small: Story = { args: { size: "sm" } };

/** Disable the select when its value cannot be changed. */
export const Disabled: Story = { args: { disabled: true } };

/** Group related options and disable choices that are unavailable. */
export const GroupedOptions: Story = {
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOptGroup label="Fruit">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
        <NativeSelectOption value="carrot" disabled>
          Carrot (unavailable)
        </NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};

/** Associate a visible label with the select. */
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="native-select-fruit">Fruit</Label>
      <NativeSelect {...args} id="native-select-fruit" aria-label={undefined}>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

/** Mark an invalid selection and explain how to correct it. */
export const Invalid: Story = {
  args: { defaultValue: "", "aria-invalid": true },
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="native-select-required-fruit">Fruit</Label>
      <NativeSelect
        {...args}
        id="native-select-required-fruit"
        aria-label={undefined}
        aria-describedby="native-select-fruit-error"
        required
      >
        <NativeSelectOption value="" disabled>
          Select a fruit
        </NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
      <p id="native-select-fruit-error" className="text-destructive text-sm">
        Choose a fruit to continue.
      </p>
    </div>
  ),
};

/** Keep the selected value in React state to update related content. */
export const Controlled: Story = {
  render: function Render(args) {
    const [fruit, setFruit] = useState("apple");

    return (
      <div className="grid gap-2">
        <NativeSelect
          {...args}
          defaultValue={undefined}
          value={fruit}
          onChange={(event) => setFruit(event.target.value)}
        >
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        </NativeSelect>
        <p role="status" className="text-muted-foreground text-sm">
          Selected fruit: {fruit}
        </p>
      </div>
    );
  },
};

/** Changing an option updates both the select and the controlled state. */
export const ShouldChangeValue: Story = {
  ...Controlled,
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", { name: "Fruit" });
    await expect(select).toHaveValue("apple");
    await userEvent.selectOptions(select, "banana");
    await expect(select).toHaveValue("banana");
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Selected fruit: banana",
    );
    await userEvent.selectOptions(select, "blueberry");
    await expect(select).toHaveValue("blueberry");
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Selected fruit: blueberry",
    );
  },
};
