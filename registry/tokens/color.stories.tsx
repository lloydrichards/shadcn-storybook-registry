// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type Swatch = {
  name: string;
  colors: Record<string, string>;
};

const meta: Meta<{
  swatch: Swatch[];
}> = {
  title: "design/Color",
  argTypes: {},
  render: (args) => (
    <table className="text-foreground w-full table-auto text-left text-sm rtl:text-right">
      <thead className="bg-muted text-xs uppercase">
        <tr>
          <th scope="col" className="px-6 py-2">
            Name
          </th>
          <th scope="col" className="px-6 py-2">
            <span className="sr-only">Swatch</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {args.swatch.map(({ name, colors }) => (
          <tr key={name} className="bg-card border-b">
            <td className="px-6 py-2">{name}</td>
            <td className="px-6 py-2">
              <div className="flex overflow-clip rounded-md border shadow">
                {Object.entries(colors).map(([name, value], idx) => {
                  const styles = getComputedStyle(document.documentElement);
                  const color = styles.getPropertyValue(value);

                  return (
                    <div key={idx} className="flex w-full flex-col gap-1 pb-2">
                      <div
                        className="h-16 w-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      <p className="text-center font-semibold">{name}</p>
                      <p className="text-center text-xs opacity-70">
                        {value.match(/var\(([^)]+)\)/)?.[1] ?? ""}
                      </p>
                      <p className="text-center text-xs">{value}</p>
                      <p className="text-center text-xs">{color}</p>
                    </div>
                  );
                })}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

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
        name: "Card",
        colors: {
          default: "--card",
          foreground: "--card-foreground",
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
        name: "Border",
        colors: {
          default: "--border",
          input: "--input",
          ring: "--ring",
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

export const Component: Story = {
  args: {
    swatch: [
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
    ],
  },
};
