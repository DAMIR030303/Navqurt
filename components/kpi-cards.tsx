"use client"

import { Clock, CheckCircle, AlertTriangle, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react"

const kpiData = [
  {
    title: "Davomat darajasi",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: Clock,
    description: "o'tgan oyga nisbatan",
    gradient: "from-primary via-primary/80 to-chart-5",
    bgGradient: "from-primary/20 via-primary/10 to-transparent",
  },
  {
    title: "Bajarilgan vazifalar",
    value: "847",
    change: "+12.5%",
    trend: "up",
    icon: CheckCircle,
    description: "shu oy",
    gradient: "from-chart-2 via-chart-2/80 to-emerald-400",
    bgGradient: "from-chart-2/20 via-chart-2/10 to-transparent",
  },
  {
    title: "Berilgan jarimalar",
    value: "23",
    change: "-8.3%",
    trend: "down",
    icon: AlertTriangle,
    description: "o'tgan oyga nisbatan",
    gradient: "from-chart-3 via-amber-400 to-orange-300",
    bgGradient: "from-chart-3/20 via-chart-3/10 to-transparent",
  },
]

export function KPICards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kpiData.map((kpi, index) => (
        <div
          key={kpi.title}
          className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-border hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} opacity-60`} />

          {/* Animated shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Decorative circle */}
          <div
            className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${kpi.gradient} opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`}
          />

          <div className="relative">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className={`relative rounded-xl bg-gradient-to-br ${kpi.gradient} p-3 shadow-lg`}>
                <kpi.icon className="h-5 w-5 text-white" />
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${kpi.gradient} opacity-50 blur-md`} />
              </div>
              <div
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  kpi.trend === "up" ? "bg-chart-2/15 text-chart-2" : "bg-chart-2/15 text-chart-2"
                }`}
              >
                {kpi.trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {kpi.change}
              </div>
            </div>

            {/* Content */}
            <div className="mt-5">
              <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-4xl font-bold tracking-tight text-card-foreground">{kpi.value}</p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{kpi.description}</p>
            </div>

            {/* Action button */}
            <button className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
              Batafsil ko'rish
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
