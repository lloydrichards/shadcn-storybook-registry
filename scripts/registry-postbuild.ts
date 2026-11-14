import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { rewriteRegistryImports } from "@/lib/registry-imports";

const targets = [
  join(process.cwd(), "public", "v3", "radix"),
  join(process.cwd(), "public", "v3", "base"),
];

const walk = (dir: string): string[] => {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return entry.name.endsWith(".json") ? [fullPath] : [];
  });
};

const rewriteFile = (filePath: string) => {
  const contents = readFileSync(filePath, "utf8");
  const updated = rewriteRegistryImports(contents);

  if (updated !== contents) {
    writeFileSync(filePath, updated, "utf8");
  }
};

targets.flatMap(walk).forEach(rewriteFile);
