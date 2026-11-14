import { readFileSync } from "node:fs";
import path from "node:path";
import { toId } from "storybook/internal/csf";
import ts from "typescript";
import { describe, expect, it } from "vitest";

import { getRegistryPreviewPath } from "@/lib/registry-preview";
import baseRegistry from "@/registry.base.json";
import radixRegistry from "@/registry.radix.json";

function readStoryId(filePath: string): string {
  const source = ts.createSourceFile(
    filePath,
    readFileSync(path.resolve(import.meta.dirname, "..", filePath), "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let title: string | undefined;
  let id: string | undefined;
  function visit(node: ts.Node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(source) === "meta"
    ) {
      let metadata = node.initializer;
      while (
        metadata &&
        (ts.isSatisfiesExpression(metadata) || ts.isAsExpression(metadata))
      ) {
        metadata = metadata.expression;
      }
      if (!metadata || !ts.isObjectLiteralExpression(metadata)) return;
      for (const property of metadata.properties) {
        if (
          ts.isPropertyAssignment(property) &&
          ts.isStringLiteral(property.initializer)
        ) {
          if (property.name.getText(source) === "title")
            title = property.initializer.text;
          if (property.name.getText(source) === "id")
            id = property.initializer.text;
        }
      }
    } else {
      ts.forEachChild(node, visit);
    }
  }
  visit(source);
  if (id) return id;
  if (!title) throw new Error(`Missing story title in ${filePath}`);
  return toId(title);
}

for (const [registry, manifest] of [
  ["base", baseRegistry],
  ["radix", radixRegistry],
] as const) {
  describe(`${registry} registry previews`, () => {
    for (const item of manifest.items) {
      if (item.categories.includes("collection")) {
        it(`${item.name} opens the Storybook collection`, () => {
          expect(getRegistryPreviewPath(item, registry)).toBe("/storybook/");
        });
        continue;
      }
      it(`${item.name} opens its story's docs`, () => {
        const storyFiles = item.files.filter((file) =>
          file.path.endsWith(".stories.tsx"),
        );
        expect(storyFiles).toHaveLength(1);
        const id = readStoryId(storyFiles[0].path);
        expect(getRegistryPreviewPath(item, registry)).toBe(
          `/storybook/?path=/docs/${id}--docs`,
        );
      });
    }
  });
}
