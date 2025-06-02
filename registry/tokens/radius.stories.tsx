// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type Radius = {
  name: string;
  value: string;
};
const meta: Meta<{
  radius: Radius[];
}> = {
  title: "design/Radius",
  argTypes: {},
  render: (args) => (
    <table className="text-foreground w-full table-auto text-left text-sm rtl:text-right">
      <thead className="bg-muted text-xs uppercase">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="hidden px-6 py-3 sm:table-cell">
            Size
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Preview</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {args.radius.map(({ name, value }) => {
          const style = window.getComputedStyle(document.body);
          const radius = style.getPropertyValue(value);
          return (
            <tr key={name} className="bg-card border-b">
              <td className="px-6 py-2">{name}</td>
              <td className="hidden px-6 py-2 sm:table-cell">{value}</td>
              <td className="px-6 py-2">
                <div
                  className="bg-background size-20 border-2"
                  style={{ borderRadius: radius }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

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
