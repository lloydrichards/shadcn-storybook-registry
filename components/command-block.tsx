"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

const CommandBlock = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div className="relative flex item my-2.5">
      <pre
        data-checked={copied}
        className="bg-gray-100 data-[checked=true]:bg-green-300 h-12 flex items-center px-2 rounded-l-md border border-gray-300 font-mono cursor-pointer whitespace-nowrap overflow-x-auto"
        onClick={handleCopy}
      >
        {command}
      </pre>
      <Button
        className="w-14 h-12 rounded-none rounded-r-md"
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
