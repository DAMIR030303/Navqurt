"use client"

import {
  Clock,
  UserCheck,
  UserX,
  CalendarDays,
  Search,
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut,
  Coffee,
  Timer,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Calendar,
  TrendingUp,
  Building2,
} from "lucide-react"
import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const attendanceStats = [
  {
    title: "Bugun kelganlar",
    value: "98",
    total: "128",
    percentage: "76.5%",
    icon: UserCheck,
    trend: "+5%",
    trendUp: true,
    gradient: "from-chart-2 to-emerald-600",
  },
  {
    title: "Kelmagan xodimlar",
    value: "12",
    subtitle: "8 ta sababli",
    icon: UserX,
    trend: "-2%",
    trendUp: true,
    gradient: "from-destructive to-red-600",
  },
  {
    title: "Kechikkanlar",
    value: "15",
    subtitle: "O'rtacha 12 daqiqa",
    icon: AlertTriangle,
    trend: "+3%",
    trendUp: false,
    gradient: "from-chart-4 to-amber-600",
  },
  {
    title: "Ish soatlari",
    value: "756",
    subtitle: "Bugun jami soat",
    icon: Timer,
    trend: "+8%",
    trendUp: true,
    gradient: "from-primary to-blue-600",
  },
]

const todayAttendance = [
  {
    id: 1,
    name: "Aziza Rahimova",
    position: "Frontend dasturchi",
    department: "IT bo'limi",
    avatar: "AR",
    checkIn: "08:45",
    checkOut: "18:00",
    status: "present",
    workHours: "9s 15d",
    breakTime: "1s 00d",
  },
  {
    id: 2,
    name: "Bobur Karimov",
    position: "Backend dasturchi",
    department: "IT bo'limi",
    avatar: "BK",
    checkIn: "09:15",
    checkOut: null,
    status: "late",
    workHours: "7s 45d",
    breakTime: "45d",
  },
  {
    id: 3,
    name: "Dilnoza Tosheva",
    position: "UI/UX dizayner",
    department: "Dizayn",
    avatar: "DT",
    checkIn: "08:30",
    checkOut: "17:30",
    status: "present",
    workHours: "9s 00d",
    breakTime: "1s 00d",
  },
  {
    id: 4,
    name: "Eldor Sobirov",
    position: "Loyiha menejeri",
    department: "Boshqaruv",
    avatar: "ES",
    checkIn: null,
    checkOut: null,
    status: "absent",
    workHours: "-",
    breakTime: "-",
  },
  {
    id: 5,
    name: "Farrux Aliyev",
    position: "DevOps muhandisi",
    department: "IT bo'limi",
    avatar: "FA",
    checkIn: "08:55",
    checkOut: null,
    status: "present",
    workHours: "8s 05d",
    breakTime: "30d",
  },
  {
    id: 6,
    name: "Gulnora Yusupova",
    position: "HR mutaxassisi",
    department: "HR bo'limi",
    avatar: "GY",
    checkIn: null,
    checkOut: null,
    status: "leave",
    workHours: "-",
    breakTime: "-",
  },
  {
    id: 7,
    name: "Husniddin Qodirov",
    position: "QA muhandisi",
    department: "IT bo'limi",
    avatar: "HQ",
    checkIn: "09:30",
    checkOut: null,
    status: "late",
    workHours: "7s 30d",
    breakTime: "1s 00d",
  },
  {
    id: 8,
    name: "Iroda Mirzayeva",
    position: "Marketing menejeri",
    department: "Marketing",
    avatar: "IM",
    checkIn: "08:40",
    checkOut: "18:15",
    status: "present",
    workHours: "9s 35d",
    breakTime: "1s 00d",
  },
]

const weekDays = [
  { day: "Du", date: 2, attendance: 95 },
  { day: "Se", date: 3, attendance: 92 },
  { day: "Ch", date: 4, attendance: 88 },
  { day: "Pa", date: 5, attendance: 94 },
  { day: "Ju", date: 6, attendance: 90 },
  { day: "Sh", date: 7, attendance: 45 },
  { day: "Ya", date: 8, attendance: 0, isWeekend: true },
]

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  present: { label: "Keldi", color: "text-chart-2", bgColor: "bg-chart-2/10", icon: CheckCircle2 },
  late: { label: "Kechikdi", color: "text-chart-4", bgColor: "bg-chart-4/10", icon: AlertTriangle },
  absent: { label: "Kelmadi", color: "text-destructive", bgColor: "bg-destructive/10", icon: XCircle },
  leave: { label: "Ta'tilda", color: "text-primary", bgColor: "bg-primary/10", icon: Calendar },
}

export function AttendanceSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"today" | "weekly" | "monthly">("today")

  const filteredAttendance = todayAttendance.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Davomat</h1>
          <p className="mt-1 text-muted-foreground">Xodimlar davomatini kuzating va boshqaring</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <CalendarDays className="h-4 w-4" />
            Hisobot yuklab olish
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
            <Clock className="h-4 w-4" />
            Qo'lda belgilash
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {attendanceStats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    {stat.total && <span className="text-lg text-muted-foreground">/ {stat.total}</span>}
                  </div>
                  {stat.subtitle && <p className="mt-1 text-sm text-muted-foreground">{stat.subtitle}</p>}
                  {stat.percentage && (
                    <div className="mt-3">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn("h-full rounded-full bg-gradient-to-r", stat.gradient)}
                          style={{ width: stat.percentage }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                    stat.gradient,
                  )}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                <TrendingUp className={cn("h-4 w-4", stat.trendUp ? "text-chart-2" : "text-destructive rotate-180")} />
                <span className={cn("text-sm font-medium", stat.trendUp ? "text-chart-2" : "text-destructive")}>
                  {stat.trend}
                </span>
                <span className="text-sm text-muted-foreground">o'tgan haftaga nisbatan</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Overview */}
      <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Haftalik ko'rinish</h3>
            <p className="text-sm text-muted-foreground">Dekabr 2024</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-foreground">2 - 8 Dekabr</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col items-center rounded-xl p-4 transition-all",
                day.date === 9 ? "bg-primary/10 ring-2 ring-primary" : "bg-muted/30 hover:bg-muted/50",
                day.isWeekend && "opacity-50",
              )}
            >
              <span className="text-xs font-medium text-muted-foreground">{day.day}</span>
              <span className={cn("mt-1 text-lg font-bold", day.date === 9 ? "text-primary" : "text-foreground")}>
                {day.date}
              </span>
              {!day.isWeekend && (
                <>
                  <div className="mt-3 h-16 w-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "w-full rounded-full transition-all",
                        day.attendance >= 90
                          ? "bg-chart-2"
                          : day.attendance >= 70
                            ? "bg-chart-4"
                            : day.attendance > 0
                              ? "bg-destructive"
                              : "bg-muted",
                      )}
                      style={{ height: `${day.attendance}%` }}
                    />
                  </div>
                  <span className="mt-2 text-xs font-medium text-muted-foreground">{day.attendance}%</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {["today", "weekly", "monthly"].map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode(mode as typeof viewMode)}
              className={cn(viewMode === mode && "bg-gradient-to-r from-primary to-primary/80")}
            >
              {mode === "today" ? "Bugun" : mode === "weekly" ? "Haftalik" : "Oylik"}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Xodim qidirish..."
              className="w-64 pl-9 bg-card/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="h-10 rounded-lg border border-border bg-card/50 px-3 text-sm text-foreground"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Barcha holatlar</option>
            <option value="present">Kelganlar</option>
            <option value="late">Kechikkanlar</option>
            <option value="absent">Kelmaganlar</option>
            <option value="leave">Ta'tilda</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Xodim
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Bo'lim
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Kirish
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Chiqish
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Ish vaqti
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tanaffus
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Holat
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredAttendance.map((employee) => {
                const status = statusConfig[employee.status]
                return (
                  <tr key={employee.id} className="group transition-colors hover:bg-muted/20">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 font-semibold text-primary">
                          {employee.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{employee.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {employee.checkIn ? (
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-chart-2/10 px-3 py-1.5">
                          <LogIn className="h-3.5 w-3.5 text-chart-2" />
                          <span className="text-sm font-medium text-chart-2">{employee.checkIn}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {employee.checkOut ? (
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5">
                          <LogOut className="h-3.5 w-3.5 text-primary" />
                          <span className="text-sm font-medium text-primary">{employee.checkOut}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{employee.workHours}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <Coffee className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{employee.breakTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5", status.bgColor)}>
                        <status.icon className={cn("h-3.5 w-3.5", status.color)} />
                        <span className={cn("text-sm font-medium", status.color)}>{status.label}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between border-t border-border/50 px-6 py-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Jami: <span className="font-medium text-foreground">{filteredAttendance.length}</span> xodim
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">1 / 1</span>
            <Button variant="outline" size="sm" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
