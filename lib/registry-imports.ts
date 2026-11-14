export const rewriteRegistryImports = (content: string): string =>
  content.replace(/@\/bases\/[^/]+\/components/g, "@/components");
