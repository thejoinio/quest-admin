"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        default: "bg-primary",
        gradient: "bg-[linear-gradient(90deg,#0A1656_-0.17%,#1630BC_95.6%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);


function Progress({
  className,
  variant,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & VariantProps<typeof progressIndicatorVariants>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        // className="bg-primary h-full w-full flex-1 transition-all"
        className={cn(progressIndicatorVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
