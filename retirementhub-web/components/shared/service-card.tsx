import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/shared/star-rating"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import type { Service } from "@/lib/mock/types"

interface ServiceCardProps {
  service: Service
  className?: string
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <div className={`group rounded-xl bg-surface-white border border-outline-light/60 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 ${className ?? ""}`}>
      <Link href={`/services/${service.slug}`} className="block">
        <div className="relative h-48 overflow-hidden bg-surface-container">
          <Image
            src={service.images[0] || "https://picsum.photos/seed/placeholder/800/500"}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {service.isSponsored && <Badge variant="sponsored">Sponsored</Badge>}
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-surface-white/90 backdrop-blur-sm">
              {service.categoryName}
            </Badge>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/services/${service.slug}`}>
            <h3 className="font-semibold text-on-surface text-sm leading-snug hover:text-primary transition-colors line-clamp-2">
              {service.name}
            </h3>
          </Link>
        </div>
        <p className="text-xs text-on-surface-dim mb-2">{service.providerName}</p>
        <div className="flex items-center gap-3 text-xs text-on-surface-dim mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {service.city}
          </span>
          {service.durationDays && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {service.durationDays} day{service.durationDays > 1 ? "s" : ""}
            </span>
          )}
        </div>
        {service.reviewCount > 0 ? (
          <StarRating rating={service.avgRating} count={service.reviewCount} size="sm" className="mb-3" />
        ) : (
          <p className="text-xs text-on-surface-dim mb-3">Be the first to review</p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-dim">
              {service.priceType === "from" ? "From " : service.priceType === "contact" ? "" : ""}
            </span>
            {service.priceType === "contact" ? (
              <span className="text-sm font-semibold text-on-surface">Contact for price</span>
            ) : (
              <span className="text-base font-bold text-primary">{formatCurrency(service.priceThb)}</span>
            )}
          </div>
          <Button size="sm" asChild>
            <Link href={`/services/${service.slug}`}>
              {service.isBookable ? "Book Now" : "View Details"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
