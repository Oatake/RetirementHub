import { Link } from "@/i18n/navigation"
import { User, CalendarDays, Settings } from "lucide-react"

const ACCOUNT_NAV = [
  { href: "/account/profile", icon: User, label: "Profile" },
  { href: "/account/bookings", icon: CalendarDays, label: "My Bookings" },
  { href: "/account/settings", icon: Settings, label: "Settings" },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 flex gap-8">
      <aside className="w-48 shrink-0 hidden lg:block">
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-3 sticky top-24">
          <p className="text-xs font-semibold text-on-surface-dim px-2 py-1.5 uppercase tracking-wider mb-1">My Account</p>
          <nav className="space-y-0.5">
            {ACCOUNT_NAV.map(({ href, icon: Icon, label }) => (
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
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
