import { setRequestLocale } from "next-intl/server"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { CalendarDays, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getBookings } from "@/lib/mock/api"
import { formatCurrency } from "@/lib/utils"

const STATUS_CONFIG = {
  pending: { label: "Pending", variant: "warning" as const },
  confirmed: { label: "Confirmed", variant: "default" as const },
  completed: { label: "Completed", variant: "success" as const },
  cancelled: { label: "Cancelled", variant: "outline" as const },
}

const PAYMENT_CONFIG = {
  unpaid: { label: "Payment Due", variant: "error" as const },
  paid: { label: "Paid", variant: "success" as const },
  refunded: { label: "Refunded", variant: "outline" as const },
}

export default async function BookingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bookings = await getBookings()

  const upcoming = bookings.filter(b => b.status === "pending" || b.status === "confirmed")
  const past = bookings.filter(b => b.status === "completed" || b.status === "cancelled")

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-on-surface mb-1">My Bookings</h1>
        <p className="text-on-surface-dim text-sm">{bookings.length} total booking{bookings.length !== 1 ? "s" : ""}</p>
      </div>

      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-on-surface-dim uppercase tracking-wide mb-3">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-on-surface-dim uppercase tracking-wide mb-3">Past</h2>
          <div className="space-y-3">
            {past.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      {bookings.length === 0 && (
        <div className="text-center py-16 bg-surface-white border border-outline-light/60 rounded-2xl">
          <CalendarDays className="h-12 w-12 text-on-surface-dim mx-auto mb-3" />
          <h3 className="font-semibold text-on-surface mb-2">No bookings yet</h3>
          <p className="text-on-surface-dim text-sm mb-4">Browse services and make your first booking</p>
          <Button asChild>
            <Link href="/services">Browse Services</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

function BookingCard({ booking }: { booking: Awaited<ReturnType<typeof getBookings>>[0] }) {
  const status = STATUS_CONFIG[booking.status]
  const payment = PAYMENT_CONFIG[booking.paymentStatus]

  return (
    <div className="bg-surface-white border border-outline-light/60 rounded-xl overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="relative h-20 w-28 rounded-lg overflow-hidden bg-surface-container shrink-0">
          <Image src={booking.image} alt={booking.serviceName} fill className="object-cover" sizes="112px" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
            <h3 className="text-sm font-semibold text-on-surface line-clamp-1">{booking.serviceName}</h3>
            <Badge variant={status.variant} className="text-xs shrink-0">{status.label}</Badge>
          </div>
          <p className="text-xs text-on-surface-dim mb-2">{booking.providerName}</p>
          <div className="flex items-center gap-3 text-xs text-on-surface-dim flex-wrap">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{new Date(booking.bookingDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
            <span className="font-semibold text-on-surface">{formatCurrency(booking.priceThb)}</span>
            <Badge variant={payment.variant} className="text-xs">{payment.label}</Badge>
          </div>
        </div>
      </div>
      {(booking.status === "completed" || booking.status === "confirmed") && (
        <div className="border-t border-outline-light/60 px-4 py-3 flex gap-2">
          {booking.status === "completed" && !booking.hasReview && (
            <Button size="sm" variant="outline" className="gap-1.5">
              <Star className="h-3.5 w-3.5" /> Write a Review
            </Button>
          )}
          {booking.status === "completed" && booking.hasReview && (
            <span className="text-xs text-secondary flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-current" /> Review submitted
            </span>
          )}
          <Button size="sm" variant="ghost" asChild className="ml-auto">
            <Link href={`/services/${booking.serviceId}`}>View Service</Link>
          </Button>
        </div>
      )}
      {booking.status === "cancelled" && (
        <div className="border-t border-outline-light/60 px-4 py-3">
          <p className="text-xs text-on-surface-dim">
            {booking.paymentStatus === "refunded" ? "Refund processed" : "No payment was taken"}
          </p>
        </div>
      )}
    </div>
  )
}
