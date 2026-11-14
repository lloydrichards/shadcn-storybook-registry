export const rewriteRegistryImports = (content: string): string =>
  content.replace(/@\/bases\/[^/]+\/(components|hooks|lib)(?=\/)/g, "@/$1");
