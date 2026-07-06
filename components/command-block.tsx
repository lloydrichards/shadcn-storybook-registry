"use client";
import { Button } from "@/bases/radix/components/ui/button";
import { Input } from "@/bases/radix/components/ui/input";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CommandBlock = ({
  command,
  name,
  label = "Copy command",
  compact = false,
}: {
  command: string;
  name: string;
  label?: string;
  compact?: boolean;
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
    <div className="flex min-w-0">
      <Input
        data-checked={copied}
        value={command}
        readOnly
        aria-label={label}
        className="h-10 min-w-0 cursor-pointer truncate rounded-none rounded-l-md border bg-accent px-2 font-mono text-xs data-[checked=true]:bg-card"
        onClick={handleCopy}
      />
      <Button
        className="h-10 w-12 rounded-none rounded-r-md sm:w-14"
        size="icon"
        onClick={handleCopy}
        data-umami-event="Copy command button"
        data-umami-event-name={name}
      >
        <span className="sr-only">{label}</span>
        <Copy />
        {!compact && (
          <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
        )}
      </Button>
    </div>
  );
};
