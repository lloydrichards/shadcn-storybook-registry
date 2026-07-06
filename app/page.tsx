import { Badge } from "@/bases/radix/components/ui/badge";
import { Button } from "@/bases/radix/components/ui/button";
import { ButtonGroup } from "@/bases/radix/components/ui/button-group";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/bases/radix/components/ui/table";
import baseRegistry from "@/registry.base.json";
import radixRegistry from "@/registry.radix.json";
import { PackagePlus } from "lucide-react";
import { CommandBlock } from "../components/command-block";
import {
  RegistryItemCard,
  RegistryItemRow,
} from "../components/registry_item_row";

const registryConfig = {
  radix: {
    label: "Radix UI",
    description: "Radix-backed shadcn/ui primitives and story examples.",
    url: "https://registry.lloydrichards.dev/v3/radix/{name}.json",
    registry: radixRegistry,
    example: "button-story",
  },
  base: {
    label: "Base UI",
    description: "Base UI implementations with the same story surface.",
    url: "https://registry.lloydrichards.dev/v3/base/{name}.json",
    registry: baseRegistry,
    example: "button-story",
  },
} as const;

const Home = async ({
  searchParams,
}: {
  searchParams?: Promise<{ registry?: keyof typeof registryConfig }>;
}) => {
  const params = await searchParams;
  const registrySelection = params?.registry || "radix";
  const registry = registryConfig[registrySelection].registry;
  const selectedConfig = registryConfig[registrySelection];
  const exampleUrl = selectedConfig.url.replace(
    "{name}.json",
    `${selectedConfig.example}.json`,
  );
  const componentItems = registry.items.filter((item) =>
    item.categories.includes("ui"),
  );
  const designItems = registry.items.filter((item) =>
    item.categories.includes("design"),
  );
  const utilityItems = registry.items.filter((item) =>
    item.categories.includes("utility"),
  );
  const totalStories = registry.items.length;
  const storyBreakdown = [
    { label: "Components", value: componentItems.length },
    { label: "Design tokens", value: designItems.length },
    { label: "Utilities", value: utilityItems.length },
  ];

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 overflow-x-hidden px-4 py-8">
      <main className="flex flex-1 flex-col gap-8">
        <section className="flex flex-col gap-5">
          <div className="grid gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">shadcn/ui</Badge>
              <Badge variant="outline">Storybook registry</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-3xl tracking-tight">
                  Installable Storybook stories for shadcn/ui
                </h1>
                <p className="max-w-2xl text-muted-foreground">
                  Browse ready-made stories for component documentation,
                  interaction tests, and design-token reference across Radix UI
                  and Base UI variants.
                </p>
              </div>
              <div className="grid gap-3 md:justify-items-end">
                <ButtonGroup>
                  <Button
                    asChild
                    variant={
                      registrySelection === "radix" ? "default" : "outline"
                    }
                    size="lg"
                  >
                    <a href="?registry=radix">Radix UI</a>
                  </Button>
                  <Button
                    asChild
                    variant={
                      registrySelection === "base" ? "default" : "outline"
                    }
                    size="lg"
                  >
                    <a href="?registry=base">Base UI</a>
                  </Button>
                </ButtonGroup>
                <p className="max-w-64 text-muted-foreground text-sm md:text-right">
                  {selectedConfig.description}
                </p>
              </div>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-[1.25fr_2fr]">
              <div className="bg-muted/40 px-3 py-2">
                <p className="font-semibold text-xl leading-none">
                  {totalStories}
                </p>
                <p className="mt-1 text-muted-foreground text-xs">
                  Total stories
                </p>
              </div>
              <div className="grid grid-cols-3 gap-px bg-border">
                {storyBreakdown.map((stat) => (
                  <div className="bg-background px-3 py-2" key={stat.label}>
                    <p className="font-semibold text-lg leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="min-w-0 rounded-lg border bg-muted/40 p-4 text-muted-foreground text-sm">
            <div className="flex flex-col gap-1 text-foreground">
              <div className="flex items-center gap-2">
                <PackagePlus />
                <h2 className="font-semibold">Install from this registry</h2>
              </div>
              <p className="text-muted-foreground">
                Use the registry alias for day-to-day installs. Keep the direct
                URL and configuration snippet handy for setup and debugging.
              </p>
            </div>
            <div className="mt-3 grid min-w-0 gap-3">
              <div className="grid min-w-0 gap-2 rounded-lg border bg-background p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Recommended
                  </p>
                  <Badge variant="secondary">Registry alias</Badge>
                </div>
                <CommandBlock
                  command={`npx shadcn@latest add @storybook/${selectedConfig.example}`}
                  name={`${registrySelection}-alias-install`}
                  label="Copy registry alias install command"
                  compact
                />
              </div>
              <details className="group min-w-0 rounded-lg border bg-background p-3">
                <summary className="cursor-pointer font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Configuration and direct URL
                </summary>
                <div className="mt-3 grid min-w-0 gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      components.json
                    </p>
                    <pre className="mt-2 max-w-full overflow-x-auto whitespace-pre text-foreground text-xs">
                      {`{
  // ...rest of your components.json
  "registries": {
    "@storybook": "${selectedConfig.url}"
  }
}`}
                    </pre>
                  </div>
                  <div className="grid min-w-0 gap-2">
                    <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Direct URL
                    </p>
                    <CommandBlock
                      command={`npx shadcn@latest add ${exampleUrl}`}
                      name={`${registrySelection}-url-install`}
                      label="Copy registry URL install command"
                      compact
                    />
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>
        <div className="grid gap-6 md:hidden">
          <RegistrySection
            items={componentItems}
            registry={registrySelection}
            title="Component stories"
          />
          <RegistrySection
            items={designItems}
            registry={registrySelection}
            title="Design token stories"
          />
          <RegistrySection
            items={utilityItems}
            registry={registrySelection}
            title="Utility stories"
          />
        </div>
        <div className="hidden md:block">
          <Table className="table-fixed">
            <TableCaption>A list of all registry items</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Name</TableHead>
                <TableHead className="w-28 text-center">JSON</TableHead>
                <TableHead className="w-24 text-center">Preview</TableHead>
                <TableHead className="text-center">Install</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b-0 hover:bg-background">
                <TableCell className="pt-8 text-xs uppercase">
                  Component{" "}
                  <span className="text-muted-foreground">Stories</span>{" "}
                  <Badge variant="secondary">{componentItems.length}</Badge>
                </TableCell>
              </TableRow>
              {componentItems.map((item) => (
                <RegistryItemRow
                  key={item.name}
                  item={item}
                  registry={registrySelection}
                />
              ))}
              <TableRow className="border-b-0 hover:bg-background">
                <TableCell className="pt-8 text-xs uppercase">
                  Design Token{" "}
                  <span className="text-muted-foreground">Stories</span>{" "}
                  <Badge variant="secondary">{designItems.length}</Badge>
                </TableCell>
              </TableRow>
              {designItems.map((item) => (
                <RegistryItemRow
                  key={item.name}
                  item={item}
                  registry={registrySelection}
                />
              ))}
              <TableRow className="border-b-0 hover:bg-background">
                <TableCell className="pt-8 text-xs uppercase">
                  Utility <span className="text-muted-foreground">Stories</span>{" "}
                  <Badge variant="secondary">{utilityItems.length}</Badge>
                </TableCell>
              </TableRow>
              {utilityItems.map((item) => (
                <RegistryItemRow
                  key={item.name}
                  item={item}
                  registry={registrySelection}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

const RegistrySection = ({
  items,
  registry,
  title,
}: {
  items: Array<{ name: string; title: string; description?: string }>;
  registry: keyof typeof registryConfig;
  title: string;
}) =>
  items.length > 0 ? (
    <section className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-muted-foreground text-xs uppercase tracking-wide">
          {title}
        </h2>
        <Badge variant="secondary">{items.length}</Badge>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <RegistryItemCard key={item.name} item={item} registry={registry} />
        ))}
      </div>
    </section>
  ) : null;

export default Home;
