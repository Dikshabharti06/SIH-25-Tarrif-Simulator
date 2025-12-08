"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-green-100 text-green-800 inline-flex h-10 w-full items-center justify-center rounded-lg p-1",
        className
      )}
      {...props}
    />
  );
}

// --- UPDATED COMPONENT ---
function TabsTrigger({
  className,
  indicatorClassName, // 1. Destructure it here (pulls it out of props)
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & { indicatorClassName?: string }) { // 2. Add type definition
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
        "text-green-900 hover:bg-green-200",
        "data-[state=active]:bg-green-700 data-[state=active]:text-white",
        "focus:outline-none focus:ring-2 focus:ring-green-400",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props} // 3. Now this is safe to spread
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("mt-4 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };