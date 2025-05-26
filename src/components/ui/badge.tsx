import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-xl border border-zinc-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0093DE] focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-[#0093DE]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0093DE] text-white shadow hover:bg-[#0077b3] dark:bg-[#0093DE] dark:text-white dark:hover:bg-[#0077b3]",
        secondary:
          "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        destructive:
          "border-transparent bg-red-500 text-zinc-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80",
        outline: "text-zinc-950 dark:text-zinc-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
