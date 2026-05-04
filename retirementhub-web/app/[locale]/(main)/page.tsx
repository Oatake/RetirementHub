import Image from "next/image"
import { ArrowRight, Star, Shield, MapPin, Brain, CheckCircle2, ChevronRight } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/shared/service-card"
import { Badge } from "@/components/ui/badge"
import { getServiceCategories, getFeaturedServices } from "@/lib/mock/api"
import { CITIES } from "@/lib/mock/data"
import { localizedField } from "@/lib/utils"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, categories, featuredServices] = await Promise.all([
    getTranslations("Home"),
    getServiceCategories(),
    getFeaturedServices(),
  ])

  const stats = [
    { value: "200+", label: t("statVerifiedServices") },
    { value: "50+", label: t("statTrustedProviders") },
    { value: "6", label: t("statCities") },
    { value: "4.7★", label: t("statAvgRating") },
  ]

  const aiFeatures = [
    t("aiFeature1"),
    t("aiFeature2"),
    t("aiFeature3"),
    t("aiFeature4"),
  ]

  const scoreBreakdown = [
    { label: t("scoreFinance"), score: 78, color: "bg-secondary" },
    { label: t("scoreHealth"), score: 65, color: "bg-gold" },
    { label: t("scoreLifestyle"), score: 76, color: "bg-secondary" },
  ]

  const trustCards = [
    { icon: Shield, title: t("trustVerified"), desc: t("trustVerifiedDesc") },
    { icon: Star, title: t("trustReviews"), desc: t("trustReviewsDesc") },
    { icon: CheckCircle2, title: t("trustPDPA"), desc: t("trustPDPADesc") },
    { icon: Brain, title: t("trustAI"), desc: t("trustAIDesc") },
  ]

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary pt-16 pb-24 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-2xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-[1280px] mx-auto text-center">
          <Badge variant="gold" className="mb-5 text-sm px-4 py-1.5">
            {t("heroBadge")}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto mb-6">
            {t("heroTitle")}<br />
            <span className="text-gold">{t("heroTitleHighlight")}</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Button size="lg" variant="gold" asChild>
              <Link href="/register">
                {t("heroCtaPrimary")} <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
              <Link href="/services">{t("heroCtaSecondary")}</Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-white/90">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm opacity-70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-on-surface mb-1">{t("categoriesTitle")}</h2>
            <p className="text-on-surface-dim">{t("categorySubtitle")}</p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
            {t("viewAll")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/services?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-white border border-outline-light/60 hover:border-primary/30 hover:bg-surface-low hover:shadow-card transition-all duration-200 text-center"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-on-surface leading-snug">{cat.name}</span>
              <span className="text-xs text-on-surface-dim">{t("serviceCount", { count: cat.serviceCount })}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Planner Feature Banner */}
      <section className="mx-6 mb-16 rounded-2xl bg-gradient-to-r from-primary to-primary-light overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-5 w-5 text-gold" />
              <span className="text-sm font-semibold text-gold uppercase tracking-wide">{t("aiPoweredBadge")}</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">{t("aiScoreTitle")}</h2>
            <p className="text-white/80 mb-5 leading-relaxed">{t("aiScoreDesc")}</p>
            <ul className="space-y-2 mb-6">
              {aiFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="gold" size="lg" asChild>
              <Link href="/planning/dashboard">{t("aiScoreButton")} <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 w-full max-w-xs">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-white">72</div>
                <div className="text-gold font-semibold">{t("scoreOnTrack")}</div>
              </div>
              <div className="space-y-3">
                {scoreBreakdown.map(({ label, score, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm text-white/80 mb-1">
                      <span>{label}</span><span>{score}/100</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="max-w-[1280px] mx-auto px-6 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-on-surface mb-1">{t("featuredTitle")}</h2>
            <p className="text-on-surface-dim">{t("featuredVerified")}</p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
            {t("seeAllServices")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* City Guide */}
      <section className="bg-surface-low py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-on-surface mb-1">{t("exploreCitiesTitle")}</h2>
              <p className="text-on-surface-dim">{t("exploreCitiesSubtitle")}</p>
            </div>
            <Link href="/planning/cities" className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
              {t("compareCities")} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CITIES.map((city) => (
              <Link
                key={city.id}
                href={`/planning/cities?cities=${city.slug}`}
                className="relative overflow-hidden rounded-xl aspect-[3/4] group"
              >
                <Image
                  src={city.image}
                  alt={localizedField(city.name, city.name_th, locale)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-bold text-sm">{localizedField(city.name, city.name_th, locale)}</p>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <MapPin className="h-3 w-3" />
                    <span>From ฿{(city.costOfLiving.rentOneBed / 1000).toFixed(0)}K/mo</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-on-surface mb-2">{t("trustSectionTitle")}</h2>
          <p className="text-on-surface-dim max-w-xl mx-auto">{t("trustSectionSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustCards.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-surface-white border border-outline-light/60">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-on-surface">{title}</h3>
              <p className="text-sm text-on-surface-dim leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-white border-y border-outline-light/60 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-on-surface mb-3">{t("ctaReadyTitle")}</h2>
        <p className="text-on-surface-dim mb-8 max-w-md mx-auto">{t("ctaReadySubtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">{t("ctaCreateAccount")} <ArrowRight className="h-5 w-5" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">{t("heroCtaSecondary")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
