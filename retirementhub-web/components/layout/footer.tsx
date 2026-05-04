"use client"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const t = useTranslations("Footer")

  const FOOTER_LINKS = {
    [t("sections.services")]: [
      { label: t("links.healthScreening"), href: "/services?category=health-screening" },
      { label: t("links.spaWellness"), href: "/services?category=spa-wellness" },
      { label: t("links.eldercare"), href: "/services?category=eldercare" },
      { label: t("links.legalLegacy"), href: "/services?category=legal-legacy" },
      { label: t("links.healthInsurance"), href: "/services?category=health-insurance" },
    ],
    [t("sections.planning")]: [
      { label: t("links.retirementScore"), href: "/planning/dashboard" },
      { label: t("links.aiPlanner"), href: "/planning/planner" },
      { label: t("links.visaHub"), href: "/planning/visa" },
      { label: t("links.cityComparison"), href: "/planning/cities" },
    ],
    [t("sections.community")]: [
      { label: t("links.communityFeed"), href: "/community" },
      { label: t("links.affiliateProgram"), href: "/community/affiliate" },
    ],
    [t("sections.company")]: [
      { label: t("links.about"), href: "#" },
      { label: t("links.forProviders"), href: "/provider" },
      { label: t("links.privacyPolicy"), href: "#" },
      { label: t("links.termsOfService"), href: "#" },
    ],
  }

  return (
    <footer className="bg-surface-white border-t border-outline-light/60 mt-20">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-primary text-lg">RetirementHub</span>
            </div>
            <p className="text-sm text-on-surface-dim leading-relaxed">{t("tagline")}</p>
            <p className="text-xs text-on-surface-dim mt-4">{t("compliance")}</p>
          </div>
          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-on-surface mb-3">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-on-surface-dim hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6">
          <p className="text-xs text-on-surface-dim">{t("copyright")}</p>
          <p className="text-xs text-on-surface-dim">{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  )
}
