import { Button } from "@/bases/radix/components/ui/button";
import { TableCell, TableRow } from "@/bases/radix/components/ui/table";
import { CommandBlock } from "@/components/command-block";
import { getBaseUrl } from "@/lib/utils";
import { BookOpen, Braces } from "lucide-react";
import type { FC } from "react";

export const RegistryItemRow: FC<{
  item: { name: string; title: string; description?: string };
  registry: "radix" | "base";
}> = ({ item, registry }) => {
  const registryBasePath = registry === "base" ? "/v3/base" : "/v3/radix";
  const registryUrl = `${getBaseUrl()}${registryBasePath}/${item.name}.json`;
  const storyUrl = `${getBaseUrl()}/storybook/?path=/docs/ui-${registry}-${item.name.replace("-story", "")}--docs`;

  return (
    <TableRow key={item.name}>
      <TableCell className="w-50 font-medium">{item.title}</TableCell>
      <TableCell>
        <Button variant="link" asChild>
          <a target="_blank" href={registryUrl} rel="noopener">
            Registry JSON
          </a>
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="link" asChild>
          <a href={storyUrl}>Preview</a>
        </Button>
      </TableCell>
      <TableCell>
        <CommandBlock
          command={`npx shadcn@latest add ${registryUrl}`}
          name={item.name}
          compact
        />
      </TableCell>
    </TableRow>
  );
};

export const RegistryItemCard: FC<{
  item: { name: string; title: string; description?: string };
  registry: "radix" | "base";
}> = ({ item, registry }) => {
  const registryBasePath = registry === "base" ? "/v3/base" : "/v3/radix";
  const registryUrl = `${getBaseUrl()}${registryBasePath}/${item.name}.json`;
  const storyUrl = `${getBaseUrl()}/storybook/?path=/docs/ui-${registry}-${item.name.replace("-story", "")}--docs`;

  return (
    <article className="grid gap-3 rounded-lg border p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-medium text-sm">{item.title}</h3>
          {item.description ? (
            <p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
              {item.description}
            </p>
          ) : null}
        </div>
        <span className="rounded-md bg-muted px-2 py-1 text-muted-foreground text-xs uppercase">
          {registry}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" asChild>
          <a target="_blank" href={registryUrl} rel="noopener">
            <Braces data-icon="inline-start" />
            JSON
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={storyUrl}>
            <BookOpen data-icon="inline-start" />
            Preview
          </a>
        </Button>
      </div>
      <CommandBlock
        command={`npx shadcn@latest add ${registryUrl}`}
        name={item.name}
        compact
      />
    </article>
  );
};
