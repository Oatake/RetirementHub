"use client"
import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ServiceCard } from "@/components/shared/service-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getServices, getServiceCategories } from "@/lib/mock/api"
import type { Service, ServiceCategory } from "@/lib/mock/types"
import { useSearchParams } from "next/navigation"

const CITIES = ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Hua Hin", "Koh Samui"]

function ServicesContent() {
  const t = useTranslations("Services")
  const tCommon = useTranslations("Common")
  const MIN_RATINGS = [
    { value: "4.5", label: t("rating45") },
    { value: "4", label: t("rating4") },
    { value: "3.5", label: t("rating35") },
  ]
  const searchParams = useSearchParams()
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState(searchParams.get("category") ?? "")
  const [city, setCity] = useState("")
  const [minRating, setMinRating] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    getServiceCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(async () => {
      const result = await getServices({
        search: search || undefined,
        category: category || undefined,
        city: city || undefined,
        minRating: minRating ? parseFloat(minRating) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      })
      setServices(result.services)
      setTotal(result.total)
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [search, category, city, minRating, maxPrice])

  const activeFilters = [
    ...(category ? [{ label: categories.find(c => c.slug === category)?.name ?? category, onRemove: () => setCategory("") }] : []),
    ...(city ? [{ label: city, onRemove: () => setCity("") }] : []),
    ...(minRating ? [{ label: `${minRating}+ stars`, onRemove: () => setMinRating("") }] : []),
    ...(maxPrice ? [{ label: `Under ฿${parseInt(maxPrice).toLocaleString()}`, onRemove: () => setMaxPrice("") }] : []),
  ]

  const clearAll = () => { setCategory(""); setCity(""); setMinRating(""); setMaxPrice(""); setSearch("") }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-on-surface mb-1">{t("title")}</h1>
        <p className="text-on-surface-dim">{t("subtitle")}</p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <Input
            placeholder={t("searchPlaceholder")}
            leftIcon={<Search className="h-4 w-4" />}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className={showFilters ? "border-primary text-primary bg-primary/5" : ""}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-1.5" />
          {t("filtersLabel")}
          {activeFilters.length > 0 && (
            <span className="ml-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {activeFilters.length}
            </span>
          )}
        </Button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs font-semibold text-on-surface-dim mb-2 uppercase tracking-wide">Category</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {categories.map(c => (
                  <SelectItem key={c.id} value={c.slug}>{c.icon} {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-dim mb-2 uppercase tracking-wide">City</p>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="All cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All cities</SelectItem>
                {CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-dim mb-2 uppercase tracking-wide">Min. Rating</p>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any rating</SelectItem>
                {MIN_RATINGS.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-dim mb-2 uppercase tracking-wide">Max. Price</p>
            <Select value={maxPrice} onValueChange={setMaxPrice}>
              <SelectTrigger>
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any price</SelectItem>
                <SelectItem value="5000">Under ฿5,000</SelectItem>
                <SelectItem value="15000">Under ฿15,000</SelectItem>
                <SelectItem value="30000">Under ฿30,000</SelectItem>
                <SelectItem value="50000">Under ฿50,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {activeFilters.map(f => (
            <Badge key={f.label} variant="outline" className="gap-1 cursor-pointer hover:border-error hover:text-error" onClick={f.onRemove}>
              {f.label} <X className="h-3 w-3" />
            </Badge>
          ))}
          <button onClick={clearAll} className="text-xs text-primary hover:underline">Clear all</button>
        </div>
      )}

      {/* Category shortcut tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        <button
          onClick={() => setCategory("")}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? "bg-primary text-on-primary" : "bg-surface-white border border-outline-light text-on-surface-dim hover:border-primary/30"}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.slug === category ? "" : cat.slug)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat.slug === category ? "bg-primary text-on-primary" : "bg-surface-white border border-outline-light text-on-surface-dim hover:border-primary/30"}`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-on-surface-dim">
          {isLoading ? tCommon("loading") : total !== 1 ? t("servicesFound", { count: total }) : t("serviceFound", { count: total })}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-surface-container animate-pulse h-72" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl mb-2">🔍</p>
          <h3 className="text-lg font-semibold text-on-surface mb-1">{t("noServicesTitle")}</h3>
          <p className="text-on-surface-dim text-sm mb-4">{t("noServicesDesc")}</p>
          <Button variant="outline" onClick={clearAll}>{t("clearFilters")}</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="max-w-[1280px] mx-auto px-6 py-8"><div className="animate-pulse h-8 bg-surface-container rounded w-48 mb-6" /></div>}>
      <ServicesContent />
    </Suspense>
  )
}
