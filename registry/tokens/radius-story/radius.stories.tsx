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

type Radius = {
  name: string;
  value: string;
};

const RadiusTile = ({ value }: Pick<Radius, "value">) => {
  const style = window.getComputedStyle(document.body);
  const radius = style.getPropertyValue(value);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="bg-card size-20 border-2"
        style={{ borderRadius: radius }}
      />
      <p className="text-center text-xs opacity-70">{value}</p>
      <p className="text-center text-xs">{radius}</p>
    </div>
  );
};

/**
 * Radius tokens for the design system
 */
const meta: Meta<{
  radius: Radius[];
}> = {
  title: "design/Radius",
  argTypes: {},
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>
            <span className="sr-only">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.radius.map(({ name, value }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <RadiusTile value={value} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Border radius tokens used for UI elements like buttons, cards, and modals.
 */
export const Core: Story = {
  args: {
    radius: [
      { name: "xs", value: "--radius-xs" },
      { name: "sm", value: "--radius-sm" },
      { name: "md", value: "--radius-md" },
      { name: "lg", value: "--radius-lg" },
    ],
  },
};
