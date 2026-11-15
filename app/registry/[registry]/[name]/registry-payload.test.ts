import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("consumer registry payloads", () => {
  it.each([
    ["aria", "select-story"],
    ["aria", "typeset-story"],
    ["aria", "all-stories"],
    ["base", "button-story"],
    ["radix", "button-story"],
    ["base", "typeset-story"],
    ["radix", "typeset-story"],
  ])("serves the published %s/%s payload locally", async (registry, name) => {
    const response = await GET(
      new Request(`http://localhost:3000/registry/${registry}/${name}`),
      { params: Promise.resolve({ registry, name }) },
    );
    const published = JSON.parse(
      await readFile(`public/v3/${registry}/${name}.json`, "utf8"),
    );

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload).toEqual(published);
    expect(JSON.stringify(payload)).not.toContain("@/bases/");
  });
});
