import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        "primary-purple":
          "bg-primary-purple text-primary-foreground shadow-xs hover:bg-primary-purple/90",
        "primary-purple-3d":
          "bg-primary-purple text-white rounded-[6.514px] border-r-[2.606px] border-b-[6.514px] border-[#7446AC] hover:bg-primary-purple/90",
        "yellow-3d":
          "bg-[#FFCB22] text-white rounded-[6.514px] border-r-[2.606px] border-b-[6.514px] border-[#D98E08] hover:bg-[#FFCB22]/90",
        "primary-bordered":
          "bg-[#7446AC] text-primary-foreground shadow-xs hover:bg-[#7446AC]/90 border border-white/60 text-[6.156px] !rounded-[3px]",
        "default-gradient":
          "text-white shadow-xs hover:scale-90 active:scale-100 primary-button-gradient-border bg-[linear-gradient(98deg,rgba(102,254,203,0.20)_6.1%,rgba(137,64,255,0.20)_103.66%)] font-semibold text-[#A4CCED]",
        "default-bordered":
          "bg-[#121010] text-white shadow-xs hover:bg-[#121010]/90 border border-white/60",
        default:
          "bg-[#121010] text-white shadow-xs hover:bg-[#121010]/90",
        success:
          "bg-[#34C759] text-primary-foreground shadow-xs hover:bg-[#34C759]/90 border border-white/60 text-[6.156px] !rounded-[3px] cursor-not-allowed",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        gradient: "text-[#fffff] shadow-xs hover:bg-[#121010]/10  bg-[linear-gradient(98deg,#8AE5CF_6.1%,#7C3AE7_103.66%)]    font-semibold",
        "admin-form": "text-[#fffff] shadow-xs hover:bg-[#8AE5CF]/10 border border-[#8AE5CF] font-semibold",

        "outline-gradient": "text-white shadow-xs hover:bg-[#121010]/10 primary-button-gradient-border font-semibold text-[#A4CCED]",
        "thin-outline-gradient": "text-white shadow-xs hover:bg-[#121010]/30 thin-gradient-border font-semibold text-[#A4CCED]",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[52px] px-6 py-3 has-[>svg]:px-3",
        "default-gradient": "h-[45px] min-w-[120px] px-6 lg:px-8 has-[>svg]:gap-3",
        xs: "h-5 w-[45px] rounded-md gap-1.5 px-1 has-[>svg]:px-2",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
