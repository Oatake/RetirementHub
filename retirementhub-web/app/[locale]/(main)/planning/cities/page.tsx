"use client"
import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { ChevronRight, Wifi, Heart, Shield, Sun, Users, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CITIES } from "@/lib/mock/data"
import { formatCurrency, localizedField } from "@/lib/utils"

const ALL_CITIES = CITIES

function RatingDots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={`h-2 w-2 rounded-full ${i < value ? "bg-primary" : "bg-surface-container"}`} />
      ))}
    </div>
  )
}

function AqiBadge({ aqi }: { aqi: string }) {
  const colors: Record<string, string> = { Good: "bg-secondary/10 text-secondary", Moderate: "bg-gold/10 text-gold", Poor: "bg-error/10 text-error" }
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[aqi] ?? "bg-surface-container text-on-surface-dim"}`}>{aqi}</span>
}

export default function CitiesPage() {
  const t = useTranslations("Planning")
  const tNav = useTranslations("Nav")
  const locale = useLocale()
  const [selectedCities, setSelectedCities] = useState<string[]>(["chiang-mai", "bangkok"])

  const toggleCity = (slug: string) => {
    if (selectedCities.includes(slug)) {
      if (selectedCities.length > 1) setSelectedCities(prev => prev.filter(s => s !== slug))
    } else {
      if (selectedCities.length < 3) setSelectedCities(prev => [...prev, slug])
    }
  }

  const comparing = ALL_CITIES.filter(c => selectedCities.includes(c.slug))

  const monthlyCost = (city: typeof ALL_CITIES[0]) =>
    city.costOfLiving.rentOneBed + city.costOfLiving.mealLocal * 30 + city.costOfLiving.transport + city.costOfLiving.utilities + city.costOfLiving.entertainment

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-on-surface-dim mb-6">
        <Link href="/planning/dashboard" className="hover:text-primary">{tNav("planning")}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-on-surface">{t("breadcrumbCities")}</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-on-surface mb-2">{t("citiesTitle")}</h1>
        <p className="text-on-surface-dim">{t("citiesSubtitle")}</p>
      </div>

      {/* City selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {ALL_CITIES.map(city => (
          <button
            key={city.slug}
            onClick={() => toggleCity(city.slug)}
            className={`relative rounded-xl overflow-hidden aspect-[4/3] transition-all ${selectedCities.includes(city.slug) ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"}`}
          >
            <Image src={city.image} alt={localizedField(city.name, city.name_th, locale)} fill className="object-cover" sizes="200px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
              <span className="text-white text-xs font-semibold">{localizedField(city.name, city.name_th, locale)}</span>
            </div>
            {selectedCities.includes(city.slug) && (
              <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{selectedCities.indexOf(city.slug) + 1}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <td className="w-48 pb-4" />
              {comparing.map(city => (
                <th key={city.slug} className="pb-4 px-4 text-left min-w-[180px]">
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-2">
                    <Image src={city.image} alt={localizedField(city.name, city.name_th, locale)} fill className="object-cover" sizes="200px" />
                  </div>
                  <p className="font-bold text-on-surface">{localizedField(city.name, city.name_th, locale)}</p>
                  <p className="text-xs text-on-surface-dim font-bold text-primary mt-0.5">
                    ~{formatCurrency(monthlyCost(city))}/mo
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {/* Section: Cost of Living */}
            <tr><td colSpan={comparing.length + 1} className="py-3 font-semibold text-on-surface-dim text-xs uppercase tracking-wider border-b border-outline-light/60">{t("costOfLiving")}</td></tr>
            {[
              { label: t("rent1BR"), key: (c: typeof ALL_CITIES[0]) => formatCurrency(c.costOfLiving.rentOneBed) },
              { label: t("mealLocalLabel"), key: (c: typeof ALL_CITIES[0]) => formatCurrency(c.costOfLiving.mealLocal) },
              { label: t("transportLabel"), key: (c: typeof ALL_CITIES[0]) => formatCurrency(c.costOfLiving.transport) },
              { label: t("utilitiesLabel"), key: (c: typeof ALL_CITIES[0]) => formatCurrency(c.costOfLiving.utilities) },
            ].map(row => (
              <tr key={row.label} className="border-b border-outline-light/30">
                <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{row.label}</td>
                {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{row.key(city)}</td>)}
              </tr>
            ))}

            {/* Section: Healthcare */}
            <tr><td colSpan={comparing.length + 1} className="py-3 font-semibold text-on-surface-dim text-xs uppercase tracking-wider border-b border-outline-light/60 pt-5">{t("healthcare")}</td></tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{t("intlHospitals")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{city.healthcare.internationalHospitals}</td>)}
            </tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{t("specialistCost")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{formatCurrency(city.healthcare.specialistCost)}</td>)}
            </tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{t("insuranceRange")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface text-xs">{city.healthcare.insuranceCostRange}</td>)}
            </tr>

            {/* Section: Climate */}
            <tr><td colSpan={comparing.length + 1} className="py-3 font-semibold text-on-surface-dim text-xs uppercase tracking-wider border-b border-outline-light/60 pt-5">{t("climate")}</td></tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium flex items-center gap-1"><Sun className="h-3.5 w-3.5" /> {t("avgTemp")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{city.climate.avgTemp}°C</td>)}
            </tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{t("rainyMonths")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{city.climate.rainyMonths} {t("monthsLabel")}</td>)}
            </tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{t("airQuality")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4"><AqiBadge aqi={city.climate.aqiAvg} /></td>)}
            </tr>

            {/* Section: Expat Community */}
            <tr><td colSpan={comparing.length + 1} className="py-3 font-semibold text-on-surface-dim text-xs uppercase tracking-wider border-b border-outline-light/60 pt-5">{t("expat")}</td></tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {t("estExpats")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{city.expatCommunity.estimatedExpats.toLocaleString()}</td>)}
            </tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{t("englishLabel")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{city.expatCommunity.englishPrevalence}</td>)}
            </tr>

            {/* Section: Lifestyle */}
            <tr><td colSpan={comparing.length + 1} className="py-3 font-semibold text-on-surface-dim text-xs uppercase tracking-wider border-b border-outline-light/60 pt-5">{t("lifestyleLabel")}</td></tr>
            {[
              { label: t("natureOutdoors"), key: (c: typeof ALL_CITIES[0]) => c.lifestyle.natureRating },
              { label: t("nightlife"), key: (c: typeof ALL_CITIES[0]) => c.lifestyle.nightlifeRating },
              { label: t("culture"), key: (c: typeof ALL_CITIES[0]) => c.lifestyle.culturalActivities },
              { label: t("shopping"), key: (c: typeof ALL_CITIES[0]) => c.lifestyle.shoppingRating },
            ].map(row => (
              <tr key={row.label} className="border-b border-outline-light/30">
                <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{row.label}</td>
                {comparing.map(city => (
                  <td key={city.slug} className="py-2.5 px-4">
                    <RatingDots value={row.key(city)} />
                  </td>
                ))}
              </tr>
            ))}

            {/* Section: Connectivity */}
            <tr><td colSpan={comparing.length + 1} className="py-3 font-semibold text-on-surface-dim text-xs uppercase tracking-wider border-b border-outline-light/60 pt-5">{t("connectivityLabel")}</td></tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium flex items-center gap-1"><Wifi className="h-3.5 w-3.5" /> {t("avgInternet")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{city.connectivity.avgInternetSpeed} Mbps</td>)}
            </tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{t("coworking")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{city.connectivity.coworkingSpaces}</td>)}
            </tr>

            {/* Section: Safety */}
            <tr><td colSpan={comparing.length + 1} className="py-3 font-semibold text-on-surface-dim text-xs uppercase tracking-wider border-b border-outline-light/60 pt-5">{t("safetyLabel")}</td></tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium flex items-center gap-1"><Shield className="h-3.5 w-3.5" /> {t("crimeIndex")}</td>
              {comparing.map(city => <td key={city.slug} className="py-2.5 px-4 text-on-surface">{city.safety.crimeIndex}</td>)}
            </tr>
            <tr className="border-b border-outline-light/30">
              <td className="py-2.5 pr-4 text-on-surface-dim font-medium">{t("touristSafety")}</td>
              {comparing.map(city => (
                <td key={city.slug} className="py-2.5 px-4">
                  <RatingDots value={city.safety.touristSafetyRating} />
                </td>
              ))}
            </tr>

            {/* Best for */}
            <tr className="border-b border-outline-light/30">
              <td className="py-3 pr-4 text-on-surface-dim font-medium align-top pt-5">{t("bestForLabel")}</td>
              {comparing.map(city => (
                <td key={city.slug} className="py-3 px-4 align-top pt-5">
                  <div className="flex flex-wrap gap-1">
                    {city.bestFor.slice(0, 3).map(b => (
                      <Badge key={b} variant="outline" className="text-xs">{b}</Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
