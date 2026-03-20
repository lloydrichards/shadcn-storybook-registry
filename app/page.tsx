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
import { RegistryItemRow } from "../components/registry_item_row";

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
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
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
          <div className="rounded-2xl border bg-muted/40 p-4 text-muted-foreground text-sm">
            <p className="text-foreground">
              <span className="font-bold">Getting started:</span> pick a
              registry from the toggle on the top right (between{" "}
              {registryConfig.radix.label} and {registryConfig.base.label}) and
              copy the matching setup below.
            </p>
            <div className="mt-3 grid gap-3">
              <div className="rounded-xl border bg-background p-3">
                <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  components.json
                </p>
                <pre className="mt-2 overflow-x-auto text-foreground text-xs">
                  {`{
  // ...rest of your components.json
  "registries": {
    "@storybook": "${selectedConfig.url}"
  }
}`}
                </pre>
              </div>
              <div className="rounded-xl border bg-background p-3">
                <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Install
                </p>
                <pre className="mt-2 overflow-x-auto text-foreground text-xs">
                  {`npx shadcn@latest add @storybook/${selectedConfig.example}
npx shadcn@latest add ${exampleUrl}`}
                </pre>
              </div>
            </div>
          </div>
        </section>
        <Table className="table-fixed">
          <TableCaption>A list of all registry items</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-40">Name</TableHead>
              <TableHead className="w-20 text-center">JSON</TableHead>
              <TableHead className="w-20 text-center">Storybook</TableHead>
              <TableHead className="text-center">cmd</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b-0 hover:bg-background">
              <TableCell className="pt-8 text-xs uppercase">
                Component <span className="text-muted-foreground">Stories</span>
              </TableCell>
            </TableRow>
            {registry.items
              .filter((item) => item.categories.includes("ui"))
              .map((item) => (
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
            {registry.items
              .filter((item) => item.categories.includes("design"))
              .map((item) => (
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
            {registry.items
              .filter((item) => item.categories.includes("utility"))
              .map((item) => (
                <RegistryItemRow
                  key={item.name}
                  item={item}
                  registry={registrySelection}
                />
              ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default Home;
