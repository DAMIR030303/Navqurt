"use client"

import { Users, Briefcase, TrendingUp, Clock } from "lucide-react"

const stats = [
  { label: "Jami xodimlar", value: "128", icon: Users, change: "+4" },
  { label: "Faol loyihalar", value: "23", icon: Briefcase, change: "+2" },
  { label: "O'sish sur'ati", value: "18%", icon: TrendingUp, change: "+3%" },
  { label: "O'rtacha ish vaqti", value: "7.8h", icon: Clock, change: "-0.2h" },
]

export function StatsOverview() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm transition-all hover:bg-card/50 hover:border-border"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-secondary/80 p-2">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-chart-2">{stat.change}</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
