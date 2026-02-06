"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string
  language?: string
}

export function CodeBlock({ code, language, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre
        className={cn(
          "relative mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 p-4 dark:bg-zinc-900",
          "scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent",
          className
        )}
        {...props}
      >
        <code className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm text-zinc-100 whitespace-pre">
          {code}
        </code>
        <button
          onClick={copyToClipboard}
          className={cn(
            "absolute right-2 top-2 sm:right-4 sm:top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-zinc-950 text-zinc-100 transition-opacity hover:bg-zinc-800",
            "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </pre>
    </div>
  )
}

