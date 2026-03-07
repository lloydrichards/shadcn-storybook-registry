import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { registryItemSchema, registrySchema } from "shadcn/schema";

const registryVersions = ["v3", "v4"] as const;
const registryVariants = ["base", "radix"] as const;

const readJsonFile = (filePath: string): unknown =>
  JSON.parse(readFileSync(filePath, "utf8"));

const getRegistryItemFiles = (dir: string): string[] =>
  readdirSync(dir)
    .filter((f) => f.endsWith(".json") && f !== "registry.json")
    .map((f) => join(dir, f));

describe("Registry compatibility", () => {
  for (const version of registryVersions) {
    for (const variant of registryVariants) {
      const dir = join(process.cwd(), "public", version, variant);

      describe(`${version}/${variant}`, () => {
        it("registry.json matches registrySchema", () => {
          const registryJson = readJsonFile(join(dir, "registry.json"));
          const result = registrySchema.safeParse(registryJson);
          expect(result.success, JSON.stringify(result.error?.issues)).toBe(
            true,
          );
        });

        it("all items match registryItemSchema", () => {
          const files = getRegistryItemFiles(dir);
          expect(files.length).toBeGreaterThan(0);

          for (const filePath of files) {
            const item = readJsonFile(filePath);
            const result = registryItemSchema.safeParse(item);
            expect(
              result.success,
              `${filePath}: ${JSON.stringify(result.error?.issues)}`,
            ).toBe(true);
          }
        });

        it("no items contain unrewritten @/bases/ imports", () => {
          const files = getRegistryItemFiles(dir);

          for (const filePath of files) {
            const contents = readFileSync(filePath, "utf8");
            expect(
              contents,
              `${filePath} still contains @/bases/ import path`,
            ).not.toMatch(/@\/bases\//);
          }
        });
      });
    }
  }
});
