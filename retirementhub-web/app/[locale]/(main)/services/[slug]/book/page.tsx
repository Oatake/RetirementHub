"use client"
import { useState, use } from "react"
import { Link } from "@/i18n/navigation"
import { useRouter } from "@/i18n/navigation"
import { ChevronRight, Calendar, MapPin, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SERVICES } from "@/lib/mock/data"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Props = { params: Promise<{ locale: string; slug: string }> }

export default function BookServicePage({ params }: Props) {
  const { slug } = use(params)
  const router = useRouter()
  const service = SERVICES.find(s => s.slug === slug)

  const [step, setStep] = useState<"details" | "confirm" | "done">("details")
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!service) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-8 text-center">
        <p className="text-on-surface-dim">Service not found.</p>
        <Button asChild variant="outline" className="mt-4"><Link href="/services">Back to Services</Link></Button>
      </div>
    )
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1000))
    setStep("done")
    setIsSubmitting(false)
  }

  if (step === "done") {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-secondary" />
        </div>
        <h1 className="text-2xl font-bold text-on-surface mb-2">Booking Requested!</h1>
        <p className="text-on-surface-dim mb-1">
          Your booking request for <strong>{service.name}</strong> has been sent to {service.providerName}.
        </p>
        <p className="text-sm text-on-surface-dim mb-6">They will confirm within 24 hours. You&apos;ll receive an email notification.</p>
        <div className="space-y-2">
          <Button className="w-full" asChild>
            <Link href="/account/bookings">View My Bookings</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/services">Browse More Services</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-on-surface-dim mb-6">
        <Link href="/services" className="hover:text-primary">Services</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/services/${service.slug}`} className="hover:text-primary line-clamp-1 max-w-[200px]">{service.name}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-on-surface">Book</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-on-surface mb-6">Complete Your Booking</h1>

          {step === "details" && (
            <div className="space-y-5">
              <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5 space-y-4">
                <h2 className="font-semibold text-on-surface">Preferred Date</h2>
                <div className="space-y-1.5">
                  <Label>Select Date</Label>
                  <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full" min={new Date().toISOString().split("T")[0]} />
                </div>
              </div>

              <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5 space-y-4">
                <h2 className="font-semibold text-on-surface">Your Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Full Name</Label>
                    <Input defaultValue="David Chen" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input defaultValue="david.chen@example.com" type="email" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Phone</Label>
                    <Input placeholder="+66 or international" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nationality</Label>
                    <Input defaultValue="British" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Special Requests or Notes (optional)</Label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Any medical conditions, allergies, or specific requirements..."
                    className="w-full resize-none px-3 py-2 rounded-lg border border-outline-light bg-surface-white text-sm text-on-surface placeholder:text-on-surface-dim focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={() => setStep("confirm")} disabled={!date}>
                Review Booking
              </Button>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-5">
              <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
                <h2 className="font-semibold text-on-surface mb-4">Booking Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-dim">Service</span>
                    <span className="font-medium text-on-surface text-right max-w-[60%]">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-dim">Provider</span>
                    <span className="font-medium text-on-surface">{service.providerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-dim">Date Requested</span>
                    <span className="font-medium text-on-surface">{new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-dim">Location</span>
                    <span className="font-medium text-on-surface">{service.city}</span>
                  </div>
                  {notes && (
                    <div className="flex justify-between">
                      <span className="text-on-surface-dim">Notes</span>
                      <span className="font-medium text-on-surface text-right max-w-[60%]">{notes}</span>
                    </div>
                  )}
                  <div className="border-t border-outline-light/60 pt-3 flex justify-between">
                    <span className="text-on-surface-dim">Total</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(service.priceThb)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-low border border-outline-light/60 rounded-xl p-4">
                <div className="flex items-start gap-2 text-sm text-on-surface-dim">
                  <Shield className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                  <p>Payment is processed securely after the provider confirms your booking. Cancellation policy: <strong className="text-on-surface">{service.cancellationPolicy === "free" ? "Free cancellation" : service.cancellationPolicy === "partial" ? "Partial refund" : "No refund"}</strong></p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep("details")}>Back</Button>
                <Button className="flex-1" size="lg" loading={isSubmitting} onClick={handleConfirm}>
                  Confirm Booking Request
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24 bg-surface-white border border-outline-light/60 rounded-2xl p-5 space-y-4">
            <h3 className="font-semibold text-on-surface">Order Summary</h3>
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-lg bg-surface-container shrink-0 overflow-hidden">
                <img src={service.images[0] || "https://picsum.photos/seed/placeholder/100/100"} alt={service.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">{service.name}</p>
                <p className="text-xs text-on-surface-dim">{service.providerName}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-on-surface-dim" />
                  <span className="text-xs text-on-surface-dim">{service.city}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-outline-light/60 pt-4">
              {service.priceType !== "contact" ? (
                <>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-on-surface-dim">Service Fee</span>
                    <span>{formatCurrency(service.priceThb)}</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2 text-base">
                    <span className="text-on-surface">Total</span>
                    <span className="text-primary">{formatCurrency(service.priceThb)}</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-on-surface-dim">Pricing will be confirmed by the provider.</p>
              )}
            </div>
            <div className="space-y-2 text-xs text-on-surface-dim">
              <div className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Secure payment</div>
              <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Subject to availability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
