"use client"

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Users,
  Clock,
  Calendar,
  DollarSign,
  Activity,
  Filter,
  ChevronDown,
  Printer,
  Mail,
  RefreshCw,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const reportTypes = [
  {
    id: "attendance",
    label: "Davomat hisoboti",
    icon: Clock,
    description: "Xodimlarning kunlik, haftalik va oylik davomati",
    color: "from-emerald-500 to-teal-600",
    lastGenerated: "Bugun, 09:30",
    status: "ready",
  },
  {
    id: "salary",
    label: "Ish haqi hisoboti",
    icon: DollarSign,
    description: "Oylik maosh va qo'shimcha to'lovlar",
    color: "from-blue-500 to-indigo-600",
    lastGenerated: "Kecha, 18:00",
    status: "ready",
  },
  {
    id: "performance",
    label: "Samaradorlik hisoboti",
    icon: TrendingUp,
    description: "Xodimlar ish samaradorligi tahlili",
    color: "from-violet-500 to-purple-600",
    lastGenerated: "3 kun oldin",
    status: "ready",
  },
  {
    id: "tasks",
    label: "Vazifalar hisoboti",
    icon: FileText,
    description: "Bajarilgan va kutilayotgan vazifalar",
    color: "from-amber-500 to-orange-600",
    lastGenerated: "Bugun, 14:15",
    status: "generating",
  },
  {
    id: "shifts",
    label: "Smenalar hisoboti",
    icon: Calendar,
    description: "Smena taqsimoti va statistikasi",
    color: "from-pink-500 to-rose-600",
    lastGenerated: "2 kun oldin",
    status: "ready",
  },
  {
    id: "departments",
    label: "Bo'limlar hisoboti",
    icon: Users,
    description: "Bo'limlar bo'yicha umumiy statistika",
    color: "from-cyan-500 to-sky-600",
    lastGenerated: "Hafta boshi",
    status: "ready",
  },
]

const monthlyStats = [
  { month: "Yan", attendance: 94, tasks: 87, performance: 91 },
  { month: "Fev", attendance: 92, tasks: 85, performance: 88 },
  { month: "Mar", attendance: 96, tasks: 92, performance: 94 },
  { month: "Apr", attendance: 93, tasks: 88, performance: 90 },
  { month: "May", attendance: 95, tasks: 91, performance: 93 },
  { month: "Iyn", attendance: 91, tasks: 84, performance: 87 },
  { month: "Iyl", attendance: 97, tasks: 95, performance: 96 },
  { month: "Avg", attendance: 94, tasks: 89, performance: 91 },
  { month: "Sen", attendance: 96, tasks: 93, performance: 95 },
  { month: "Okt", attendance: 95, tasks: 90, performance: 92 },
  { month: "Noy", attendance: 93, tasks: 88, performance: 90 },
  { month: "Dek", attendance: 97, tasks: 94, performance: 96 },
]

const departmentStats = [
  { name: "IT bo'limi", employees: 24, attendance: 96, performance: 94, color: "bg-blue-500" },
  { name: "Moliya", employees: 18, attendance: 98, performance: 97, color: "bg-emerald-500" },
  { name: "Marketing", employees: 15, attendance: 94, performance: 91, color: "bg-violet-500" },
  { name: "HR", employees: 12, attendance: 97, performance: 95, color: "bg-amber-500" },
  { name: "Sotuvlar", employees: 32, attendance: 93, performance: 89, color: "bg-pink-500" },
  { name: "Operatsiya", employees: 27, attendance: 95, performance: 92, color: "bg-cyan-500" },
]

const recentReports = [
  { id: 1, name: "Noyabr oylik hisoboti", type: "Davomat", date: "2024-12-01", size: "2.4 MB", format: "PDF" },
  { id: 2, name: "Q4 Samaradorlik tahlili", type: "Samaradorlik", date: "2024-11-30", size: "1.8 MB", format: "XLSX" },
  { id: 3, name: "Haftalik vazifalar", type: "Vazifalar", date: "2024-11-29", size: "856 KB", format: "PDF" },
  { id: 4, name: "Bo'limlar statistikasi", type: "Bo'limlar", date: "2024-11-28", size: "1.2 MB", format: "PDF" },
  { id: 5, name: "Oylik ish haqi", type: "Moliya", date: "2024-11-25", size: "3.1 MB", format: "XLSX" },
]

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const maxValue = Math.max(...monthlyStats.map((s) => Math.max(s.attendance, s.tasks, s.performance)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Hisobotlar</h2>
          <p className="text-muted-foreground">Barcha hisobotlar va tahlillar</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-xl bg-card/80 p-1 backdrop-blur-sm border border-border/50">
            {["week", "month", "quarter", "year"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-all",
                  selectedPeriod === period
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {period === "week" && "Hafta"}
                {period === "month" && "Oy"}
                {period === "quarter" && "Chorak"}
                {period === "year" && "Yil"}
              </button>
            ))}
          </div>
          <Button className="gap-2 rounded-xl bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Yuklab olish</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Jami hisobotlar",
            value: "156",
            change: "+12%",
            trend: "up",
            icon: FileText,
            color: "from-blue-500 to-indigo-600",
          },
          {
            label: "Bu oyda yaratilgan",
            value: "24",
            change: "+8%",
            trend: "up",
            icon: BarChart3,
            color: "from-emerald-500 to-teal-600",
          },
          {
            label: "O'rtacha samaradorlik",
            value: "92%",
            change: "+3%",
            trend: "up",
            icon: TrendingUp,
            color: "from-violet-500 to-purple-600",
          },
          {
            label: "Davomat darajasi",
            value: "95%",
            change: "-1%",
            trend: "down",
            icon: Activity,
            color: "from-amber-500 to-orange-600",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-5 transition-all hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                <div className="mt-2 flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={cn("text-sm font-medium", stat.trend === "up" ? "text-emerald-500" : "text-red-500")}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">o'tgan oyga nisbatan</span>
                </div>
              </div>
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                  stat.color,
                )}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Types Grid */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Hisobot turlari</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border p-5 text-left transition-all hover:shadow-lg",
                selectedReport === report.id ? "border-primary shadow-lg shadow-primary/10" : "border-border/50",
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                      report.color,
                    )}
                  >
                    <report.icon className="h-6 w-6 text-white" />
                  </div>
                  {report.status === "generating" ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-500">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Yaratilmoqda
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-500">
                      Tayyor
                    </span>
                  )}
                </div>
                <h4 className="mt-4 font-semibold text-foreground">{report.label}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Oxirgi: {report.lastGenerated}</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Monthly Trend Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Yillik statistika</h3>
              <p className="text-sm text-muted-foreground">Davomat, vazifalar va samaradorlik</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Davomat</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-muted-foreground">Vazifalar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-violet-500" />
                <span className="text-muted-foreground">Samaradorlik</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center gap-0.5 h-52">
                  <div
                    className="w-2 rounded-t-sm bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all hover:opacity-80"
                    style={{ height: `${(stat.attendance / maxValue) * 100}%` }}
                  />
                  <div
                    className="w-2 rounded-t-sm bg-gradient-to-t from-blue-600 to-blue-400 transition-all hover:opacity-80"
                    style={{ height: `${(stat.tasks / maxValue) * 100}%` }}
                  />
                  <div
                    className="w-2 rounded-t-sm bg-gradient-to-t from-violet-600 to-violet-400 transition-all hover:opacity-80"
                    style={{ height: `${(stat.performance / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{stat.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Stats */}
        <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Bo'limlar</h3>
              <p className="text-sm text-muted-foreground">Samaradorlik bo'yicha</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2.5 w-2.5 rounded-full", dept.color)} />
                    <span className="font-medium text-foreground">{dept.name}</span>
                  </div>
                  <span className="text-muted-foreground">{dept.performance}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", dept.color)}
                    style={{ width: `${dept.performance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Oxirgi hisobotlar</h3>
            <p className="text-sm text-muted-foreground">Yaqinda yaratilgan hisobotlar</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 rounded-lg bg-transparent">
              <Printer className="h-4 w-4" />
              Chop etish
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-lg bg-transparent">
              <Mail className="h-4 w-4" />
              Yuborish
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Hisobot nomi
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Turi
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sana
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Hajmi
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Format
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {recentReports.map((report) => (
                <tr key={report.id} className="group transition-colors hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{report.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{report.size}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        report.format === "PDF" ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-500",
                      )}
                    >
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download className="h-4 w-4" />
                      Yuklab olish
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
