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
import { CommandBlock } from "../components/command-block";
import {
  RegistryItemCard,
  RegistryItemRow,
} from "../components/registry_item_row";

const registryConfig = {
  radix: {
    label: "Radix UI",
    url: "https://registry.lloydrichards.dev/v3/radix/{name}.json",
    registry: radixRegistry,
    example: "button-story",
  },
  base: {
    label: "Base UI",
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

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 overflow-x-hidden px-4 py-8">
      <main className="flex flex-1 flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-3xl tracking-tight">
                Storybook Registry
              </h1>
              <p className="text-muted-foreground">
                A collection of stories for the components of Shadcn/ui
              </p>
            </div>
            <ButtonGroup>
              <Button
                asChild
                variant={registrySelection === "radix" ? "default" : "outline"}
                size="lg"
              >
                <a className="text-xl" href="?registry=radix">
                  Radix UI
                </a>
              </Button>
              <Button
                asChild
                variant={registrySelection === "base" ? "default" : "outline"}
                size="lg"
              >
                <a className="text-xl" href="?registry=base">
                  Base UI
                </a>
              </Button>
            </ButtonGroup>
          </div>
          <div className="min-w-0 rounded-lg border bg-muted/40 p-4 text-muted-foreground text-sm">
            <p className="text-foreground">
              <span className="font-bold">Getting started:</span> pick a
              registry from the toggle on the top right (between{" "}
              {registryConfig.radix.label} and {registryConfig.base.label}) and
              copy the matching setup below.
            </p>
            <div className="mt-3 grid min-w-0 gap-3">
              <div className="min-w-0 rounded-lg border bg-background p-3">
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
              <div className="grid min-w-0 gap-2 rounded-lg border bg-background p-3">
                <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Install
                </p>
                <CommandBlock
                  command={`npx shadcn@latest add @storybook/${selectedConfig.example}`}
                  name={`${registrySelection}-alias-install`}
                  label="Copy registry alias install command"
                  compact
                />
                <CommandBlock
                  command={`npx shadcn@latest add ${exampleUrl}`}
                  name={`${registrySelection}-url-install`}
                  label="Copy registry URL install command"
                  compact
                />
              </div>
            </div>
          </div>
        </section>
        <div className="grid gap-6 md:hidden">
          <RegistrySection
            items={componentItems}
            registry={registrySelection}
            title="Component Stories"
          />
          <RegistrySection
            items={designItems}
            registry={registrySelection}
            title="Design System Stories"
          />
          <RegistrySection
            items={utilityItems}
            registry={registrySelection}
            title="Misc. Stories"
          />
        </div>
        <div className="hidden md:block">
          <Table className="table-fixed">
            <TableCaption>A list of all registry items</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Name</TableHead>
                <TableHead className="w-28 text-center">JSON</TableHead>
                <TableHead className="w-24 text-center">Storybook</TableHead>
                <TableHead className="text-center">cmd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b-0 hover:bg-background">
                <TableCell className="pt-8 text-xs uppercase">
                  Component{" "}
                  <span className="text-muted-foreground">Stories</span>
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
                  Design System{" "}
                  <span className="text-muted-foreground">Stories</span>
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
                  Misc. <span className="text-muted-foreground">Stories</span>
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
      <h2 className="text-muted-foreground text-xs uppercase tracking-wide">
        {title}
      </h2>
      <div className="grid gap-3">
        {items.map((item) => (
          <RegistryItemCard key={item.name} item={item} registry={registry} />
        ))}
      </div>
    </section>
  ) : null;

export default Home;
