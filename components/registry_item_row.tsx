import { Button } from "@/bases/radix/components/ui/button";
import { TableCell, TableRow } from "@/bases/radix/components/ui/table";
import { CommandBlock } from "@/components/command-block";
import { getBaseUrl } from "@/lib/utils";
import { FC } from "react";

export const RegistryItemRow: FC<{
  item: { name: string; title: string; description?: string };
}> = ({ item }) => {
  return (
    <TableRow key={item.name}>
      <TableCell className="w-50 font-medium">{item.title}</TableCell>
      <TableCell>
        <Button variant="link" asChild>
          <a target="_blank" href={`${getBaseUrl()}/registry/${item.name}`}>
            Link
          </a>
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="link" asChild>
          <a
            href={`${getBaseUrl()}/storybook/?path=/docs/ui-${item.name.replace("-story", "")}--docs`}
          >
            Story
          </a>
        </Button>
      </TableCell>
      <TableCell>
        <CommandBlock
          command={`npx shadcn@latest add ${getBaseUrl()}/registry/${item.name}`}
          name={item.name}
        />
      </TableCell>
    </TableRow>
  );
};
