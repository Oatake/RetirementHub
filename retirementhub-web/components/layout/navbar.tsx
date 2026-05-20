"use client"
import { Link, usePathname } from "@/i18n/navigation"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Menu, X, Bell, MessageSquare, ChevronDown, User, Settings, LogOut, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { useAuthStore } from "@/store/auth-store"
import { useUiStore } from "@/store/ui-store"
import { cn } from "@/lib/utils"

export function Navbar() {
  const t = useTranslations("Nav")
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { toggleChat, openMobileMenu, isMobileMenuOpen, closeMobileMenu } = useUiStore()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const NAV_LINKS = [
    { href: "/services", label: t("services") },
    { href: "/planning/dashboard", label: t("planning") },
    { href: "/planning/visa", label: t("visaHub") },
    { href: "/planning/cities", label: t("cityGuide") },
    { href: "/community", label: t("community") },
  ]

  return (
    <header className="sticky top-0 z-50 bg-surface-white/95 backdrop-blur-md border-b border-outline-light/60 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="font-bold text-primary text-lg hidden sm:block">Longevity</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname?.startsWith(link.href)
                  ? "bg-primary/8 text-primary"
                  : "text-on-surface-dim hover:text-on-surface hover:bg-surface-low"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          {isAuthenticated ? (
            <>
              {/* AI Chat button */}
              <Button variant="ghost" size="icon" onClick={toggleChat} className="hidden sm:flex relative">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-secondary rounded-full" />
              </Button>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-error rounded-full" />
              </Button>
              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl hover:bg-surface-low transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-on-surface hidden sm:block">{user?.name?.split(" ")[0]}</span>
                  <ChevronDown className="h-4 w-4 text-on-surface-dim hidden sm:block" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-outline-light bg-surface-white shadow-lg z-50 py-1.5">
                    <div className="px-3 py-2 border-b border-outline-light/60 mb-1">
                      <p className="text-sm font-semibold text-on-surface">{user?.name}</p>
                      <p className="text-xs text-on-surface-dim">{user?.email}</p>
                    </div>
                    {[
                      { href: "/account/profile", icon: User, label: t("myProfile") },
                      { href: "/account/bookings", icon: Building2, label: t("myBookings") },
                      { href: "/account/settings", icon: Settings, label: t("settings") },
                      { href: "/provider", icon: Building2, label: t("providerPortal") },
                    ].map(({ href, icon: Icon, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-on-surface hover:bg-surface-low transition-colors"
                      >
                        <Icon className="h-4 w-4 text-on-surface-dim" />
                        {label}
                      </Link>
                    ))}
                    <div className="border-t border-outline-light/60 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false) }}
                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-error hover:bg-error-light/40 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        {t("signOut")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{t("signIn")}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">{t("getStarted")}</Link>
              </Button>
            </>
          )}
          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-outline-light bg-surface-white">
          <nav className="max-w-[1280px] mx-auto px-6 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  "px-3 py-2.5 rounded-lg text-sm font-medium",
                  pathname?.startsWith(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface hover:bg-surface-low"
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { toggleChat(); closeMobileMenu() }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-on-surface hover:bg-surface-low text-left"
            >
              <MessageSquare className="h-4 w-4" /> {t("aiPlanner")}
            </button>
            <LanguageSwitcher className="w-fit mt-1" />
          </nav>
        </div>
      )}
    </header>
  )
}
