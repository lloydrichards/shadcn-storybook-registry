import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isRegistryName, registryNames } from "@/lib/registries";
import { rewriteRegistryImports } from "@/lib/registry-imports";

const loadRegistry = {
  radix: () => import("@/registry.radix.json"),
  base: () => import("@/registry.base.json"),
  aria: () => import("@/registry.aria.json"),
};

export const generateStaticParams = async () =>
  (
    await Promise.all(
      registryNames.map(async (registry) => {
        const { default: manifest } = await loadRegistry[registry]();
        return manifest.items.map(({ name }) => ({ registry, name }));
      }),
    )
  ).flat();

// This route shows an example for serving a component using a route handler.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ registry: string; name: string }> },
) {
  try {
    const { registry: registryName, name } = await params;

    if (!isRegistryName(registryName)) {
      return NextResponse.json(
        { error: "Registry not found" },
        { status: 404 },
      );
    }

    const { default: registry } = await loadRegistry[registryName]();

    // Find the component from the registry.
    const component = registry.items.find((c) => c.name === name);

    // If the component is not found, return a 404 error.
    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 },
      );
    }

    // If the component has no files, return a 400 error.
    if (!component.files?.length) {
      return NextResponse.json(
        { error: "Component has no files" },
        { status: 400 },
      );
    }

    // Read all files in parallel.
    const filesWithContent = await Promise.all(
      component.files.map(async (file) => {
        const filePath = path.join(process.cwd(), file.path);
        const content = await fs.readFile(filePath, "utf8");
        return { ...file, content: rewriteRegistryImports(content) };
      }),
    );

    // Return the component with the files.
    return NextResponse.json({
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      ...component,
      files: filesWithContent,
    });
  } catch (error) {
    console.error("Error processing component request:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
