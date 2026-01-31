import { Button } from "@/bases/radix/components/ui/button";
import { TableCell, TableRow } from "@/bases/radix/components/ui/table";
import { CommandBlock } from "@/components/command-block";
import { getBaseUrl } from "@/lib/utils";
import { FC } from "react";

export const RegistryItemRow: FC<{
  item: { name: string; title: string; description?: string };
  registry: "radix" | "base";
}> = ({ item, registry }) => {
  const registryBasePath = registry === "base" ? "/v3/base" : "/v3/radix";
  const registryUrl = `${getBaseUrl()}${registryBasePath}/${item.name}.json`;
  return (
    <TableRow key={item.name}>
      <TableCell className="w-50 font-medium">{item.title}</TableCell>
      <TableCell>
        <Button variant="link" asChild>
          <a target="_blank" href={registryUrl}>
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
          command={`npx shadcn@latest add ${registryUrl}`}
          name={item.name}
        />
      </TableCell>
    </TableRow>
  );
};
