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
import * as React from "react";

const Home = async () => {
  const registryData = await import("@/registry.json");
  const registry = registryData.default;
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Storybook Registry
        </h1>
        <p className="text-muted-foreground">
          A collection of stories for the components of Shadcn/ui
        </p>
      </header>
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
              <TableCell className="font-medium w-50">{item.title}</TableCell>
              <TableCell>
                <Button variant="link" asChild>
                  <a
                    target="_blank"
                    href={`https://registry.lloydrichards.dev/r/${item.name}.json`}
                  >
                    Link
                  </a>
                </Button>
              </TableCell>
              <TableCell>
                <CommandBlock
                  command={`npx shadcn@latest add https://registry.lloydrichards.dev/r/${item.name}.json`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <main className="flex flex-col flex-1 gap-8"></main>
    </div>
  );
};

export default Home;
