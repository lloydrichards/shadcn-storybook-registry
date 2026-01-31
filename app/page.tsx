import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/bases/radix/components/ui/table";
import { RegistryItemRow } from "../components/registry_item_row";

type Registry = {
  items: Array<{
    name: string;
    title: string;
    description?: string;
    categories?: string[];
  }>;
};

const loadRegistry = async (selected: "radix" | "base") => {
  if (selected === "base") {
    const registryData = await import("@/registry.base.json");
    return registryData.default as Registry;
  }

  const registryData = await import("@/registry.radix.json");
  return registryData.default as Registry;
};

const Home = async ({
  searchParams,
}: {
  searchParams?: Promise<{ registry?: string }>;
}) => {
  const params = await searchParams;
  const registrySelection = params?.registry === "base" ? "base" : "radix";
  const registry = await loadRegistry(registrySelection);
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
      <main className="flex flex-1 flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight">
                Storybook Registry
              </h1>
              <p className="text-muted-foreground">
                A collection of stories for the components of Shadcn/ui
              </p>
            </div>
            <div className="bg-background inline-flex items-center gap-1 rounded-full border p-1 text-sm">
              <a
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  registrySelection === "radix"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                href="?registry=radix"
              >
                Radix UI
              </a>
              <a
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  registrySelection === "base"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                href="?registry=base"
              >
                Base UI
              </a>
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
            <TableRow className="hover:bg-background border-b-0">
              <TableCell className="pt-8 text-xs uppercase">
                Component <span className="text-muted-foreground">Stories</span>
              </TableCell>
            </TableRow>
            {registry.items
              .filter(
                (item) => item.categories && item.categories.includes("ui"),
              )
              .map((item) => (
                <RegistryItemRow
                  key={item.name}
                  item={item}
                  registry={registrySelection}
                />
              ))}
            <TableRow className="hover:bg-background border-b-0">
              <TableCell className="pt-8 text-xs uppercase">
                Design System{" "}
                <span className="text-muted-foreground">Stories</span>
              </TableCell>
            </TableRow>
            {registry.items
              .filter(
                (item) => item.categories && item.categories.includes("design"),
              )
              .map((item) => (
                <RegistryItemRow
                  key={item.name}
                  item={item}
                  registry={registrySelection}
                />
              ))}
            <TableRow className="hover:bg-background border-b-0">
              <TableCell className="pt-8 text-xs uppercase">
                Misc. <span className="text-muted-foreground">Stories</span>
              </TableCell>
            </TableRow>
            {registry.items
              .filter(
                (item) =>
                  item.categories && item.categories.includes("utility"),
              )
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
