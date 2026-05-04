import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "THB"): string {
  if (currency === "THB") {
    return `฿${amount.toLocaleString("en-US")}`
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

export function scoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Ready", color: "text-secondary" }
  if (score >= 60) return { label: "On Track", color: "text-primary" }
  if (score >= 40) return { label: "Planning Needed", color: "text-warning" }
  return { label: "Early Stage", color: "text-error" }
}

export function scoreBg(score: number): string {
  if (score >= 80) return "bg-secondary"
  if (score >= 60) return "bg-primary"
  if (score >= 40) return "bg-gold"
  return "bg-error"
}

export function localizedField(en: string, th?: string, locale = "en"): string {
  return locale === "th" && th ? th : en
}
