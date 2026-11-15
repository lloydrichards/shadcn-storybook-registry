import { readFileSync } from "node:fs";
import { getRegistryPreviewPath } from "../lib/registry-preview";
import ariaRegistry from "../registry.aria.json";
import baseRegistry from "../registry.base.json";
import radixRegistry from "../registry.radix.json";

type IndexEntry = { id: string; title: string; importPath: string };

for (const [registry, manifest] of [
  ["aria", ariaRegistry],
  ["base", baseRegistry],
  ["radix", radixRegistry],
] as const) {
  const { entries } = JSON.parse(
    readFileSync(`public/storybook/${registry}/index.json`, "utf8"),
  ) as { entries: Record<string, IndexEntry> };
  if (Object.keys(entries).length === 0) {
    throw new Error(`${registry} Storybook has no entries`);
  }
  for (const entry of Object.values(entries)) {
    if (
      !entry.importPath.endsWith(`-${registry}.stories.tsx`) ||
      (!entry.title.startsWith("ui/") && !entry.title.startsWith("design/")) ||
      /^(ui|design)\/(base|radix|aria)\//.test(entry.title)
    ) {
      throw new Error(
        `${registry} Storybook contains unexpected entry ${entry.id}`,
      );
    }
  }
  for (const item of manifest.items) {
    if (item.categories.includes("collection")) continue;
    const previewPath = getRegistryPreviewPath(item, registry);
    const docsPath = new URL(previewPath, "http://localhost").searchParams.get(
      "path",
    );
    const id = docsPath?.replace(/^\/docs\//, "");
    if (!id || !entries[id]) {
      throw new Error(
        `${registry}/${item.name} preview is absent from the built index`,
      );
    }
  }
  console.log(
    `${registry}: ${Object.keys(entries).length} entries; all registry previews resolve`,
  );
}
