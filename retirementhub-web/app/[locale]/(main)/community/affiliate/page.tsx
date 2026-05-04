import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowRight, DollarSign, TrendingUp, Users, BarChart3, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getAffiliateStats } from "@/lib/mock/api"
import { formatCurrency, formatNumber } from "@/lib/utils"

export default async function AffiliateDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const stats = await getAffiliateStats()

  const maxEarning = Math.max(...stats.earningsByCategory.map(e => e.amount))

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface mb-1">Creator Dashboard</h1>
          <p className="text-on-surface-dim text-sm">Track your earnings and affiliate performance</p>
        </div>
        <Badge variant="gold" className="text-sm px-3 py-1.5">⭐ Creator Status: Active</Badge>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: DollarSign, label: "Total Earnings", value: formatCurrency(stats.totalEarnings), sub: "All time", color: "text-secondary" },
          { icon: DollarSign, label: "Pending Payout", value: formatCurrency(stats.pendingEarnings), sub: "Processing", color: "text-gold" },
          { icon: BarChart3, label: "Conversion Rate", value: `${stats.conversionRate}%`, sub: `${stats.totalConversions} bookings`, color: "text-primary" },
          { icon: Users, label: "Total Clicks", value: formatNumber(stats.totalClicks), sub: "Link clicks", color: "text-on-surface" },
        ].map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-surface-container rounded-lg">
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
                <span className="text-xs text-on-surface-dim font-medium">{card.label}</span>
              </div>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-xs text-on-surface-dim mt-0.5">{card.sub}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Earnings by category */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-on-surface">Earnings by Category</h3>
          </div>
          <div className="space-y-3">
            {stats.earningsByCategory.map(item => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-on-surface">{item.category}</span>
                  <span className="font-semibold text-on-surface">{formatCurrency(item.amount)}</span>
                </div>
                <Progress value={(item.amount / maxEarning) * 100} className="h-2" indicatorClassName="bg-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Payout summary */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <h3 className="font-semibold text-on-surface mb-4">Payout Summary</h3>
          <div className="space-y-3 mb-4">
            {[
              { label: "Total Earned", value: stats.totalEarnings, color: "text-on-surface" },
              { label: "Paid Out", value: stats.paidEarnings, color: "text-secondary" },
              { label: "Pending", value: stats.pendingEarnings, color: "text-gold" },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center border-b border-outline-light/40 pb-2">
                <span className="text-sm text-on-surface-dim">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
          <Button className="w-full" variant="outline">Request Payout</Button>
          <p className="text-xs text-on-surface-dim text-center mt-2">Minimum payout: ฿1,000 · Bank transfer or crypto</p>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5 mb-8">
        <h3 className="font-semibold text-on-surface mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-on-surface-dim uppercase tracking-wider border-b border-outline-light/60">
                <th className="pb-2 text-left font-semibold">Date</th>
                <th className="pb-2 text-left font-semibold">Service</th>
                <th className="pb-2 text-left font-semibold">Status</th>
                <th className="pb-2 text-right font-semibold">Commission</th>
                <th className="pb-2 text-right font-semibold">Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-light/40">
              {stats.recentTransactions.map(tx => (
                <tr key={tx.id}>
                  <td className="py-3 text-on-surface-dim">{tx.date}</td>
                  <td className="py-3 text-on-surface max-w-[200px] truncate">{tx.service}</td>
                  <td className="py-3">
                    <Badge variant={tx.bookingStatus === "completed" ? "success" : "outline"} className="text-xs">
                      {tx.bookingStatus}
                    </Badge>
                  </td>
                  <td className="py-3 text-right font-semibold text-on-surface">{formatCurrency(tx.commission)}</td>
                  <td className="py-3 text-right">
                    <Badge variant={tx.payoutStatus === "paid" ? "success" : "warning"} className="text-xs">
                      {tx.payoutStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gold/8 border border-gold/20 rounded-2xl p-6">
        <h3 className="font-semibold text-on-surface mb-4">How Affiliate Commissions Work</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          {[
            { step: "1", title: "Tag Services in Posts", desc: "When you write about a service you've used, tag it in your community post." },
            { step: "2", title: "Followers Book Services", desc: "When your followers click your tagged service link and complete a booking, you earn a commission." },
            { step: "3", title: "Earn 9% Commission", desc: "You earn 9% of the booking value on every confirmed booking from your links." },
          ].map(item => (
            <div key={item.step} className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm shrink-0">{item.step}</div>
              <div>
                <p className="font-semibold text-on-surface text-sm mb-1">{item.title}</p>
                <p className="text-xs text-on-surface-dim">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {["Min. 3 published posts to qualify", "9% commission on confirmed bookings", "Monthly payouts", "No follower minimum"].map(item => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-on-surface">
              <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
