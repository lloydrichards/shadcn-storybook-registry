"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CommandBlock = ({
  command,
  name,
}: {
  command: string;
  name: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    toast("Copied to clipboard");
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div className="my-2 flex">
      <Input
        data-checked={copied}
        value={command}
        readOnly
        aria-label="Copy command"
        className="bg-accent data-[checked=true]:bg-card flex h-10 cursor-pointer items-center overflow-x-auto rounded-none rounded-l-md border px-2 font-mono whitespace-nowrap"
        onClick={handleCopy}
      />
      <Button
        className="h-10 w-14 rounded-none rounded-r-md"
        size="icon"
        onClick={handleCopy}
        data-umami-event="Copy command button"
        data-umami-event-name={name}
      >
        <span className="sr-only">Copy command</span>
        <Copy />
      </Button>
    </div>
  );
};
