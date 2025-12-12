"use client"

import {
  Target,
  TrendingUp,
  TrendingDown,
  Award,
  Users,
  CheckCircle2,
  BarChart3,
  Plus,
  Medal,
  Trophy,
  ArrowUpRight,
  Settings,
  Eye,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface KPIMetric {
  id: number
  name: string
  category: string
  target: number
  current: number
  unit: string
  weight: number
  period: string
  status: "exceeded" | "on-track" | "at-risk" | "below"
}

interface EmployeeKPI {
  id: number
  name: string
  position: string
  department: string
  avatar: string
  overallScore: number
  metrics: {
    name: string
    score: number
    target: number
  }[]
  trend: "up" | "down" | "stable"
  rank: number
}

const kpiMetrics: KPIMetric[] = [
  {
    id: 1,
    name: "Sotuvlar hajmi",
    category: "Moliya",
    target: 100000000,
    current: 112000000,
    unit: "so'm",
    weight: 30,
    period: "Oylik",
    status: "exceeded",
  },
  {
    id: 2,
    name: "Yangi mijozlar",
    category: "Sotuvlar",
    target: 20,
    current: 18,
    unit: "ta",
    weight: 20,
    period: "Oylik",
    status: "on-track",
  },
  {
    id: 3,
    name: "Mijoz qoniqishi",
    category: "Xizmat",
    target: 90,
    current: 87,
    unit: "%",
    weight: 15,
    period: "Oylik",
    status: "at-risk",
  },
  {
    id: 4,
    name: "Loyihalar bajarilishi",
    category: "Operatsiya",
    target: 95,
    current: 92,
    unit: "%",
    weight: 20,
    period: "Oylik",
    status: "on-track",
  },
  {
    id: 5,
    name: "Xodimlar davomati",
    category: "HR",
    target: 98,
    current: 96,
    unit: "%",
    weight: 15,
    period: "Oylik",
    status: "on-track",
  },
]

const employeeKPIs: EmployeeKPI[] = [
  {
    id: 1,
    name: "Sardor Aliyev",
    position: "Sotuv menejeri",
    department: "Sotuvlar",
    avatar: "SA",
    overallScore: 118,
    metrics: [
      { name: "Sotuvlar", score: 125, target: 100 },
      { name: "Yangi mijozlar", score: 110, target: 100 },
      { name: "Konversiya", score: 105, target: 100 },
    ],
    trend: "up",
    rank: 1,
  },
  {
    id: 2,
    name: "Nilufar Azimova",
    position: "Marketing menejeri",
    department: "Marketing",
    avatar: "NA",
    overallScore: 112,
    metrics: [
      { name: "Kampaniyalar", score: 120, target: 100 },
      { name: "ROI", score: 108, target: 100 },
      { name: "Lidlar", score: 105, target: 100 },
    ],
    trend: "up",
    rank: 2,
  },
  {
    id: 3,
    name: "Bobur Yusupov",
    position: "SMM mutaxassisi",
    department: "Marketing",
    avatar: "BY",
    overallScore: 105,
    metrics: [
      { name: "Engagement", score: 115, target: 100 },
      { name: "Followers", score: 102, target: 100 },
      { name: "Kontent", score: 98, target: 100 },
    ],
    trend: "stable",
    rank: 3,
  },
  {
    id: 4,
    name: "Malika Karimova",
    position: "Loyiha menejeri",
    department: "Operatsiya",
    avatar: "MK",
    overallScore: 98,
    metrics: [
      { name: "O'z vaqtida", score: 95, target: 100 },
      { name: "Byudjet", score: 102, target: 100 },
      { name: "Sifat", score: 97, target: 100 },
    ],
    trend: "down",
    rank: 4,
  },
  {
    id: 5,
    name: "Rustam Qodirov",
    position: "Dizayner",
    department: "Kreativ",
    avatar: "RQ",
    overallScore: 95,
    metrics: [
      { name: "Loyihalar", score: 90, target: 100 },
      { name: "Qayta ishlash", score: 105, target: 100 },
      { name: "Vaqt", score: 92, target: 100 },
    ],
    trend: "up",
    rank: 5,
  },
]

const categories = ["Barchasi", "Moliya", "Sotuvlar", "Xizmat", "Operatsiya", "HR"]

export function KPIManagementSection() {
  const [selectedCategory, setSelectedCategory] = useState("Barchasi")
  const [viewMode, setViewMode] = useState<"metrics" | "employees">("metrics")

  const getStatusColor = (status: KPIMetric["status"]) => {
    const colors = {
      exceeded: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "on-track": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "at-risk": "bg-amber-500/20 text-amber-400 border-amber-500/30",
      below: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return colors[status]
  }

  const getStatusLabel = (status: KPIMetric["status"]) => {
    const labels = {
      exceeded: "Oshirildi",
      "on-track": "Rejalashtirilgan",
      "at-risk": "Xavf ostida",
      below: "Past",
    }
    return labels[status]
  }

  const getScoreColor = (score: number) => {
    if (score >= 110) return "text-emerald-400"
    if (score >= 100) return "text-blue-400"
    if (score >= 90) return "text-amber-400"
    return "text-red-400"
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-400" />
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-300" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />
    return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
  }

  const filteredMetrics =
    selectedCategory === "Barchasi" ? kpiMetrics : kpiMetrics.filter((m) => m.category === selectedCategory)

  const stats = [
    { label: "O'rtacha ball", value: "104%", icon: Target, color: "from-primary to-primary/70", trend: "+8%" },
    {
      label: "Maqsadga erishish",
      value: "78%",
      icon: CheckCircle2,
      color: "from-emerald-500 to-emerald-600",
      trend: "+5%",
    },
    { label: "Faol KPIlar", value: "24", icon: BarChart3, color: "from-amber-500 to-amber-600", trend: "0" },
    { label: "Top performer", value: "12", icon: Award, color: "from-purple-500 to-purple-600", trend: "+3" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">KPI Boshqaruvi</h1>
          <p className="mt-1 text-muted-foreground">Asosiy samaradorlik ko'rsatkichlarini kuzating</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Sozlash
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25">
            <Plus className="h-4 w-4" />
            Yangi KPI
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                  stat.color,
                )}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-400">
                <ArrowUpRight className="h-4 w-4" />
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View Toggle & Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "metrics" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("metrics")}
            className="gap-2"
          >
            <Target className="h-4 w-4" />
            KPI metriklari
          </Button>
          <Button
            variant={viewMode === "employees" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("employees")}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            Xodimlar reytingi
          </Button>
        </div>
        {viewMode === "metrics" && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Metrics View */}
      {viewMode === "metrics" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMetrics.map((metric) => {
            const progress = (metric.current / metric.target) * 100
            return (
              <div
                key={metric.id}
                className="group rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-xl transition-all hover:shadow-lg hover:border-primary/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-foreground">{metric.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.category} • {metric.period}
                    </p>
                  </div>
                  <span
                    className={cn("rounded-full border px-2 py-0.5 text-xs font-medium", getStatusColor(metric.status))}
                  >
                    {getStatusLabel(metric.status)}
                  </span>
                </div>

                <div className="flex items-end justify-between mb-3">
                  <div>
                    <p className="text-3xl font-bold text-foreground">
                      {metric.current.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground ml-1">{metric.unit}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Maqsad: {metric.target.toLocaleString()} {metric.unit}
                    </p>
                  </div>
                  <p className={cn("text-2xl font-bold", getScoreColor(progress))}>{progress.toFixed(0)}%</p>
                </div>

                <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all",
                      progress >= 100
                        ? "bg-emerald-500"
                        : progress >= 90
                          ? "bg-blue-500"
                          : progress >= 75
                            ? "bg-amber-500"
                            : "bg-red-500",
                    )}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                  {progress > 100 && (
                    <div
                      className="absolute inset-y-0 bg-emerald-400/50 rounded-full"
                      style={{ left: "100%", width: `${progress - 100}%` }}
                    />
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Vazn: {metric.weight}%</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    Batafsil
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Employees Ranking View */}
      {viewMode === "employees" && (
        <div className="space-y-4">
          {/* Top 3 */}
          <div className="grid gap-4 md:grid-cols-3">
            {employeeKPIs.slice(0, 3).map((employee, index) => (
              <div
                key={employee.id}
                className={cn(
                  "relative rounded-2xl border p-6 backdrop-blur-xl transition-all hover:shadow-lg",
                  index === 0
                    ? "border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-amber-500/5"
                    : "border-border/50 bg-card/50",
                )}
              >
                <div className="absolute -top-3 -right-3">{getRankIcon(employee.rank)}</div>

                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white shadow-lg",
                      index === 0
                        ? "bg-gradient-to-br from-amber-400 to-amber-600"
                        : "bg-gradient-to-br from-primary to-primary/70",
                    )}
                  >
                    {employee.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.position}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className={cn("text-3xl font-bold", getScoreColor(employee.overallScore))}>
                      {employee.overallScore}%
                    </p>
                    <p className="text-xs text-muted-foreground">Umumiy ball</p>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      employee.trend === "up"
                        ? "text-emerald-400"
                        : employee.trend === "down"
                          ? "text-red-400"
                          : "text-muted-foreground",
                    )}
                  >
                    {employee.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : employee.trend === "down" ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {employee.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{metric.name}</span>
                      <span className={cn("font-medium", getScoreColor(metric.score))}>{metric.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Rest of employees */}
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">#</th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">Xodim</th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">Bo'lim</th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">Ball</th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">Trend</th>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">Metriklar</th>
                </tr>
              </thead>
              <tbody>
                {employeeKPIs.map((employee) => (
                  <tr key={employee.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex h-8 w-8 items-center justify-center">{getRankIcon(employee.rank)}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-white">
                          {employee.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-foreground">{employee.department}</td>
                    <td className="p-4">
                      <span className={cn("text-lg font-bold", getScoreColor(employee.overallScore))}>
                        {employee.overallScore}%
                      </span>
                    </td>
                    <td className="p-4">
                      <div
                        className={cn(
                          "flex items-center gap-1",
                          employee.trend === "up"
                            ? "text-emerald-400"
                            : employee.trend === "down"
                              ? "text-red-400"
                              : "text-muted-foreground",
                        )}
                      >
                        {employee.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : employee.trend === "down" ? (
                          <TrendingDown className="h-4 w-4" />
                        ) : (
                          <span>—</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {employee.metrics.map((m, i) => (
                          <span
                            key={i}
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-medium",
                              m.score >= 100 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400",
                            )}
                          >
                            {m.name}: {m.score}%
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
