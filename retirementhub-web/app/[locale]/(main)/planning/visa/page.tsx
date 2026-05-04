import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ChevronRight, Clock, FileText, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getVisaTypes } from "@/lib/mock/api"
import { formatCurrency } from "@/lib/utils"

export default async function VisaHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, tNav, visas] = await Promise.all([
    getTranslations("VisaHub"),
    getTranslations("Nav"),
    getVisaTypes(),
  ])

  const visaColors: Record<string, string> = {
    "non-immigrant-oa": "bg-primary/8 border-primary/20",
    "non-immigrant-ox": "bg-secondary/8 border-secondary/20",
    "long-term-resident": "bg-gold/8 border-gold/20",
    "ltr-work-from-thailand": "bg-gold/8 border-gold/20",
    "tourist-visa-extension": "bg-surface-container border-outline-light/60",
  }

  const badges: Record<string, { label: string; variant: "default" | "secondary" | "gold" | "outline" }> = {
    "non-immigrant-oa": { label: t("mostPopular"), variant: "default" },
    "non-immigrant-ox": { label: t("premium"), variant: "gold" },
    "long-term-resident": { label: t("bestBenefits"), variant: "secondary" },
    "ltr-work-from-thailand": { label: t("remoteWorkers"), variant: "secondary" },
    "tourist-visa-extension": { label: t("shortStay"), variant: "outline" },
  }

  const finderOptions = [
    t("finderAge50"),
    t("finderRemote"),
    t("finderExploring"),
    t("finderInvestor"),
  ]

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-1.5 text-sm text-on-surface-dim mb-4">
          <Link href="/planning/dashboard" className="hover:text-primary">{tNav("planning")}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-on-surface">{t("breadcrumbVisa")}</span>
        </nav>
        <h1 className="text-2xl font-bold text-on-surface mb-2">{t("title")}</h1>
        <p className="text-on-surface-dim max-w-2xl">{t("subtitle")}</p>
      </div>

      {/* Quick finder */}
      <div className="bg-primary/8 border border-primary/20 rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-on-surface mb-1">{t("quickFinderTitle")}</h2>
        <p className="text-sm text-on-surface-dim mb-4">{t("quickFinderDesc")}</p>
        <div className="flex flex-wrap gap-3">
          <span className="text-sm text-on-surface-dim">{t("iAm")}</span>
          {finderOptions.map(label => (
            <button
              key={label}
              className="px-3 py-1.5 rounded-full border border-primary/30 text-sm text-primary bg-white hover:bg-primary/5 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Visa cards */}
      <div className="grid gap-5">
        {visas.map(visa => {
          const colorClass = visaColors[visa.slug] ?? "bg-surface-container border-outline-light/60"
          const badge = badges[visa.slug]
          return (
            <div key={visa.id} className={`border rounded-2xl p-6 ${colorClass}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-bold text-on-surface text-lg">{visa.shortName}</h3>
                    {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
                  </div>
                  <p className="text-sm text-on-surface-dim mb-3 max-w-2xl">{visa.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-on-surface-dim">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>{visa.processingTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-dim">
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      <span>{visa.validity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-dim">
                      <FileText className="h-4 w-4 shrink-0" />
                      <span>{t("fee")} {formatCurrency(visa.estimatedCostThb)}</span>
                    </div>
                  </div>
                  {visa.eligibilityAge && (
                    <p className="text-xs text-on-surface-dim mt-2">{t("eligibility")} {visa.eligibilityAge} years old</p>
                  )}
                </div>
                <Button asChild variant="outline" className="shrink-0">
                  <Link href={`/planning/visa/${visa.slug}`}>
                    {t("viewDetails")} <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>

              {/* Key requirements preview */}
              <div className="mt-4 pt-4 border-t border-outline-light/40">
                <p className="text-xs font-semibold text-on-surface-dim uppercase tracking-wide mb-2">{t("keyRequirements")}</p>
                <ul className="flex flex-wrap gap-2">
                  {visa.keyRequirements.slice(0, 3).map((req, i) => (
                    <li key={i} className="text-xs text-on-surface bg-white/70 border border-outline-light/40 rounded-lg px-2 py-1">
                      {req.length > 60 ? req.slice(0, 60) + "…" : req}
                    </li>
                  ))}
                  {visa.keyRequirements.length > 3 && (
                    <li className="text-xs text-on-surface-dim px-2 py-1">{t("moreRequirements", { count: visa.keyRequirements.length - 3 })}</li>
                  )}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-on-surface-dim mt-8 text-center">{t("disclaimer")}</p>
    </div>
  )
}
