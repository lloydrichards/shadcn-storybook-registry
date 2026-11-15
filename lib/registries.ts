export const registryNames = ["radix", "base", "aria"] as const;
export type RegistryName = (typeof registryNames)[number];

export const registryLabels: Record<RegistryName, string> = {
  radix: "Radix UI",
  base: "Base UI",
  aria: "React Aria",
};

export function isRegistryName(value: unknown): value is RegistryName {
  return registryNames.some((name) => name === value);
}
