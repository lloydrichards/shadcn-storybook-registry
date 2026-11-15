import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import type { DateRange } from "react-aria-components";
import { Button } from "@/bases/aria/components/ui/button";
import { Calendar, RangeCalendar } from "@/bases/aria/components/ui/calendar";
import { Field, FieldLabel } from "@/bases/aria/components/ui/field";
import { Popover, PopoverTrigger } from "@/bases/aria/components/ui/popover";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

function DatePickerSimple() {
  const [date, setDate] = React.useState<CalendarDate | null>(null);

  return (
    <Field className="mx-auto w-72">
      <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
      <PopoverTrigger>
        <Button
          variant="outline"
          id="date-picker-simple"
          className="justify-start px-2.5 font-normal"
        >
          <CalendarIcon data-icon="inline-start" />
          {date ? (
            date
              .toDate(getLocalTimeZone())
              .toLocaleDateString(undefined, { dateStyle: "long" })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
        <Popover className="w-auto p-0" placement="bottom start">
          <Calendar value={date} onChange={setDate} />
        </Popover>
      </PopoverTrigger>
    </Field>
  );
}

function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    start: new CalendarDate(new Date().getFullYear(), 1, 20),
    end: new CalendarDate(new Date().getFullYear(), 1, 20).add({ days: 20 }),
  });

  return (
    <Field className="mx-auto w-72">
      <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
      <PopoverTrigger>
        <Button
          variant="outline"
          id="date-picker-range"
          className="justify-start px-2.5 font-normal"
        >
          <CalendarIcon data-icon="inline-start" />
          {date?.start && date.end ? (
            new Intl.DateTimeFormat(undefined, {
              dateStyle: "long",
            }).formatRange(
              date.start.toDate(getLocalTimeZone()),
              date.end.toDate(getLocalTimeZone()),
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
        <Popover className="w-auto p-0" placement="bottom start">
          <RangeCalendar value={date} onChange={setDate} numberOfMonths={2} />
        </Popover>
      </PopoverTrigger>
    </Field>
  );
}

function DatePickerWithDropdowns() {
  const [date, setDate] = React.useState<CalendarDate | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <Field className="mx-auto w-72">
      <FieldLabel htmlFor="date-picker-with-dropdowns-desktop">Date</FieldLabel>
      <PopoverTrigger isOpen={open} onOpenChange={setOpen}>
        <Button
          variant="outline"
          id="date-picker-with-dropdowns-desktop"
          className="justify-start px-2.5 font-normal"
        >
          {date ? (
            date
              .toDate(getLocalTimeZone())
              .toLocaleDateString(undefined, { dateStyle: "long" })
          ) : (
            <span>Pick a date</span>
          )}
          <ChevronDownIcon data-icon="inline-start" className="ml-auto" />
        </Button>
        <Popover className="w-auto p-0" placement="bottom start">
          <Calendar value={date} onChange={setDate} captionLayout="dropdown" />
          <div className="flex gap-2 border-t p-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onPress={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </Popover>
      </PopoverTrigger>
    </Field>
  );
}

/** Choose a date from a calendar opened by a button. */
const meta = {
  id: "ui-aria-datepicker",
  title: "ui/DatePicker",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  render: () => <DatePickerSimple />,
} satisfies Meta<typeof Calendar>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Choose a date from a calendar opened by a button. */
export const Default: Story = {};

/** Choose the start and end dates in one popover. */
export const WithRange: Story = { render: () => <DatePickerWithRange /> };

/** Select a month and year before choosing the day. */
export const WithDropdowns: Story = {
  render: () => <DatePickerWithDropdowns />,
};

/** Choose a day and return to the date field with Escape. */
export const ShouldSelectDate: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, canvas }) => {
    const trigger = canvas.getByRole("button");
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(trigger);
    const calendar = await body.findByRole("grid");
    const selectedDate = new Date();
    selectedDate.setDate(15);
    const number = new Intl.NumberFormat().format(selectedDate.getDate());
    await userEvent.click(within(calendar).getByText(number));
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(body.queryByRole("grid")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
    await expect(trigger).toHaveTextContent(
      selectedDate.toLocaleDateString(undefined, { dateStyle: "long" }),
    );
  },
};
