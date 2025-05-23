import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-[#E4784D] text-white shadow hover:bg-[#d46e45] hover:transform hover:-translate-y-1 transition-all dark:bg-[#F2994A] dark:text-white dark:hover:bg-[#e78939]",
        destructive:
          "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "border-2 border-[#E4784D] bg-transparent text-[#E4784D] shadow-sm hover:bg-[#E4784D] hover:text-white dark:border-[#F2994A] dark:text-[#F2994A] dark:hover:bg-[#F2994A] dark:hover:text-white",
        secondary:
          "bg-[#64A86B] text-white shadow-sm hover:bg-[#568c5c] hover:transform hover:-translate-y-1 transition-all dark:bg-[#4DAA57] dark:text-white dark:hover:bg-[#419048]",
        accent:
          "bg-[#FFCB3C] text-[#2A3B4A] shadow-sm hover:bg-[#f5c235] hover:transform hover:-translate-y-1 transition-all dark:bg-[#FFD166] dark:text-[#1F2937] dark:hover:bg-[#f5c64d]",
        ghost: "hover:bg-[#E4784D]/10 hover:text-[#E4784D] dark:hover:bg-[#F2994A]/10 dark:hover:text-[#F2994A]",
        link: "text-[#E4784D] underline-offset-4 hover:underline dark:text-[#F2994A]",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-full",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
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
