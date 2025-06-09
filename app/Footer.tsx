import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex flex-row items-center justify-between px-4 py-2">
      <Button variant="link" asChild>
        <a href="https://www.lloydrichards.dev" target="_blank">
          lloydrichards.dev
        </a>
      </Button>
      <Button variant="link" asChild>
        <a
          href="https://github.com/lloydrichards/shadcn-storybook-registry"
          target="_blank"
        >
          <Code2 size={24} /> Repo
        </a>
      </Button>
    </footer>
  );
};
