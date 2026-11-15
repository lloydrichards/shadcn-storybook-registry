import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/bases/aria/components/ui/breadcrumb";

/**
 * Displays the path to the current resource using a hierarchy of links.
 */
const meta = {
  id: "ui-aria-breadcrumb",
  title: "ui/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/?registry=aria">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Displays the path of links to the current resource.
 */
export const Default: Story = {};

/**
 * Use the item separator class to emphasize the path.
 */
export const WithHighlightedSeparators: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem separatorClassName="text-primary">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem separatorClassName="text-primary">
          <BreadcrumbLink href="/?registry=aria">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
