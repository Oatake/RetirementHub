import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { AlertCircle, ArrowRight, CheckCircle2, Clock, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScoreGauge } from "@/components/shared/score-gauge"
import { getRetirementScore, getUserProfile } from "@/lib/mock/api"
import { formatCurrency } from "@/lib/utils"

export default async function PlanningDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, score, profile] = await Promise.all([
    getTranslations("Planning"),
    getRetirementScore(),
    getUserProfile(),
  ])

  const subScores = [
    {
      label: t("financialReadiness"),
      value: score.finance,
      details: score.financeDetails,
      color: "bg-secondary",
      icon: "💰",
    },
    {
      label: t("healthPreparedness"),
      value: score.health,
      details: score.healthDetails,
      color: "bg-primary",
      icon: "🏥",
    },
    {
      label: t("lifestyleAlignment"),
      value: score.lifestyle,
      details: score.lifestyleDetails,
      color: "bg-gold",
      icon: "🌿",
    },
  ]

  const priorityConfig = {
    high: { label: t("highPriority"), variant: "error" as const, icon: AlertCircle },
    medium: { label: t("recommended"), variant: "warning" as const, icon: Clock },
    low: { label: t("optional"), variant: "outline" as const, icon: CheckCircle2 },
  }

  const financialStats = [
    { label: t("totalSavings"), value: formatCurrency(profile.financialData.savings), sub: t("availableAssets") },
    { label: t("monthlyIncome"), value: formatCurrency(profile.financialData.monthlyIncome), sub: t("pensionIncome") },
    { label: t("monthlyBudget"), value: formatCurrency(profile.financialData.monthlyExpenses), sub: t("estExpenses") },
    { label: t("monthlySurplus"), value: formatCurrency(profile.financialData.monthlyIncome - profile.financialData.monthlyExpenses), sub: t("afterExpenses") },
  ]

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-on-surface mb-1">{t("dashboardTitle")}</h1>
        <p className="text-on-surface-dim text-sm">
          {t("planningRetireIn", { city: profile.targetCity, timeline: profile.targetTimeline })}
        </p>
      </div>

      {/* Score hero */}
      <div className="bg-surface-white border border-outline-light/60 rounded-2xl p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm font-semibold text-on-surface-dim uppercase tracking-wider mb-4">
              {t("retirementReadinessScore")}
            </p>
            <div className="flex items-center gap-6">
              <ScoreGauge score={score.overall} size={180} />
              <div className="hidden sm:block space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  <span className="text-sm text-on-surface">{t("ptsLastMonth")}</span>
                </div>
                <p className="text-xs text-on-surface-dim">{t("lastUpdatedLabel")} {new Date(score.lastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/planning/planner">{t("askAIPlanner")} <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {subScores.map(s => (
              <div key={s.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-on-surface">
                    {s.icon} {s.label}
                  </span>
                  <span className="text-sm font-bold text-on-surface">{s.value}/100</span>
                </div>
                <Progress value={s.value} className="h-2.5" indicatorClassName={s.color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {financialStats.map(stat => (
          <div key={stat.label} className="bg-surface-white border border-outline-light/60 rounded-xl p-4">
            <p className="text-xs text-on-surface-dim mb-1">{stat.label}</p>
            <p className="text-lg font-bold text-on-surface">{stat.value}</p>
            <p className="text-xs text-on-surface-dim mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Sub-score breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        {subScores.map(s => (
          <div key={s.label} className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-on-surface">{s.icon} {s.label}</h3>
              <span className={`text-sm font-bold px-2 py-0.5 rounded-full text-white ${s.color}`}>
                {s.value}
              </span>
            </div>
            <ul className="space-y-2">
              {s.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-on-surface-dim">
                  <span className="mt-0.5 shrink-0">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-lg font-semibold text-on-surface mb-4">{t("actionPlan")}</h2>
        <div className="space-y-3">
          {score.recommendations.map((rec, i) => {
            const config = priorityConfig[rec.priority]
            const Icon = config.icon
            return (
              <div key={i} className="bg-surface-white border border-outline-light/60 rounded-xl p-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-lg ${rec.priority === "high" ? "bg-error/10" : rec.priority === "medium" ? "bg-gold/10" : "bg-surface-container"}`}>
                    <Icon className={`h-4 w-4 ${rec.priority === "high" ? "text-error" : rec.priority === "medium" ? "text-gold" : "text-on-surface-dim"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-on-surface-dim uppercase tracking-wide">{rec.category}</span>
                      <Badge variant={config.variant} className="text-xs">{config.label}</Badge>
                    </div>
                    <p className="text-sm text-on-surface">{rec.action}</p>
                  </div>
                </div>
                {rec.serviceSlug && (
                  <Button size="sm" variant="outline" asChild className="shrink-0">
                    <Link href={`/services/${rec.serviceSlug}`}>{t("viewService")}</Link>
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary/8 border border-primary/20 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-semibold text-on-surface mb-1">{t("personalizedPlanTitle")}</h3>
          <p className="text-sm text-on-surface-dim">{t("personalizedPlanDesc")}</p>
        </div>
        <Button asChild>
          <Link href="/planning/planner">{t("openAIPlanner")} <ArrowRight className="h-4 w-4 ml-1.5" /></Link>
        </Button>
      </div>
    </div>
  )
}
