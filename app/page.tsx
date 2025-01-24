import CommandBlock from "@/components/command-block";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Code2 } from "lucide-react";
import * as React from "react";

const Home = async () => {
  const registryData = await import("@/registry.json");
  const registry = registryData.default;
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Storybook Registry
        </h1>
        <p className="text-muted-foreground">
          A collection of stories for the components of Shadcn/ui
        </p>
      </header>
      <main className="flex flex-1 flex-col gap-8">
        <Table className="table-fixed">
          <TableCaption>A list of all registry items</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-40">Name</TableHead>
              <TableHead className="w-20">link</TableHead>
              <TableHead>cmd</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registry.items.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="w-50 font-medium">{item.title}</TableCell>
                <TableCell>
                  <Button variant="link" asChild>
                    <a
                      target="_blank"
                      href={`https://registry.lloydrichards.dev/registry/${item.name}`}
                    >
                      Link
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <CommandBlock
                    command={`npx shadcn@latest add https://registry.lloydrichards.dev/registry/${item.name}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <footer className="flex flex-row items-center justify-between">
        <Button variant="link" asChild>
          <a href="https://www.lloydrichards.dev" target="_blank">
            lloydrichards.dev
          </a>
        </Button>
        <Button variant="link" asChild>
          <a
            href="https://github.com/lloydrichards/shadcn-storybook-registry"
            target="_blank"
          >
            <Code2 size={24} /> Repo
          </a>
        </Button>
      </footer>
    </div>
  );
};

export default Home;
