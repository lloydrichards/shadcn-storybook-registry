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
import { getBaseUrl } from "@/lib/utils";
import * as React from "react";

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
            {registry.items.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="w-50 font-medium">{item.title}</TableCell>
                <TableCell>
                  <Button variant="link" asChild>
                    <a
                      target="_blank"
                      href={`${getBaseUrl()}/registry/${item.name}`}
                    >
                      Link
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="link" asChild>
                    <a
                      href={`${getBaseUrl()}/storybook/?path=/docs/${item.meta.story}--docs`}
                    >
                      Story
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <CommandBlock
                    command={`npx shadcn@latest add ${getBaseUrl()}/registry/${item.name}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default Home;
