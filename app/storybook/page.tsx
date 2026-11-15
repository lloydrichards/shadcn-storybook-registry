import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storybooks",
  description: "Explore shadcn/ui stories for Base UI or Radix UI.",
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
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="/storybook/base/"
          className="rounded-xl border p-6 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
        >
          <h2 className="font-semibold text-xl">Base UI</h2>
          <p className="mt-2 text-muted-foreground">
            Browse shadcn/ui components built with Base UI.
          </p>
        </a>
        <a
          href="/storybook/radix/"
          className="rounded-xl border p-6 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
        >
          <h2 className="font-semibold text-xl">Radix UI</h2>
          <p className="mt-2 text-muted-foreground">
            Browse shadcn/ui components built with Radix UI.
          </p>
        </a>
      </div>
    </main>
  );
}
