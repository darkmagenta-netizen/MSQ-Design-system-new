"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

export function ComponentPreview({ 
  title, 
  className, 
  children, 
  ...props 
}: ComponentPreviewProps) {
  return (
    <div className={cn("relative my-6 flex flex-col space-y-2", className)} {...props}>
      {title && (
        <div className="w-full rounded-md border bg-muted/50 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-medium">{title}</h3>
          </div>
        </div>
      )}
      <div className="relative">
        <div className="rounded-lg border bg-background shadow-md">
          <div className="p-3 sm:p-4 min-w-fit" style={{ position: 'relative', minHeight: 'fit-content' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

