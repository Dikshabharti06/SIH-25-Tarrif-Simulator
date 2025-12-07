"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all select-none",
  {
    variants: {
      variant: {
        default:
          "text-green-700 bg-white border border-green-400 hover:bg-green-50",
        active:
          "bg-green-700 text-white hover:bg-green-800 border border-green-800",
      },
      size: {
        default: "h-9 px-3 min-w-10 text-sm",
        sm: "h-8 px-2 min-w-8 text-xs",
        lg: "h-10 px-4 min-w-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        toggleVariants({
          variant,
          size,
        }),
        "data-[state=on]:bg-green-700 data-[state=on]:text-white", // ACTIVE STATE
        className
      )}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
