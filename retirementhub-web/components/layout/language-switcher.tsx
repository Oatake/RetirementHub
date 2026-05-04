"use client"
import { useTransition } from "react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const toggle = () => {
    const next = locale === "en" ? "th" : "en"
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label="Switch language"
      className={`px-2.5 py-1.5 rounded-lg text-sm font-semibold border border-outline-light text-on-surface hover:bg-surface-low hover:border-primary/30 transition-colors disabled:opacity-50 ${className ?? ""}`}
    >
      {locale === "en" ? "TH" : "EN"}
    </button>
  )
}
