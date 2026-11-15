import { expect, it } from "vitest";
import manifest from "../registry.aria.json";

it("installs every individual Aria story and its dependencies through all-stories", () => {
  const items = manifest.items.filter((item) => item.name !== "all-stories");
  const collection = manifest.items.find((item) => item.name === "all-stories");
  const files = items.flatMap((item) => item.files);
  expect(new Set(files.map((file) => file.target)).size).toBe(files.length);
  expect(collection?.files).toEqual(expect.arrayContaining(files));
  expect(collection?.files).toHaveLength(files.length);
  for (const field of ["dependencies", "registryDependencies"] as const) {
    expect(new Set(collection?.[field])).toEqual(
      new Set(items.flatMap((item) => item[field] ?? [])),
    );
  }
});
