import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Navbar } from "@/components/layout/navbar"
import { LayoutDashboard, List, CalendarCheck, Settings, ArrowLeft } from "lucide-react"

const PORTAL_NAV = [
  { href: "/provider", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/provider/listings", icon: List, label: "My Listings" },
  { href: "/provider/bookings", icon: CalendarCheck, label: "Bookings" },
  { href: "/account/settings", icon: Settings, label: "Settings" },
]

export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <Navbar />
      <div className="max-w-[1280px] mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 hidden lg:block">
          <div className="bg-surface-white border border-outline-light/60 rounded-xl p-3 sticky top-24">
            <p className="text-xs font-semibold text-on-surface-dim px-2 py-1.5 uppercase tracking-wider mb-1">Provider Portal</p>
            <nav className="space-y-0.5">
              {PORTAL_NAV.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-on-surface hover:bg-surface-low hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4 text-on-surface-dim" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-outline-light/60 mt-3 pt-3">
              <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-on-surface-dim hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to marketplace
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </>
  )
}
