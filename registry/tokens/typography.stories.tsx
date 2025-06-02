import { CSSProperties } from "react";
// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<{
  children: string;
  key: keyof CSSProperties;
  property: {
    name: string;
    value: string;
  }[];
}> = {
  title: "design/Typography",
  argTypes: {},
  args: {
    children: "Typeface",
  },
  render: (args) => (
    <table className="text-foreground w-full table-auto text-left text-sm rtl:text-right">
      <thead className="bg-muted text-xs uppercase">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="hidden px-6 py-3 sm:table-cell">
            Property
          </th>
          <th scope="col" className="w-1/2 px-6 py-3">
            <span className="sr-only">Preview</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {args.property.map(({ name, value }) => {
          const style = window.getComputedStyle(document.body);
          const resolved = style.getPropertyValue(value);

          return (
            <tr key={name} className="bg-card border-b">
              <td className="px-6 py-4">{name}</td>
              <td className="hidden px-6 py-4 sm:table-cell">{value}</td>
              <td className="px-6 py-4 leading-tight">
                <p className="line-clamp-1" style={{ [args.key]: resolved }}>
                  {args.children}
                </p>
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

export const FontFamily: Story = {
  args: {
    key: "fontFamily",
    property: [
      { name: "sans", value: "--font-sans" },
      { name: "serif", value: "--font-serif" },
      { name: "mono", value: "--font-mono" },
    ],
  },
};
export const FontSize: Story = {
  args: {
    key: "fontSize",
    property: [
      { name: "xs", value: "--text-xs" },
      { name: "sm", value: "--text-sm" },
      { name: "base", value: "--text-base" },
      { name: "lg", value: "--text-lg" },
      { name: "xl", value: "--text-xl" },
      { name: "2xl", value: "--text-2xl" },
      { name: "3xl", value: "--text-3xl" },
      { name: "4xl", value: "--text-4xl" },
      { name: "5xl", value: "--text-5xl" },
      { name: "6xl", value: "--text-6xl" },
    ],
  },
};
export const FontWeight: Story = {
  args: {
    key: "fontWeight",
    property: [
      { name: "thin", value: "--font-weight-thin" },
      { name: "extralight", value: "--font-weight-extralight" },
      { name: "light", value: "--font-weight-light" },
      { name: "normal", value: "--font-weight-normal" },
      { name: "medium", value: "--font-weight-medium" },
      { name: "semibold", value: "--font-weight-semibold" },
      { name: "bold", value: "--font-weight-bold" },
      { name: "extrabold", value: "--font-weight-extrabold" },
      { name: "black", value: "--font-weight-black" },
    ],
  },
};
