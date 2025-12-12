"use client"

import {
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Filter,
  Search,
  FileText,
  Wallet,
  Receipt,
  MoreHorizontal,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

const transactions = [
  {
    id: 1,
    type: "income",
    description: "TechCorp - Marketing kampaniya",
    amount: 15000000,
    date: "2024-12-09",
    category: "Loyiha",
    status: "completed",
  },
  {
    id: 2,
    type: "expense",
    description: "Ofis ijarasi - Dekabr",
    amount: 5000000,
    date: "2024-12-08",
    category: "Operatsion",
    status: "completed",
  },
  {
    id: 3,
    type: "income",
    description: "Mega Bank - Video loyiha",
    amount: 8000000,
    date: "2024-12-07",
    category: "Loyiha",
    status: "completed",
  },
  {
    id: 4,
    type: "expense",
    description: "Xodimlar maoshi",
    amount: 25000000,
    date: "2024-12-05",
    category: "Ish haqi",
    status: "completed",
  },
  {
    id: 5,
    type: "income",
    description: "StartUp Inc - Dizayn",
    amount: 4000000,
    date: "2024-12-04",
    category: "Loyiha",
    status: "pending",
  },
  {
    id: 6,
    type: "expense",
    description: "Reklama xarajatlari",
    amount: 3000000,
    date: "2024-12-03",
    category: "Marketing",
    status: "completed",
  },
  {
    id: 7,
    type: "income",
    description: "Global Trade - Konsalting",
    amount: 6000000,
    date: "2024-12-02",
    category: "Xizmat",
    status: "completed",
  },
  {
    id: 8,
    type: "expense",
    description: "Dasturiy ta'minot litsenziyalari",
    amount: 2000000,
    date: "2024-12-01",
    category: "IT",
    status: "completed",
  },
]

const invoices = [
  { id: 1, client: "TechCorp LLC", amount: 25000000, dueDate: "2024-12-15", status: "pending" },
  { id: 2, client: "Mega Bank", amount: 15000000, dueDate: "2024-12-20", status: "pending" },
  { id: 3, client: "Global Trade", amount: 8000000, dueDate: "2024-12-10", status: "overdue" },
  { id: 4, client: "StartUp Inc", amount: 4000000, dueDate: "2024-12-25", status: "draft" },
]

const monthlyData = [
  { month: "Yan", income: 45, expense: 30 },
  { month: "Fev", income: 52, expense: 35 },
  { month: "Mar", income: 48, expense: 32 },
  { month: "Apr", income: 61, expense: 38 },
  { month: "May", income: 55, expense: 36 },
  { month: "Iyn", income: 67, expense: 42 },
  { month: "Iyl", income: 72, expense: 45 },
  { month: "Avg", income: 58, expense: 40 },
  { month: "Sen", income: 63, expense: 38 },
  { month: "Okt", income: 70, expense: 44 },
  { month: "Noy", income: 75, expense: 48 },
  { month: "Dek", income: 80, expense: 50 },
]

export function FinanceSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "invoices">("overview")

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm"
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0)
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0)
  const balance = totalIncome - totalExpense

  const stats = [
    {
      label: "Umumiy balans",
      value: formatMoney(balance),
      icon: Wallet,
      color: "from-primary/20 to-primary/5",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      label: "Daromad (bu oy)",
      value: formatMoney(totalIncome),
      icon: TrendingUp,
      color: "from-chart-2/20 to-chart-2/5",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      label: "Xarajatlar (bu oy)",
      value: formatMoney(totalExpense),
      icon: TrendingDown,
      color: "from-chart-1/20 to-chart-1/5",
      trend: "+3.1%",
      trendUp: false,
    },
    {
      label: "Kutilayotgan to'lov",
      value: formatMoney(invoices.filter((i) => i.status === "pending").reduce((a, b) => a + b.amount, 0)),
      icon: Receipt,
      color: "from-chart-4/20 to-chart-4/5",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Moliya</h1>
          <p className="mt-1 text-muted-foreground">Daromad va xarajatlarni boshqaring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Eksport
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25">
            <Plus className="h-4 w-4" />
            Yangi tranzaksiya
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${stat.color} p-5 backdrop-blur-xl`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-xl font-bold text-foreground">{stat.value}</p>
                {stat.trend && (
                  <div
                    className={`mt-2 flex items-center gap-1 text-xs font-medium ${stat.trendUp ? "text-chart-2" : "text-chart-1"}`}
                  >
                    {stat.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stat.trend} o'tgan oyga nisbatan
                  </div>
                )}
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/50">
                <stat.icon className="h-6 w-6 text-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: "overview", label: "Umumiy ko'rinish" },
          { id: "transactions", label: "Tranzaksiyalar" },
          { id: "invoices", label: "Hisob-fakturalar" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chart */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-foreground mb-4">Yillik moliyaviy ko'rsatkichlar</h3>
            <div className="h-64 flex items-end gap-2">
              {monthlyData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col gap-1">
                    <div
                      className="w-full bg-chart-2 rounded-t-sm transition-all hover:opacity-80"
                      style={{ height: `${data.income * 2}px` }}
                      title={`Daromad: ${data.income}M`}
                    />
                    <div
                      className="w-full bg-chart-1 rounded-b-sm transition-all hover:opacity-80"
                      style={{ height: `${data.expense * 2}px` }}
                      title={`Xarajat: ${data.expense}M`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-chart-2" />
                <span className="text-sm text-muted-foreground">Daromad</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-chart-1" />
                <span className="text-sm text-muted-foreground">Xarajat</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-foreground mb-4">So'nggi tranzaksiyalar</h3>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${tx.type === "income" ? "bg-chart-2/10" : "bg-chart-1/10"}`}
                  >
                    {tx.type === "income" ? (
                      <ArrowDownLeft className="h-5 w-5 text-chart-2" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-chart-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.category} • {new Date(tx.date).toLocaleDateString("uz-UZ")}
                    </p>
                  </div>
                  <p className={`text-sm font-semibold ${tx.type === "income" ? "text-chart-2" : "text-chart-1"}`}>
                    {tx.type === "income" ? "+" : "-"}
                    {formatMoney(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tranzaksiya qidirish..."
                className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filtr
            </Button>
          </div>
          <div className="divide-y divide-border">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${tx.type === "income" ? "bg-chart-2/10" : "bg-chart-1/10"}`}
                >
                  {tx.type === "income" ? (
                    <ArrowDownLeft className="h-5 w-5 text-chart-2" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-chart-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{tx.description}</p>
                  <p className="text-sm text-muted-foreground">{tx.category}</p>
                </div>
                <div className="hidden md:block text-sm text-muted-foreground">
                  {new Date(tx.date).toLocaleDateString("uz-UZ")}
                </div>
                <div className={`text-right ${tx.type === "income" ? "text-chart-2" : "text-chart-1"}`}>
                  <p className="font-semibold">
                    {tx.type === "income" ? "+" : "-"}
                    {formatMoney(tx.amount)}
                  </p>
                </div>
                <button className="rounded-lg p-2 hover:bg-muted">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "invoices" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Yangi hisob-faktura
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      invoice.status === "pending"
                        ? "bg-chart-4/10 text-chart-4"
                        : invoice.status === "overdue"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {invoice.status === "pending"
                      ? "Kutilmoqda"
                      : invoice.status === "overdue"
                        ? "Muddati o'tgan"
                        : "Qoralama"}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground">{invoice.client}</h4>
                <p className="text-xl font-bold text-foreground mt-2">{formatMoney(invoice.amount)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Muddat: {new Date(invoice.dueDate).toLocaleDateString("uz-UZ")}
                </p>
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  Ko'rish
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
