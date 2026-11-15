import { expect, userEvent, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import {
  CalendarDate,
  getLocalTimeZone,
  isSameDay,
  today,
} from "@internationalized/date";
import { I18nProvider, type DateRange } from "react-aria-components";
import { Calendar, RangeCalendar } from "@/bases/aria/components/ui/calendar";
import { Card, CardContent } from "@/bases/aria/components/ui/card";

function CalendarSingle() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 12),
  );
  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar value={date} onChange={setDate} />
      </CardContent>
    </Card>
  );
}

function CalendarMultiple() {
  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar selectionMode="multiple" />
      </CardContent>
    </Card>
  );
}

function CalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    start: new CalendarDate(new Date().getFullYear(), 1, 12),
    end: new CalendarDate(new Date().getFullYear(), 1, 12).add({ days: 30 }),
  });

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <RangeCalendar
          value={dateRange}
          onChange={setDateRange}
          numberOfMonths={2}
          maxValue={today(getLocalTimeZone())}
        />
      </CardContent>
    </Card>
  );
}

function CalendarRangeMultipleMonths() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    start: new CalendarDate(new Date().getFullYear(), 4, 12),
    end: new CalendarDate(new Date().getFullYear(), 4, 12).add({ days: 60 }),
  });

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <I18nProvider locale="es">
          <RangeCalendar
            value={range}
            onChange={setRange}
            numberOfMonths={3}
            weeksInMonth={6}
          />
        </I18nProvider>
      </CardContent>
    </Card>
  );
}

function CalendarBookedDates() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    new CalendarDate(new Date().getFullYear(), 2, 3),
  );
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new CalendarDate(new Date().getFullYear(), 2, 12 + i),
  );

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          value={date}
          onChange={setDate}
          isDateUnavailable={(date) =>
            bookedDates.some((d) => isSameDay(date, d))
          }
        />
      </CardContent>
    </Card>
  );
}

/** Choose a date, multiple dates, or a range using the calendar grid. */
const meta = {
  id: "ui-aria-calendar",
  title: "ui/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  render: () => <CalendarSingle />,
} satisfies Meta<typeof Calendar>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Choose a date, multiple dates, or a range using the calendar grid. */
export const Default: Story = {};

/** Choose more than one date. */
export const Multiple: Story = { render: () => <CalendarMultiple /> };

/** Select a start date and an end date. */
export const Range: Story = { render: () => <CalendarRange /> };

/** Display adjacent months when selecting a range. */
export const MultipleMonths: Story = {
  render: () => <CalendarRangeMultipleMonths />,
};

/** Block dates that are already booked. */
export const Disabled: Story = { render: () => <CalendarBookedDates /> };

/** Move forward one month and return to the original calendar grid. */
export const ShouldNavigateMonthsWhenClicked: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const navigationButton = (name: string) => {
      const button = canvas
        .getAllByRole("button", { name })
        .find((button) => button.tabIndex === 0);
      if (!button) throw new Error(`No focusable ${name} navigation button`);
      return button;
    };
    const first = canvas.getByRole("grid").getAttribute("aria-label");
    await userEvent.click(navigationButton("Next"));
    await waitFor(() =>
      expect(canvas.getByRole("grid").getAttribute("aria-label")).not.toEqual(
        first,
      ),
    );
    await userEvent.click(navigationButton("Previous"));
    await expect(canvas.getByRole("grid").getAttribute("aria-label")).toEqual(
      first,
    );
  },
};
