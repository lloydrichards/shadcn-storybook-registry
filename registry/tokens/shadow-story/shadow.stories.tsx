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

type Shadow = {
  name: string;
  value: string;
};

const ShadowTile = ({ value }: Pick<Shadow, "value">) => {
  const style = window.getComputedStyle(document.body);
  const shadow = style.getPropertyValue(value);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="bg-card size-20 rounded-md"
        style={{ boxShadow: shadow }}
      />
      <p className="text-center text-xs opacity-70">{value}</p>
      <p className="text-center text-xs">{shadow}</p>
    </div>
  );
};

/**
 * Shadow tokens for the design system
 */
const meta: Meta<{
  shadow: Shadow[];
}> = {
  title: "design/Shadow",
  argTypes: {},
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>
            <span className="sr-only shadow-2xl">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.shadow.map(({ name, value }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <ShadowTile value={value} />
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
 * Box shadow tokens used for UI elements like cards, modals, and overlays.
 */
export const Core: Story = {
  args: {
    shadow: [
      { name: "xxs", value: "--shadow-2xs" },
      { name: "xs", value: "--shadow-xs" },
      { name: "sm", value: "--shadow-sm" },
      { name: "md", value: "--shadow-md" },
      { name: "lg", value: "--shadow-lg" },
      { name: "xl", value: "--shadow-xl" },
      { name: "2xl", value: "--shadow-2xl" },
    ],
  },
};
