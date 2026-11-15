import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/bases/aria/components/ui/select";

/**
 * Displays a list of options for the user to pick from—triggered by a button.
 */
const meta: Meta<typeof Select> = {
  id: "ui-aria-select",
  title: "ui/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    "aria-label": "Produce",
    placeholder: "Select an item",
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-96">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem id="apple">Apple</SelectItem>
          <SelectItem id="banana">Banana</SelectItem>
          <SelectItem id="blueberry">Blueberry</SelectItem>
          <SelectItem id="grapes">Grapes</SelectItem>
          <SelectItem id="pineapple">Pineapple</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem id="aubergine">Aubergine</SelectItem>
          <SelectItem id="broccoli">Broccoli</SelectItem>
          <SelectItem id="carrot" isDisabled>
            Carrot
          </SelectItem>
          <SelectItem id="courgette">Courgette</SelectItem>
          <SelectItem id="leek">Leek</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Meat</SelectLabel>
          <SelectItem id="beef">Beef</SelectItem>
          <SelectItem id="chicken">Chicken</SelectItem>
          <SelectItem id="lamb">Lamb</SelectItem>
          <SelectItem id="pork">Pork</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the select.
 */
export const Default: Story = {};

/** Choose an option with the keyboard and check its selection after reopening. */
export const ShouldSelectOption: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("button", { name: /produce/i });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await body.findByRole("listbox");
    await userEvent.keyboard("{Home}{ArrowDown}{Enter}");
    await waitFor(() => expect(trigger).toHaveTextContent("Banana"));
    await waitFor(() => expect(trigger).toHaveFocus());
    await userEvent.keyboard("{Enter}");
    await waitFor(() =>
      expect(
        body.getByRole("option", { name: "Banana", selected: true }),
      ).toBeVisible(),
    );
    await expect(body.getByRole("option", { name: "Carrot" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await userEvent.keyboard("{Escape}");
  },
};
