import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type Spacing = {
  name: string;
  value: number;
};

const SpacingRow = ({ value, name }: Spacing) => {
  const style = window.getComputedStyle(document.body);
  const size = style.getPropertyValue("--spacing");
  const rem = parseFloat(size) * value;
  const pixels = parseFloat(size) * 16 * value;
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{rem}rem</TableCell>
      <TableCell>{pixels}px</TableCell>
      <TableCell className="w-full">
        <div className="bg-muted border">
          <div className="bg-primary h-4" style={{ width: pixels }} />
        </div>
      </TableCell>
    </TableRow>
  );
};

/**
 * Spacing tokens for the design system
 */
const meta: Meta<{
  scale: Spacing[];
}> = {
  title: "design/Spacing",
  argTypes: {},
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Pixels</TableHead>
          <TableHead className="hidden sm:table-cell">
            <span className="sr-only">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.scale.map(({ name, value }, idx) => (
          <SpacingRow key={idx} value={value} name={name} />
        ))}
      </TableBody>
    </Table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Spacing values used for padding, margins, and layout.
 */
export const Core: Story = {
  args: {
    scale: [
      { name: "x-1", value: 1 },
      { name: "x-4", value: 4 },
      { name: "x-8", value: 8 },
      { name: "x-12", value: 12 },
      { name: "x-16", value: 16 },
      { name: "x-20", value: 20 },
      { name: "x-24", value: 24 },
      { name: "x-28", value: 28 },
      { name: "x-32", value: 32 },
      { name: "x-36", value: 36 },
      { name: "x-40", value: 40 },
      { name: "x-44", value: 44 },
      { name: "x-48", value: 48 },
      { name: "x-52", value: 52 },
      { name: "x-56", value: 56 },
      { name: "x-60", value: 60 },
      { name: "x-64", value: 64 },
      { name: "x-68", value: 68 },
      { name: "x-72", value: 72 },
      { name: "x-76", value: 76 },
      { name: "x-80", value: 80 },
    ],
  },
};
