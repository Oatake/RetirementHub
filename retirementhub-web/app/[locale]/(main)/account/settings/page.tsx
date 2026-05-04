"use client"
import { useState, useTransition } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Bell, Globe, Lock, LogOut, Moon, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/auth-store"
import { useRouter, usePathname } from "@/i18n/navigation"

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-surface-container"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  )
}

export default function SettingsPage() {
  const t = useTranslations("Account")
  const locale = useLocale()
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [saved, setSaved] = useState(false)
  const [, startTransition] = useTransition()

  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    newReviews: true,
    communityPosts: false,
    promotions: false,
    scoreUpdates: true,
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: locale,
    currency: "THB",
  })

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 600))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const notificationLabels: Record<keyof typeof notifications, string> = {
    bookingUpdates: "Booking confirmations and updates",
    newReviews: "New reviews on your bookings",
    communityPosts: "Community replies and mentions",
    promotions: "Promotions and service deals",
    scoreUpdates: "Retirement Score changes",
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-on-surface mb-1">{t("settingsTitle")}</h1>
        <p className="text-on-surface-dim text-sm">Manage your account, notifications, and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Account security */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-4 w-4 text-on-surface-dim" />
            <h2 className="font-semibold text-on-surface">Account & Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Email Address</p>
                <p className="text-xs text-on-surface-dim">{user?.email}</p>
              </div>
              <Button size="sm" variant="outline">Change</Button>
            </div>
            <div className="flex items-center justify-between border-t border-outline-light/60 pt-4">
              <div>
                <p className="text-sm font-medium text-on-surface">Password</p>
                <p className="text-xs text-on-surface-dim">Last changed never</p>
              </div>
              <Button size="sm" variant="outline">Update</Button>
            </div>
            <div className="flex items-center justify-between border-t border-outline-light/60 pt-4">
              <div>
                <p className="text-sm font-medium text-on-surface">Two-Factor Authentication</p>
                <p className="text-xs text-on-surface-dim">Add an extra layer of security</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Not enabled</Badge>
                <Button size="sm" variant="outline">Enable</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-on-surface-dim" />
            <h2 className="font-semibold text-on-surface">Notifications</h2>
          </div>
          <div className="space-y-4">
            {(Object.keys(notifications) as Array<keyof typeof notifications>).map((key, i) => (
              <div key={key} className={`flex items-center justify-between ${i > 0 ? "border-t border-outline-light/60 pt-4" : ""}`}>
                <Label className="font-normal text-sm cursor-pointer">{notificationLabels[key]}</Label>
                <Toggle
                  checked={notifications[key]}
                  onChange={v => setNotifications(prev => ({ ...prev, [key]: v }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-on-surface-dim" />
            <h2 className="font-semibold text-on-surface">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Dark Mode</p>
                <p className="text-xs text-on-surface-dim">Switch to dark theme</p>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-on-surface-dim" />
                <Toggle
                  checked={preferences.darkMode}
                  onChange={v => setPreferences(prev => ({ ...prev, darkMode: v }))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-outline-light/60 pt-4">
              <div>
                <p className="text-sm font-medium text-on-surface">Language</p>
                <p className="text-xs text-on-surface-dim">Interface language</p>
              </div>
              <select
                value={preferences.language}
                onChange={e => {
                  const next = e.target.value as "en" | "th"
                  setPreferences(prev => ({ ...prev, language: next }))
                  startTransition(() => router.replace(pathname, { locale: next }))
                }}
                className="text-sm border border-outline-light rounded-lg px-3 py-1.5 bg-surface-white text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="en">{t("english")}</option>
                <option value="th">{t("thai")}</option>
              </select>
            </div>
            <div className="flex items-center justify-between border-t border-outline-light/60 pt-4">
              <div>
                <p className="text-sm font-medium text-on-surface">Currency Display</p>
                <p className="text-xs text-on-surface-dim">Preferred currency</p>
              </div>
              <select
                value={preferences.currency}
                onChange={e => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                className="text-sm border border-outline-light rounded-lg px-3 py-1.5 bg-surface-white text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="THB">฿ THB</option>
                <option value="USD">$ USD</option>
                <option value="GBP">£ GBP</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full" size="lg">
          {saved ? <><Check className="h-4 w-4 mr-2" /> Settings Saved</> : "Save Settings"}
        </Button>

        {/* Danger zone */}
        <div className="bg-surface-white border border-error/20 rounded-xl p-5">
          <h2 className="font-semibold text-on-surface mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Sign Out</p>
                <p className="text-xs text-on-surface-dim">Sign out of your account on this device</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1.5">
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </div>
            <div className="flex items-center justify-between border-t border-outline-light/60 pt-3">
              <div>
                <p className="text-sm font-medium text-error">Delete Account</p>
                <p className="text-xs text-on-surface-dim">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" size="sm" className="gap-1.5">
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
