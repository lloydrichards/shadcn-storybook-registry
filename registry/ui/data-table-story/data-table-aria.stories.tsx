import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_text,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "@/bases/aria/components/ui/button";
import { Checkbox } from "@/bases/aria/components/ui/checkbox";
import { Input } from "@/bases/aria/components/ui/input";
import { Skeleton } from "@/bases/aria/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/bases/aria/components/ui/table";

const features = tableFeatures({
  columnFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { text: sortFn_text },
});

type Payment = {
  id: string;
  email: string;
  status: "Success" | "Pending" | "Failed";
  amount: number;
};

const payments: Payment[] = [
  { id: "pay-1", email: "dana@example.com", status: "Success", amount: 120 },
  { id: "pay-2", email: "alex@example.com", status: "Pending", amount: 45 },
  { id: "pay-3", email: "frank@example.com", status: "Failed", amount: 80 },
  { id: "pay-4", email: "blair@example.com", status: "Success", amount: 210 },
  { id: "pay-5", email: "erin@example.com", status: "Pending", amount: 65 },
  { id: "pay-6", email: "casey@example.com", status: "Success", amount: 150 },
];

const columnHelper = createColumnHelper<typeof features, Payment>();
const columns = columnHelper.columns([
  columnHelper.display({
    id: "selection",
    header: ({ table }) => (
      <Checkbox
        slot={null}
        aria-label="Select all payments on this page"
        isSelected={table.getIsAllPageRowsSelected()}
        isIndeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        slot={null}
        aria-label={`Select payment for ${row.original.email}`}
        isSelected={row.getIsSelected()}
        onChange={(checked) => row.toggleSelected(!!checked)}
      />
    ),
  }),
  columnHelper.accessor("email", {
    filterFn: "includesString",
    sortFn: "text",
    header: "Email",
  }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(row.original.amount)}
      </span>
    ),
  }),
]);

function PaymentsTable({
  data = payments,
  loading = false,
}: {
  data?: Payment[];
  loading?: boolean;
}) {
  const table = useTable({
    features,
    columns,
    data,
    getRowId: (payment) => payment.id,
    initialState: { pagination: { pageIndex: 0, pageSize: 3 } },
  });

  return (
    <div className="w-full space-y-4">
      <Input
        aria-label="Filter payments by email"
        placeholder="Filter emails..."
        className="max-w-sm"
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          table.getColumn("email")?.setFilterValue(event.target.value);
          table.setPageIndex(0);
        }}
        disabled={loading}
      />
      <div className="overflow-hidden rounded-md border">
        <Table
          className="min-w-[560px]"
          aria-label="Recent payments"
          aria-busy={loading}
          sortDescriptor={
            table.state.sorting[0] && {
              column: table.state.sorting[0].id,
              direction: table.state.sorting[0].desc
                ? "descending"
                : "ascending",
            }
          }
          onSortChange={({ column, direction }) =>
            table.setSorting([
              { id: String(column), desc: direction === "descending" },
            ])
          }
        >
          <TableHeader>
            {table.getFlatHeaders().map((header) => (
              <TableHead
                key={header.id}
                id={header.id}
                isRowHeader={header.id === "email"}
                allowsSorting={header.id === "email"}
              >
                <table.FlexRender header={header} />
              </TableHead>
            ))}
          </TableHeader>
          <TableBody
            renderEmptyState={() =>
              loading ? (
                <div role="status">
                  <span className="sr-only">Loading payments</span>
                  <Skeleton className="h-6 w-full" />
                </div>
              ) : (
                "No payments found."
              )
            }
          >
            {table.getRowModel().rows.map((row) => (
              <TableRow id={row.id} key={row.id} textValue={row.original.email}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p aria-live="polite">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} payments selected
        </p>
        <div className="flex items-center gap-2">
          <span>
            Page {table.state.pagination.pageIndex + 1} of{" "}
            {Math.max(1, table.getPageCount())}
          </span>
          <Button
            variant="outline"
            size="sm"
            isDisabled={loading || !table.getCanPreviousPage()}
            onPress={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            isDisabled={loading || !table.getCanNextPage()}
            onPress={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Compose the Table primitive with TanStack Table v9 to sort, filter, paginate, and select local payments. */
const meta = {
  id: "ui-aria-datatable",
  title: "ui/DataTable",
  component: PaymentsTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { data: payments, loading: false },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PaymentsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Browse six deterministic payments with three rows per page. */
export const Default: Story = {};

/** Show a clear message when the data source contains no payments. */
export const Empty: Story = { args: { data: [] } };

/** Keep the table structure visible while payments are loading. */
export const Loading: Story = { args: { data: [], loading: true } };

/** Keep all columns available through horizontal scrolling on narrow screens. */
export const NarrowScreen: Story = {
  decorators: [
    (Story) => (
      <div className="w-[320px] max-w-full">
        <Story />
      </div>
    ),
  ],
};

/** Sorting changes the visible row order in both directions. */
export const ShouldSortPayments: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const table = canvas.getByRole("grid", { name: "Recent payments" });
    const firstRow = () => within(table).getAllByRole("row")[1];
    await expect(firstRow()).toHaveTextContent("dana@example.com");
    await userEvent.click(canvas.getByRole("columnheader", { name: /Email/ }));
    await expect(firstRow()).toHaveTextContent("alex@example.com");
    await expect(
      canvas.getByRole("columnheader", { name: /Email/ }),
    ).toHaveAttribute("aria-sort", "ascending");
    await userEvent.click(canvas.getByRole("columnheader", { name: /Email/ }));
    await expect(firstRow()).toHaveTextContent("frank@example.com");
    await expect(
      canvas.getByRole("columnheader", { name: /Email/ }),
    ).toHaveAttribute("aria-sort", "descending");
  },
};

/** Filtering searches the full dataset, handles no matches, and restores rows when cleared. */
export const ShouldFilterPayments: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const filter = canvas.getByRole("textbox", {
      name: "Filter payments by email",
    });
    await userEvent.type(filter, "casey");
    await expect(
      canvas.getByRole("rowheader", { name: "casey@example.com" }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("rowheader", { name: "dana@example.com" }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Next" })).toBeDisabled();
    await userEvent.clear(filter);
    await userEvent.type(filter, "missing@example.com");
    await expect(canvas.getByText("No payments found.")).toBeVisible();
    await userEvent.clear(filter);
    await expect(
      canvas.getByRole("rowheader", { name: "dana@example.com" }),
    ).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Next" })).toBeEnabled();
  },
};

/** Pagination replaces the visible rows and disables navigation at either boundary. */
export const ShouldPaginatePayments: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Previous" }),
    ).toBeDisabled();
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(
      canvas.getByRole("rowheader", { name: "blair@example.com" }),
    ).toBeVisible();
    await expect(
      canvas.queryByRole("rowheader", { name: "dana@example.com" }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByText("Page 2 of 2")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Next" })).toBeDisabled();
    await userEvent.click(canvas.getByRole("button", { name: "Previous" }));
    await expect(
      canvas.getByRole("rowheader", { name: "dana@example.com" }),
    ).toBeVisible();
    await expect(canvas.getByText("Page 1 of 2")).toBeVisible();
  },
};

/** Select a row or the current page while preserving selections across pagination. */
export const ShouldSelectPayments: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas }) => {
    const row = canvas.getByRole("checkbox", {
      name: "Select payment for dana@example.com",
    });
    const all = canvas.getByRole("checkbox", {
      name: "Select all payments on this page",
    });
    await userEvent.click(row);
    await expect(row).toBeChecked();
    await expect(canvas.getByText("1 of 6 payments selected")).toBeVisible();
    await expect(all).toBePartiallyChecked();
    await userEvent.click(all);
    await expect(canvas.getByText("3 of 6 payments selected")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(
      canvas.getByRole("checkbox", {
        name: "Select payment for blair@example.com",
      }),
    ).not.toBeChecked();
    await expect(canvas.getByText("3 of 6 payments selected")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Previous" }));
    await expect(
      canvas.getByRole("checkbox", {
        name: "Select payment for dana@example.com",
      }),
    ).toBeChecked();
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "Select all payments on this page",
      }),
    );
    await expect(canvas.getByText("0 of 6 payments selected")).toBeVisible();
  },
};
