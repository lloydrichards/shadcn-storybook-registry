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
    <div className="item relative my-2.5 flex">
      <pre
        data-checked={copied}
        className="flex h-12 cursor-pointer items-center overflow-x-auto whitespace-nowrap rounded-l-md border border-gray-300 bg-gray-100 px-2 font-mono data-[checked=true]:bg-green-300"
        onClick={handleCopy}
      >
        {command}
      </pre>
      <Button
        className="h-12 w-14 rounded-none rounded-r-md"
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
