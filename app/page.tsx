import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RegistryItemRow } from "../components/registry_item_row";

const Home = async () => {
  const registryData = await import("@/registry.json");
  const registry = registryData.default;
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
      <main className="flex flex-1 flex-col gap-8">
        <section className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Storybook Registry
          </h1>
          <p className="text-muted-foreground">
            A collection of stories for the components of Shadcn/ui
          </p>
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
              .filter((item) => item.meta.type === "ui")
              .map((item) => (
                <RegistryItemRow key={item.name} item={item} />
              ))}
            <TableRow className="hover:bg-background border-b-0">
              <TableCell className="pt-8 text-xs uppercase">
                Design System{" "}
                <span className="text-muted-foreground">Stories</span>
              </TableCell>
            </TableRow>
            {registry.items
              .filter((item) => item.meta.type === "design")
              .map((item) => (
                <RegistryItemRow key={item.name} item={item} />
              ))}
            <TableRow className="hover:bg-background border-b-0">
              <TableCell className="pt-8 text-xs uppercase">
                Misc. <span className="text-muted-foreground">Stories</span>
              </TableCell>
            </TableRow>
            {registry.items
              .filter((item) => item.meta.type === "misc")
              .map((item) => (
                <RegistryItemRow key={item.name} item={item} />
              ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default Home;
