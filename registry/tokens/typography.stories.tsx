import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CSSProperties } from "react";
// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type Typography = {
  name: string;
  value: string;
};

const TypographyBlock = ({
  cssKey,
  value,
  children,
}: {
  cssKey: keyof CSSProperties;
  value: string;
  children: React.ReactNode;
}) => {
  const style = window.getComputedStyle(document.body);
  const resolved = style.getPropertyValue(value);

  return (
    <p className="line-clamp-1" style={{ [cssKey]: resolved }}>
      {children}
    </p>
  );
};

/**
 * Typography tokens for the design system
 */
const meta: Meta<{
  children: string;
  cssKey: keyof CSSProperties;
  properties: Typography[];
}> = {
  title: "design/Typography",
  argTypes: {},
  args: {
    children: "Typeface",
  },
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>
            <span className="sr-only">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.properties.map(({ name, value }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>{value}</TableCell>
            <TableCell>
              <TypographyBlock cssKey={args.cssKey} value={value}>
                {args.children}
              </TypographyBlock>
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
 * Font family tokens for the design system.
 */
export const FontFamily: Story = {
  args: {
    cssKey: "fontFamily",
    properties: [
      { name: "sans", value: "--font-sans" },
      { name: "serif", value: "--font-serif" },
      { name: "mono", value: "--font-mono" },
    ],
  },
};

/**
 * Font size tokens for the design system.
 */
export const FontSize: Story = {
  args: {
    cssKey: "fontSize",
    properties: [
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

/**
 * Font weight tokens for the design system.
 */
export const FontWeight: Story = {
  args: {
    cssKey: "fontWeight",
    properties: [
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
