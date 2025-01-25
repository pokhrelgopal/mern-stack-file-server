"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeClosed, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
// import { CustomAlertDialog } from "@/components/elements/alert-dialog";

interface KeyContainerProps {
  apiKey?: string;
}

export default function KeyContainer({ apiKey }: KeyContainerProps) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!apiKey) return null;

  const maskedKey = apiKey.replace(/./g, "•").slice(0, -4) + apiKey.slice(-4);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const handleRollKey = () => {};
  return (
    <Card className="h-fit shadow-neutral-100 border-gray-100">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-6 w-6" />
              <span>API Keys</span>
            </CardTitle>
            <CardDescription>View and manage your API keys</CardDescription>
          </div>

          {/* <CustomAlertDialog
            actionText="Roll Key"
            cancelText="Cancel"
            title="Roll API Key"
            onAction={handleRollKey}
            description="This will invalidate the current key and generate a new one. This will affect your existing projects and integrations."
            trigger={
              <Button variant="secondary" className="w-fit" size="sm">
                Roll Key
              </Button>
            }
          /> */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 font-mono text-sm">
            <span className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {showKey ? apiKey : maskedKey}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowKey(!showKey)}
                className="h-8 w-8"
                title={showKey ? "Hide API key" : "Show API key"}
              >
                {showKey ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeClosed className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className="h-8 w-8"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
