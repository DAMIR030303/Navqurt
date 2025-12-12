"use client"

import {
  TrendingUp,
  TrendingDown,
  Users,
  FolderKanban,
  DollarSign,
  Target,
  Award,
  Download,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

const kpiData = [
  {
    label: "Umumiy daromad",
    value: "485M",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-chart-2/20 to-chart-2/5",
  },
  {
    label: "Faol loyihalar",
    value: "24",
    change: "+3",
    trend: "up",
    icon: FolderKanban,
    color: "from-primary/20 to-primary/5",
  },
  {
    label: "Mijozlar soni",
    value: "156",
    change: "+18",
    trend: "up",
    icon: Users,
    color: "from-chart-4/20 to-chart-4/5",
  },
  {
    label: "O'rtacha samaradorlik",
    value: "87%",
    change: "+5%",
    trend: "up",
    icon: Target,
    color: "from-chart-1/20 to-chart-1/5",
  },
]

const monthlyRevenue = [
  { month: "Yan", value: 32 },
  { month: "Fev", value: 38 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 42 },
  { month: "May", value: 45 },
  { month: "Iyn", value: 48 },
  { month: "Iyl", value: 52 },
  { month: "Avg", value: 44 },
  { month: "Sen", value: 50 },
  { month: "Okt", value: 55 },
  { month: "Noy", value: 58 },
  { month: "Dek", value: 65 },
]

const projectsByType = [
  { type: "Marketing", count: 8, percentage: 33, color: "bg-chart-1" },
  { type: "Yuridik", count: 5, percentage: 21, color: "bg-chart-2" },
  { type: "Dizayn", count: 6, percentage: 25, color: "bg-chart-4" },
  { type: "Media", count: 3, percentage: 12, color: "bg-chart-3" },
  { type: "Boshqa", count: 2, percentage: 9, color: "bg-muted-foreground" },
]

const topClients = [
  { name: "TechCorp LLC", revenue: 125000000, projects: 8, growth: 15 },
  { name: "Mega Bank", revenue: 98000000, projects: 5, growth: 22 },
  { name: "Global Trade", revenue: 76000000, projects: 6, growth: 8 },
  { name: "StartUp Inc", revenue: 54000000, projects: 4, growth: 35 },
  { name: "Local Market", revenue: 42000000, projects: 3, growth: -5 },
]

const teamPerformance = [
  { name: "Marketing jamoasi", efficiency: 92, tasks: 45, completed: 41 },
  { name: "Dizayn jamoasi", efficiency: 88, tasks: 38, completed: 33 },
  { name: "Kontent jamoasi", efficiency: 85, tasks: 52, completed: 44 },
  { name: "Sotuvlar jamoasi", efficiency: 91, tasks: 28, completed: 25 },
  { name: "Texnik jamoa", efficiency: 94, tasks: 35, completed: 33 },
]

export function AnalyticsSection() {
  const [period, setPeriod] = useState<"week" | "month" | "quarter" | "year">("month")

  const formatMoney = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(0) + "M"
    }
    return new Intl.NumberFormat("uz-UZ").format(amount)
  }

  const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.value))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Analitika</h1>
          <p className="mt-1 text-muted-foreground">Biznes ko'rsatkichlarini kuzating va tahlil qiling</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center rounded-lg border border-border p-1">
            {[
              { id: "week", label: "Hafta" },
              { id: "month", label: "Oy" },
              { id: "quarter", label: "Chorak" },
              { id: "year", label: "Yil" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id as typeof period)}
                className={`rounded-md px-3 py-1.5 text-sm ${period === p.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Eksport
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <div
            key={kpi.label}
            className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${kpi.color} p-5 backdrop-blur-xl`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="mt-1 text-3xl font-bold text-foreground">{kpi.value}</p>
                <div
                  className={`mt-2 flex items-center gap-1 text-sm font-medium ${kpi.trend === "up" ? "text-chart-2" : "text-chart-1"}`}
                >
                  {kpi.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {kpi.change}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/50">
                <kpi.icon className="h-6 w-6 text-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Daromad dinamikasi</h3>
              <p className="text-sm text-muted-foreground">Oylik daromad ko'rsatkichlari</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <LineChart className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="h-64 flex items-end gap-2">
            {monthlyRevenue.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg transition-all hover:from-primary/90 hover:to-primary/40 cursor-pointer"
                  style={{ height: `${(data.value / maxRevenue) * 200}px` }}
                />
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects by Type */}
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Loyihalar turi bo'yicha</h3>
              <p className="text-sm text-muted-foreground">Faol loyihalar taqsimoti</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/10">
              <PieChart className="h-5 w-5 text-chart-4" />
            </div>
          </div>
          <div className="space-y-4">
            {projectsByType.map((item) => (
              <div key={item.type} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.type}</span>
                  <span className="text-muted-foreground">
                    {item.count} ta ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Top mijozlar</h3>
              <p className="text-sm text-muted-foreground">Daromad bo'yicha</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-2/10">
              <Award className="h-5 w-5 text-chart-2" />
            </div>
          </div>
          <div className="space-y-3">
            {topClients.map((client, i) => (
              <div
                key={client.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.projects} ta loyiha</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatMoney(client.revenue)} so'm</p>
                  <p
                    className={`text-xs flex items-center justify-end gap-0.5 ${client.growth > 0 ? "text-chart-2" : "text-chart-1"}`}
                  >
                    {client.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(client.growth)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Jamoa samaradorligi</h3>
              <p className="text-sm text-muted-foreground">Vazifalar bajarilishi</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/10">
              <BarChart3 className="h-5 w-5 text-chart-1" />
            </div>
          </div>
          <div className="space-y-4">
            {teamPerformance.map((team) => (
              <div key={team.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{team.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {team.completed}/{team.tasks}
                    </span>
                    <span
                      className={`text-sm font-semibold ${team.efficiency >= 90 ? "text-chart-2" : team.efficiency >= 80 ? "text-chart-4" : "text-chart-1"}`}
                    >
                      {team.efficiency}%
                    </span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all ${team.efficiency >= 90 ? "bg-chart-2" : team.efficiency >= 80 ? "bg-chart-4" : "bg-chart-1"}`}
                    style={{ width: `${team.efficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
