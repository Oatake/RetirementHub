import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  count?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
  className?: string
}

export function StarRating({ rating, count, size = "md", showCount = true, className }: StarRatingProps) {
  const sizes = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-5 w-5" }
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizes[size],
              star <= Math.round(rating)
                ? "fill-gold text-gold"
                : star - 0.5 <= rating
                  ? "fill-gold/50 text-gold"
                  : "fill-surface-container text-outline-light"
            )}
          />
        ))}
      </div>
      <span className={cn("font-semibold text-on-surface", textSizes[size])}>{rating.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className={cn("text-on-surface-dim", textSizes[size])}>({count.toLocaleString()})</span>
      )}
    </div>
  )
}
