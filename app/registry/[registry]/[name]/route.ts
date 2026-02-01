import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

type RegistryName = "radix" | "base";
type RegistryItemFile = { path: string; type: string };
type RegistryItem = {
  name: string;
  files?: RegistryItemFile[];
  [key: string]: unknown;
};
type Registry = { items: RegistryItem[] };

const loadRegistry = async (registry: RegistryName): Promise<Registry> => {
  if (registry === "base") {
    const registryData = await import("@/registry.base.json");
    return registryData.default as Registry;
  }

  const registryData = await import("@/registry.radix.json");
  return registryData.default as Registry;
};

const parseRegistry = (registry?: string): RegistryName | null => {
  if (registry === "radix" || registry === "base") {
    return registry;
  }

  return null;
};

export const generateStaticParams = async () => {
  const [radixRegistry, baseRegistry] = await Promise.all([
    loadRegistry("radix"),
    loadRegistry("base"),
  ]);

  return [
    ...radixRegistry.items.map((item) => ({
      registry: "radix",
      name: item.name,
    })),
    ...baseRegistry.items.map((item) => ({
      registry: "base",
      name: item.name,
    })),
  ];
};

// This route shows an example for serving a component using a route handler.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ registry: string; name: string }> },
) {
  try {
    const { registry: registryParam, name } = await params;
    const registryName = parseRegistry(registryParam);

    if (!registryName) {
      return NextResponse.json(
        { error: "Registry not found" },
        { status: 404 },
      );
    }

    const registry = await loadRegistry(registryName);

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
        return { ...file, content };
      }),
    );

    // Return the component with the files.
    return NextResponse.json({ ...component, files: filesWithContent });
  } catch (error) {
    console.error("Error processing component request:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
