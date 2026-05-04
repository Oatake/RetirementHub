import { setRequestLocale } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Plus, Star, Eye, Edit, Pause, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SERVICES, PROVIDERS } from "@/lib/mock/data"
import { formatCurrency } from "@/lib/utils"

export default async function ListingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const provider = PROVIDERS[0]
  const listings = SERVICES.filter(s => s.providerId === provider.id)

  const statusConfig = {
    active: { label: "Active", variant: "success" as const },
    paused: { label: "Paused", variant: "warning" as const },
    draft: { label: "Draft", variant: "outline" as const },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">My Listings</h1>
          <p className="text-on-surface-dim text-sm">{listings.length} service{listings.length !== 1 ? "s" : ""} listed</p>
        </div>
        <Button className="gap-1.5">
          <Plus className="h-4 w-4" /> Add New Service
        </Button>
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {listings.map(service => {
          const status = statusConfig[service.status]
          return (
            <div key={service.id} className="bg-surface-white border border-outline-light/60 rounded-xl overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="relative h-20 w-32 rounded-lg overflow-hidden bg-surface-container shrink-0">
                  <Image
                    src={service.images[0] || "https://picsum.photos/seed/placeholder/300/200"}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-on-surface">{service.name}</h3>
                      <Badge variant={status.variant} className="text-xs">{status.label}</Badge>
                      {service.isSponsored && <Badge variant="sponsored" className="text-xs">Sponsored</Badge>}
                    </div>
                    <span className="text-sm font-bold text-primary shrink-0">
                      {service.priceType === "contact" ? "Contact" : `${service.priceType === "from" ? "From " : ""}${formatCurrency(service.priceThb)}`}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-dim mb-2">{service.categoryName} · {service.city}</p>
                  <div className="flex items-center gap-4 text-xs text-on-surface-dim">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                      <span className="font-medium text-on-surface">{service.avgRating.toFixed(1)}</span>
                      <span>({service.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>245 views</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-outline-light/60 px-4 py-3 flex gap-2">
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Edit className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5">
                  <Eye className="h-3.5 w-3.5" /> Preview
                </Button>
                {service.status === "active" ? (
                  <Button size="sm" variant="ghost" className="gap-1.5 text-gold">
                    <Pause className="h-3.5 w-3.5" /> Pause
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost" className="gap-1.5 text-secondary">
                    Activate
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="gap-1.5 text-error ml-auto">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-16 bg-surface-white border border-outline-light/60 rounded-2xl">
          <h3 className="font-semibold text-on-surface mb-2">No listings yet</h3>
          <p className="text-on-surface-dim text-sm mb-4">Create your first service listing to start receiving bookings</p>
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" /> Add New Service
          </Button>
        </div>
      )}

      {/* Upgrade CTA */}
      {provider.listingTier !== "premium" && (
        <div className="bg-gold/8 border border-gold/20 rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-on-surface mb-1">⭐ Upgrade to Premium</p>
            <p className="text-sm text-on-surface-dim">Get priority placement, sponsored badges, and unlimited listings for ฿2,900/month.</p>
          </div>
          <Button variant="outline" className="shrink-0">Upgrade Now</Button>
        </div>
      )}
    </div>
  )
}
