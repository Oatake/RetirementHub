import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-primary text-lg">RetirementHub</span>
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </div>
      <footer className="p-6 text-center">
        <p className="text-xs text-on-surface-dim">© 2026 RetirementHub. All rights reserved.</p>
      </footer>
    </div>
  )
}
