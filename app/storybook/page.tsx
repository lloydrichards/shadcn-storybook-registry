import { registryLabels } from "@/lib/registries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storybooks",
  description:
    "Explore shadcn/ui stories for Radix UI, Base UI, or React Aria.",
};

export default function StorybookChooser() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-semibold text-3xl tracking-tight">
        Choose a Storybook
      </h1>
      <p className="mt-3 text-muted-foreground">
        Explore component examples and design tokens for your UI library.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {(["base", "radix", "aria"] as const).map((name) => (
          <a
            key={name}
            href={`/storybook/${name}/`}
            className="rounded-xl border p-6 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
          >
            <h2 className="font-semibold text-xl">{registryLabels[name]}</h2>
            <p className="mt-2 text-muted-foreground">
              Browse shadcn/ui components built with {registryLabels[name]}.
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
