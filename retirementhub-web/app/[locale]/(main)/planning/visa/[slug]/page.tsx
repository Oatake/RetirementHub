import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Link } from "@/i18n/navigation"
import { CheckCircle2, ChevronRight, Clock, FileText, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getVisaBySlug } from "@/lib/mock/api"
import { formatCurrency } from "@/lib/utils"

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function VisaDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const visa = await getVisaBySlug(slug)
  if (!visa) notFound()

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-on-surface-dim mb-6">
        <Link href="/planning/dashboard" className="hover:text-primary">Planning</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/planning/visa" className="hover:text-primary">Visa Hub</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-on-surface">{visa.shortName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-on-surface mb-2">{visa.name}</h1>
            <p className="text-on-surface-dim leading-relaxed">{visa.description}</p>
            {visa.eligibilityAge && (
              <div className="mt-3">
                <Badge variant="outline">Age {visa.eligibilityAge}</Badge>
              </div>
            )}
          </div>

          {/* Target user */}
          <div className="bg-primary/8 border border-primary/20 rounded-xl p-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Best For</p>
            <p className="text-sm text-on-surface">{visa.targetUser}</p>
          </div>

          {/* Key requirements */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-3">Key Requirements</h2>
            <ul className="space-y-2.5">
              {visa.keyRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-on-surface">
                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Document checklist */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-3">Document Checklist</h2>
            <div className="space-y-2">
              {visa.documentChecklist.map((doc, i) => (
                <label key={i} className="flex items-start gap-3 p-3 bg-surface-white border border-outline-light/60 rounded-lg cursor-pointer hover:border-primary/30 transition-colors group">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-outline accent-primary" />
                  <span className="text-sm text-on-surface group-hover:text-primary transition-colors">{doc}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-on-surface-dim mt-2">Check off documents as you gather them. Progress is not saved.</p>
          </div>

          {/* Renewal info */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-2">Renewal</h2>
            <p className="text-sm text-on-surface-dim leading-relaxed">{visa.renewalInfo}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick facts */}
          <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5 space-y-4 sticky top-24">
            <h3 className="font-semibold text-on-surface">Quick Facts</h3>
            <div className="space-y-3">
              {[
                { icon: FileText, label: "Visa Fee", value: formatCurrency(visa.estimatedCostThb) },
                { icon: Clock, label: "Processing Time", value: visa.processingTime },
                { icon: ShieldCheck, label: "Validity", value: visa.validity },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="p-1.5 bg-surface-container rounded-lg">
                    <Icon className="h-4 w-4 text-on-surface-dim" />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-dim">{label}</p>
                    <p className="text-sm font-medium text-on-surface">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-outline-light/60 pt-4 space-y-2">
              <p className="text-xs text-on-surface-dim mb-3">Need professional help with your application?</p>
              <Button className="w-full" asChild>
                <Link href="/services/retirement-visa-oa-application">Get Expert Help</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/planning/planner">Ask AI Planner</Link>
              </Button>
            </div>

            <p className="text-xs text-on-surface-dim text-center">
              Last updated: {new Date(visa.lastUpdated).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
