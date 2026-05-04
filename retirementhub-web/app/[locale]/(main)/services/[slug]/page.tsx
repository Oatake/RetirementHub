import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { MapPin, Clock, CheckCircle2, XCircle, ShieldCheck, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/shared/star-rating"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { getServiceBySlug, getReviewsByService, getProviderById } from "@/lib/mock/api"
import { formatCurrency, timeAgo } from "@/lib/utils"

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const [reviews, provider] = await Promise.all([
    getReviewsByService(service.id),
    getProviderById(service.providerId),
  ])

  const ratingDimensions = [
    { label: "Service Quality", key: "ratingQuality" as const },
    { label: "Value for Money", key: "ratingValue" as const },
    { label: "Convenience", key: "ratingEase" as const },
    { label: "Trustworthiness", key: "ratingTrust" as const },
  ]

  const avgDimensions = ratingDimensions.map(d => ({
    ...d,
    avg: reviews.length
      ? reviews.reduce((sum, r) => sum + r[d.key], 0) / reviews.length
      : 0,
  }))

  const recommendPercent = reviews.length
    ? Math.round((reviews.filter(r => r.wouldRecommend).length / reviews.length) * 100)
    : 0

  const cancellationLabels = {
    free: "✅ Free cancellation",
    partial: "Partial refund on cancellation",
    no_refund: "No refund on cancellation",
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-on-surface-dim mb-6">
        <Link href="/services" className="hover:text-primary">Services</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/services?category=${service.categoryId}`} className="hover:text-primary">{service.categoryName}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-on-surface line-clamp-1">{service.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image gallery */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-container">
            <Image
              src={service.images[0] || "https://picsum.photos/seed/placeholder/800/500"}
              alt={service.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {service.isSponsored && <Badge variant="sponsored">Sponsored</Badge>}
            </div>
          </div>
          {service.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {service.images.map((img, i) => (
                <div key={i} className="relative h-20 w-32 shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <Image src={img} alt={`${service.name} ${i + 1}`} fill className="object-cover" sizes="128px" />
                </div>
              ))}
            </div>
          )}

          {/* Title + basics */}
          <div>
            <div className="flex items-start gap-3 flex-wrap mb-2">
              <Badge variant="outline">{service.categoryName}</Badge>
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3 w-3" />{service.city}
              </Badge>
              {service.durationDays && (
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />{service.durationDays} day{service.durationDays > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-on-surface mb-1">{service.name}</h1>
            <p className="text-on-surface-dim text-sm mb-3">
              by{" "}
              <Link href={`/providers/${service.providerId}`} className="text-primary hover:underline font-medium">
                {service.providerName}
              </Link>
            </p>
            {service.reviewCount > 0 && (
              <StarRating rating={service.avgRating} count={service.reviewCount} size="md" />
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-2">About this service</h2>
            <p className="text-on-surface leading-relaxed">{service.description}</p>
          </div>

          {/* What's included */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-on-surface mb-3">What&apos;s included</h3>
              <ul className="space-y-2">
                {service.whatIsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-on-surface">
                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {service.whatIsNotIncluded.length > 0 && (
              <div>
                <h3 className="font-semibold text-on-surface mb-3">Not included</h3>
                <ul className="space-y-2">
                  {service.whatIsNotIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-on-surface-dim">
                      <XCircle className="h-4 w-4 text-outline shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Provider info card */}
          {provider && (
            <div className="bg-surface-low border border-outline-light/60 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-on-surface">{provider.name}</h3>
                    {provider.verified && (
                      <Badge variant="verified" className="gap-1 text-xs">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                    {provider.listingTier === "premium" && <Badge variant="premium">Premium</Badge>}
                  </div>
                  <p className="text-xs text-on-surface-dim mb-2">
                    {provider.city} · Active for {provider.yearsActive} year{provider.yearsActive !== 1 ? "s" : ""}
                  </p>
                  <StarRating rating={provider.avgRating} count={provider.reviewCount} size="sm" />
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/providers/${provider.id}`}>View Provider</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-4">
              Reviews ({reviews.length})
            </h2>
            {reviews.length > 0 ? (
              <>
                {/* Rating summary */}
                <div className="grid sm:grid-cols-2 gap-6 p-5 bg-surface-low rounded-xl border border-outline-light/60 mb-5">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-on-surface">{service.avgRating.toFixed(1)}</div>
                    <StarRating rating={service.avgRating} showCount={false} size="lg" className="justify-center mb-1" />
                    <p className="text-sm text-on-surface-dim">{reviews.length} verified reviews</p>
                    <p className="text-sm font-medium text-secondary mt-1">{recommendPercent}% would recommend</p>
                  </div>
                  <div className="space-y-2">
                    {avgDimensions.map(d => (
                      <div key={d.key} className="flex items-center gap-3">
                        <span className="text-xs text-on-surface-dim w-28 shrink-0">{d.label}</span>
                        <Progress value={d.avg * 20} className="flex-1 h-1.5" indicatorClassName="bg-gold" />
                        <span className="text-xs font-medium text-on-surface w-6 text-right">{d.avg.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual reviews */}
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="p-5 bg-surface-white border border-outline-light/60 rounded-xl">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                            {review.reviewerName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-on-surface">{review.reviewerName}</p>
                            <p className="text-xs text-on-surface-dim">{review.reviewerNationality} · {review.visitDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <StarRating rating={review.ratingOverall} showCount={false} size="sm" />
                          {review.isVerified && <Badge variant="verified" className="text-xs">Verified</Badge>}
                        </div>
                      </div>
                      <p className="text-sm text-on-surface leading-relaxed mb-3">{review.body}</p>
                      {review.providerResponse && (
                        <div className="mt-3 p-3 bg-surface-low rounded-lg border-l-4 border-primary/30">
                          <p className="text-xs font-semibold text-on-surface-dim mb-1">Provider response</p>
                          <p className="text-sm text-on-surface">{review.providerResponse}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-outline-light/60">
                        <button className="text-xs text-on-surface-dim hover:text-primary flex items-center gap-1">
                          <Star className="h-3 w-3" /> Helpful ({review.helpfulCount})
                        </button>
                        <span className="text-xs text-on-surface-dim">{timeAgo(review.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 bg-surface-low rounded-xl border border-outline-light/60">
                <p className="text-on-surface-dim">Be the first to review this service</p>
              </div>
            )}
          </div>
        </div>

        {/* Booking sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-surface-white border border-outline-light/60 rounded-2xl shadow-card p-6 space-y-4">
            <div>
              {service.priceType !== "contact" && (
                <p className="text-xs text-on-surface-dim">{service.priceType === "from" ? "From" : "Price"}</p>
              )}
              {service.priceType === "contact" ? (
                <p className="text-xl font-bold text-on-surface">Contact for pricing</p>
              ) : (
                <p className="text-3xl font-bold text-primary">{formatCurrency(service.priceThb)}</p>
              )}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-on-surface-dim">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{service.city}</span>
              </div>
              {service.durationDays && (
                <div className="flex items-center gap-2 text-on-surface-dim">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{service.durationDays} day{service.durationDays > 1 ? "s" : ""}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-on-surface-dim">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>{cancellationLabels[service.cancellationPolicy]}</span>
              </div>
            </div>

            <Separator />

            {service.isBookable ? (
              <Button className="w-full" size="lg" asChild>
                <Link href={`/services/${service.slug}/book`}>Book Now</Link>
              </Button>
            ) : (
              <Button variant="outline" className="w-full" size="lg">
                Contact Provider
              </Button>
            )}

            <Button variant="ghost" className="w-full text-on-surface-dim">
              Save to Wishlist
            </Button>

            <p className="text-xs text-on-surface-dim text-center">
              No payment required to enquire. Cancel for free if eligible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
