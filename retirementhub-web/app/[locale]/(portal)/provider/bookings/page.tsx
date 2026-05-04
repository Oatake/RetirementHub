import { setRequestLocale } from "next-intl/server"
import Image from "next/image"
import { CalendarDays, CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getBookings } from "@/lib/mock/api"
import { formatCurrency } from "@/lib/utils"

const STATUS_CONFIG = {
  pending: { label: "Pending", variant: "warning" as const, icon: Clock },
  confirmed: { label: "Confirmed", variant: "default" as const, icon: CheckCircle },
  completed: { label: "Completed", variant: "success" as const, icon: CheckCircle },
  cancelled: { label: "Cancelled", variant: "outline" as const, icon: XCircle },
}

export default async function ProviderBookingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bookings = await getBookings()

  const pending = bookings.filter(b => b.status === "pending")
  const active = bookings.filter(b => b.status === "confirmed")
  const past = bookings.filter(b => b.status === "completed" || b.status === "cancelled")

  const sections = [
    { title: "Pending Action", bookings: pending, showActions: true },
    { title: "Active Bookings", bookings: active, showActions: false },
    { title: "Past Bookings", bookings: past, showActions: false },
  ].filter(s => s.bookings.length > 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Bookings</h1>
          <p className="text-on-surface-dim text-sm">{bookings.length} total · {pending.length} pending action</p>
        </div>
        {pending.length > 0 && (
          <Badge variant="warning" className="text-sm px-3 py-1.5">
            {pending.length} booking{pending.length > 1 ? "s" : ""} need response
          </Badge>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Pending", count: pending.length, color: "text-gold" },
          { label: "Active", count: active.length, color: "text-primary" },
          { label: "Completed", count: bookings.filter(b => b.status === "completed").length, color: "text-secondary" },
          { label: "Cancelled", count: bookings.filter(b => b.status === "cancelled").length, color: "text-on-surface-dim" },
        ].map(stat => (
          <div key={stat.label} className="bg-surface-white border border-outline-light/60 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-xs text-on-surface-dim mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Booking sections */}
      {sections.map(section => (
        <div key={section.title}>
          <h2 className="text-sm font-semibold text-on-surface-dim uppercase tracking-wide mb-3">{section.title}</h2>
          <div className="space-y-3">
            {section.bookings.map(booking => {
              const statusConf = STATUS_CONFIG[booking.status]
              const StatusIcon = statusConf.icon
              return (
                <div key={booking.id} className="bg-surface-white border border-outline-light/60 rounded-xl overflow-hidden">
                  <div className="flex gap-4 p-4">
                    <div className="relative h-16 w-24 rounded-lg overflow-hidden bg-surface-container shrink-0">
                      <Image src={booking.image} alt={booking.serviceName} fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                        <div>
                          <h3 className="text-sm font-semibold text-on-surface line-clamp-1">{booking.serviceName}</h3>
                          <p className="text-xs text-on-surface-dim">Customer: {booking.userId}</p>
                        </div>
                        <Badge variant={statusConf.variant} className="text-xs shrink-0 gap-1">
                          <StatusIcon className="h-3 w-3" /> {statusConf.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-on-surface-dim flex-wrap mt-1">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>{new Date(booking.bookingDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                        <span className="font-bold text-on-surface">{formatCurrency(booking.priceThb)}</span>
                        <Badge variant={booking.paymentStatus === "paid" ? "success" : booking.paymentStatus === "refunded" ? "outline" : "error"} className="text-xs">
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {section.showActions && (
                    <div className="border-t border-outline-light/60 px-4 py-3 flex gap-2">
                      <Button size="sm" className="gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5" /> Accept
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5 text-error border-error/30">
                        <XCircle className="h-3.5 w-3.5" /> Decline
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1.5 ml-auto">
                        <MessageSquare className="h-3.5 w-3.5" /> Message
                      </Button>
                    </div>
                  )}
                  {!section.showActions && booking.status === "confirmed" && (
                    <div className="border-t border-outline-light/60 px-4 py-3 flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5" /> Mark Complete
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1.5 ml-auto">
                        <MessageSquare className="h-3.5 w-3.5" /> Message
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {bookings.length === 0 && (
        <div className="text-center py-16 bg-surface-white border border-outline-light/60 rounded-2xl">
          <CalendarDays className="h-12 w-12 text-on-surface-dim mx-auto mb-3" />
          <h3 className="font-semibold text-on-surface mb-2">No bookings yet</h3>
          <p className="text-on-surface-dim text-sm">Bookings from customers will appear here</p>
        </div>
      )}
    </div>
  )
}
