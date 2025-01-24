"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { Input } from "./ui/input";

const CommandBlock = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
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
        className="flex h-10 cursor-pointer items-center overflow-x-auto whitespace-nowrap rounded-l-md border bg-accent px-2 font-mono data-[checked=true]:bg-card"
        onClick={handleCopy}
      />
      <Button
        className="h-10 w-14 rounded-none rounded-r-md"
        size="icon"
        onClick={handleCopy}
      >
        <span className="sr-only">Copy command</span>
        <Copy />
      </Button>
    </div>
  );
};

export default CommandBlock;
