import { setRequestLocale } from "next-intl/server"
import { BarChart3, CalendarCheck, DollarSign, Eye, Star, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getBookings } from "@/lib/mock/api"
import { PROVIDERS, SERVICES } from "@/lib/mock/data"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { Link } from "@/i18n/navigation"

export default async function ProviderDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bookings = await getBookings()

  const provider = PROVIDERS[0]
  const providerServices = SERVICES.filter(s => s.providerId === provider.id)

  const totalRevenue = bookings.filter(b => b.status === "completed").reduce((sum, b) => sum + b.priceThb, 0)
  const pendingBookings = bookings.filter(b => b.status === "pending").length
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length

  const recentBookings = bookings.slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">{provider.name}</h1>
          <p className="text-on-surface-dim text-sm">{provider.city} · {provider.categoryName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={provider.verified ? "verified" : "outline"}>{provider.verified ? "✓ Verified" : "Pending Verification"}</Badge>
          <Badge variant={provider.listingTier === "premium" ? "premium" : "outline"} className="capitalize">
            {provider.listingTier}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: "Total Revenue", value: formatCurrency(totalRevenue), sub: "All time", color: "text-secondary" },
          { icon: CalendarCheck, label: "Active Bookings", value: String(confirmedBookings + pendingBookings), sub: `${pendingBookings} pending`, color: "text-primary" },
          { icon: Eye, label: "Profile Views", value: "1,240", sub: "Last 30 days", color: "text-on-surface" },
          { icon: Star, label: "Avg. Rating", value: `${provider.avgRating.toFixed(1)} / 5`, sub: `${provider.reviewCount} reviews`, color: "text-gold" },
        ].map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-surface-white border border-outline-light/60 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-surface-container rounded-lg">
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
                <span className="text-xs text-on-surface-dim">{card.label}</span>
              </div>
              <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-xs text-on-surface-dim mt-0.5">{card.sub}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent bookings */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-on-surface">Recent Bookings</h3>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/provider/bookings">View All</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {recentBookings.map(booking => (
              <div key={booking.id} className="flex items-center justify-between gap-3 border-b border-outline-light/40 pb-3 last:border-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">{booking.serviceName}</p>
                  <p className="text-xs text-on-surface-dim">{booking.bookingDate}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant={booking.status === "completed" ? "success" : booking.status === "confirmed" ? "default" : booking.status === "pending" ? "warning" : "outline"}
                    className="text-xs"
                  >
                    {booking.status}
                  </Badge>
                  <span className="text-sm font-semibold text-on-surface">{formatCurrency(booking.priceThb)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services performance */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-on-surface">Services Performance</h3>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/provider/listings">Manage</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {providerServices.map(svc => (
              <div key={svc.id}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-on-surface truncate max-w-[180px]">{svc.name}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                    <span className="text-xs font-medium text-on-surface">{svc.avgRating.toFixed(1)}</span>
                    <span className="text-xs text-on-surface-dim">({svc.reviewCount})</span>
                  </div>
                </div>
                <Progress value={svc.avgRating * 20} className="h-1.5" indicatorClassName="bg-gold" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust score */}
      <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-on-surface">Trust Score: {provider.trustScore.toFixed(1)}</h3>
          <Badge variant="verified">⭐ {provider.trustScore >= 4.5 ? "Excellent" : "Good"}</Badge>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Response Rate", value: provider.responseRate },
            { label: "Completion Rate", value: provider.completionRate },
            { label: "Rating Score", value: provider.avgRating * 20 },
          ].map(metric => (
            <div key={metric.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-on-surface-dim">{metric.label}</span>
                <span className="font-semibold text-on-surface">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" indicatorClassName="bg-secondary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
