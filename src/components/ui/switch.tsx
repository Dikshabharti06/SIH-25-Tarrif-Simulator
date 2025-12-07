"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-green-600 transition-all",
        "data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-gray-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "block size-5 rounded-full bg-white shadow-sm transition-transform",
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
