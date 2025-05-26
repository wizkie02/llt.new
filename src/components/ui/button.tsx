import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-[#0093DE] text-white shadow hover:bg-[#0077b3] hover:transform hover:-translate-y-1 transition-all dark:bg-[#0093DE] dark:text-white dark:hover:bg-[#0077b3]",
        destructive:
          "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "border-2 border-[#0093DE] bg-transparent text-[#0093DE] shadow-sm hover:bg-[#0093DE] hover:text-white dark:border-[#0093DE] dark:text-[#0093DE] dark:hover:bg-[#0093DE] dark:hover:text-white",
        secondary:
          "bg-[#64A86B] text-white shadow-sm hover:bg-[#568c5c] hover:transform hover:-translate-y-1 transition-all dark:bg-[#4DAA57] dark:text-white dark:hover:bg-[#419048]",
        accent:
          "bg-[#E4784D] text-white shadow-sm hover:bg-[#d46e45] hover:transform hover:-translate-y-1 transition-all dark:bg-[#E4784D] dark:text-white dark:hover:bg-[#d46e45]",
        ghost: "hover:bg-[#0093DE]/10 hover:text-[#0093DE] dark:hover:bg-[#0093DE]/10 dark:hover:text-[#0093DE]",
        link: "text-[#0093DE] underline-offset-4 hover:underline dark:text-[#0093DE]",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-xl",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
