import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        outline: "border border-outline-light text-on-surface-dim",
        gold: "bg-gold/10 text-gold",
        success: "bg-secondary/10 text-secondary",
        warning: "bg-gold/10 text-gold",
        error: "bg-error/10 text-error",
        verified: "bg-secondary/10 text-secondary",
        premium: "bg-gold/15 text-gold border border-gold/30",
        sponsored: "bg-primary/10 text-primary border border-primary/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
