import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 text-on-surface-dim">{leftIcon}</div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-lg border border-outline-light bg-surface-white px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-dim/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-on-surface-dim">{rightIcon}</div>
          )}
        </div>
      )
    }
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-outline-light bg-surface-white px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-dim/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
