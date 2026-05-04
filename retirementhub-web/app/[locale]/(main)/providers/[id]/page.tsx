import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { MapPin, Phone, Globe, ShieldCheck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/shared/star-rating"
import { ServiceCard } from "@/components/shared/service-card"
import { Progress } from "@/components/ui/progress"
import { getProviderById, getServicesByProvider } from "@/lib/mock/api"

type Props = { params: Promise<{ locale: string; id: string }> }

export default async function ProviderDetailPage({ params }: Props) {
  const { locale, id } = await params
  setRequestLocale(locale)
  const provider = await getProviderById(id)
  if (!provider) notFound()

  const services = await getServicesByProvider(provider.id)

  const trustComponents = [
    { label: "Average Rating", value: provider.avgRating * 20, display: `${provider.avgRating.toFixed(1)}/5.0` },
    { label: "Response Rate", value: provider.responseRate, display: `${provider.responseRate}%` },
    { label: "Completion Rate", value: provider.completionRate, display: `${provider.completionRate}%` },
  ]

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-on-surface-dim mb-6">
        <Link href="/services" className="hover:text-primary">Services</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-on-surface">{provider.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cover image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-container">
            <Image
              src={provider.images[0] || "https://picsum.photos/seed/provider/800/500"}
              alt={provider.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* Provider info */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="outline">{provider.categoryName}</Badge>
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3 w-3" /> {provider.city}
              </Badge>
              {provider.verified && <Badge variant="verified" className="gap-1"><ShieldCheck className="h-3 w-3" /> Verified</Badge>}
              {provider.listingTier === "premium" && <Badge variant="premium">⭐ Premium</Badge>}
            </div>
            <h1 className="text-2xl font-bold text-on-surface mb-2">{provider.name}</h1>
            <StarRating rating={provider.avgRating} count={provider.reviewCount} size="md" className="mb-4" />
            <p className="text-on-surface leading-relaxed">{provider.description}</p>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-4">
              Available Services ({services.length})
            </h2>
            {services.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map(s => <ServiceCard key={s.id} service={s} />)}
              </div>
            ) : (
              <p className="text-on-surface-dim text-sm">No services currently listed.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24 space-y-4">
            {/* Trust score card */}
            <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-on-surface">Trust Score</h3>
                <span className="text-2xl font-bold text-gold">{provider.trustScore.toFixed(1)}</span>
              </div>
              <div className="space-y-3">
                {trustComponents.map(tc => (
                  <div key={tc.label}>
                    <div className="flex justify-between text-xs text-on-surface-dim mb-1">
                      <span>{tc.label}</span>
                      <span className="font-medium text-on-surface">{tc.display}</span>
                    </div>
                    <Progress value={tc.value} className="h-1.5" indicatorClassName="bg-gold" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-on-surface-dim mt-3">
                Based on {provider.reviewCount} verified reviews · Active {provider.yearsActive}y
              </p>
            </div>

            {/* Contact */}
            <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-on-surface">Contact</h3>
              <div className="space-y-2 text-sm text-on-surface-dim">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{provider.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{provider.phone}</span>
                </div>
                {provider.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 shrink-0" />
                    <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Visit website
                    </a>
                  </div>
                )}
              </div>
              <Button className="w-full mt-2" variant="outline">Message Provider</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
