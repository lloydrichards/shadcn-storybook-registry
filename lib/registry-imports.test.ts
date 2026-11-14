import { describe, expect, it } from "vitest";
import { rewriteRegistryImports } from "@/lib/registry-imports";

describe("published registry imports", () => {
  it.each([
    "base",
    "radix",
  ])("maps %s components, hooks, and helpers to consumer aliases", (variant) => {
    const source = `import { CodeBlock } from "@/bases/${variant}/components/ui/code-block";
import { useHighlightedCode } from "@/bases/${variant}/hooks/use-highlighted-code";
import { highlightCode } from "@/bases/${variant}/lib/highlighter";`;
    expect(
      rewriteRegistryImports(source),
    ).toBe(`import { CodeBlock } from "@/components/ui/code-block";
import { useHighlightedCode } from "@/hooks/use-highlighted-code";
import { highlightCode } from "@/lib/highlighter";`);
  });

  it("preserves imports outside the published alias directories", () => {
    const source =
      'import { helper } from "@/lib/utils"; import { value } from "@/bases/base/library";';
    expect(rewriteRegistryImports(source)).toBe(source);
  });
});
