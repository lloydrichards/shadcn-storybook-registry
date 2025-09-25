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

type Swatch = {
  name: string;
  colors: Record<string, string>;
};

const SwatchList = ({ colors }: { colors: Record<string, string> }) => {
  return (
    <div className="flex overflow-clip rounded-md border shadow">
      {Object.entries(colors).map(([name, value], idx) => {
        const styles = getComputedStyle(document.documentElement);
        const color = styles.getPropertyValue(value);

        return (
          <div
            key={idx}
            className="bg-background flex w-full flex-col gap-1 pb-3"
          >
            <div className="h-16 w-full" style={{ backgroundColor: color }} />
            <p className="text-center font-semibold">{name}</p>
            <p className="text-center text-xs opacity-70">{value}</p>
            <p className="text-center text-xs">{color}</p>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Color tokens for the design system
 */
const meta: Meta<{
  swatch: Swatch[];
}> = {
  title: "design/Color",
  argTypes: {},
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>
            <span className="sr-only">Swatch</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.swatch.map(({ name, colors }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <SwatchList colors={colors} />
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
 * Functional color tokens are used to define the core colors of the design system.
 * These colors are used throughout the application for backgrounds, text, borders, etc.
 */
export const Functional: Story = {
  args: {
    swatch: [
      {
        name: "Background",
        colors: {
          default: "--background",
          foreground: "--foreground",
        },
      },
      {
        name: "Primary",
        colors: {
          default: "--primary",
          foreground: "--primary-foreground",
        },
      },
      {
        name: "Secondary",
        colors: {
          default: "--secondary",
          foreground: "--secondary-foreground",
        },
      },
      {
        name: "Accent",
        colors: {
          default: "--accent",
          foreground: "--accent-foreground",
        },
      },
      {
        name: "Muted",
        colors: {
          default: "--muted",
          foreground: "--muted-foreground",
        },
      },

      {
        name: "Destructive",
        colors: {
          default: "--destructive",
        },
      },
    ],
  },
};

/**
 * Component color tokens are used to define the colors of specific components in the design system.
 * These colors are used to style components like buttons, inputs, and alerts.
 */
export const Component: Story = {
  args: {
    swatch: [
      {
        name: "Border",
        colors: {
          default: "--border",
          ring: "--ring",
        },
      },
      {
        name: "Card",
        colors: {
          default: "--card",
          foreground: "--card-foreground",
        },
      },
      {
        name: "Input",
        colors: {
          default: "--input",
        },
      },
      {
        name: "Popover",
        colors: {
          default: "--popover",
          foreground: "--popover-foreground",
        },
      },
      {
        name: "Chart",
        colors: {
          "1": "--chart-1",
          "2": "--chart-2",
          "3": "--chart-3",
          "4": "--chart-4",
          "5": "--chart-5",
        },
      },
      {
        name: "Sidebar",
        colors: {
          background: "--sidebar",
          foreground: "--sidebar-foreground",
          primary: "--sidebar-primary",
          "primary-foreground": "--sidebar-primary-foreground",
          accent: "--sidebar-accent",
          "accent-foreground": "--sidebar-accent-foreground",
          border: "--sidebar-border",
          ring: "--sidebar-ring",
        },
      },
    ],
  },
};
