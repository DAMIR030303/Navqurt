"use client"

import {
  Calendar,
  Clock,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sunrise,
  Users,
  MapPin,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const weekDays = ["Dush", "Sesh", "Chor", "Pay", "Jum", "Shan", "Yak"]


const shiftTypes = [
  { id: "morning", label: "Ertalabki", icon: Sunrise, time: "06:00 - 14:00", color: "from-amber-500 to-orange-500" },
  { id: "day", label: "Kunduzi", icon: Sun, time: "09:00 - 18:00", color: "from-blue-500 to-cyan-500" },
  { id: "evening", label: "Kechki", icon: Moon, time: "14:00 - 22:00", color: "from-purple-500 to-pink-500" },
  { id: "night", label: "Tungi", icon: Moon, time: "22:00 - 06:00", color: "from-indigo-500 to-purple-500" },
]

const departments = [
  { id: "all", label: "Barcha bo'limlar" },
  { id: "it", label: "IT bo'limi" },
  { id: "hr", label: "HR bo'limi" },
  { id: "sales", label: "Savdo bo'limi" },
  { id: "support", label: "Qo'llab-quvvatlash" },
  { id: "finance", label: "Moliya bo'limi" },
]

const shifts = [
  {
    id: 1,
    employee: "Alisher Karimov",
    avatar: "AK",
    department: "IT bo'limi",
    type: "day",
    date: "2024-12-09",
    dayIndex: 0,
    location: "Bosh ofis",
    status: "active",
  },
  {
    id: 2,
    employee: "Dilnoza Rahimova",
    avatar: "DR",
    department: "HR bo'limi",
    type: "morning",
    date: "2024-12-09",
    dayIndex: 0,
    location: "Bosh ofis",
    status: "active",
  },
  {
    id: 3,
    employee: "Bobur Toshev",
    avatar: "BT",
    department: "Savdo bo'limi",
    type: "evening",
    date: "2024-12-09",
    dayIndex: 0,
    location: "Filial #2",
    status: "pending",
  },
  {
    id: 4,
    employee: "Malika Azizova",
    avatar: "MA",
    department: "Qo'llab-quvvatlash",
    type: "night",
    date: "2024-12-10",
    dayIndex: 1,
    location: "Bosh ofis",
    status: "active",
  },
  {
    id: 5,
    employee: "Jasur Ergashev",
    avatar: "JE",
    department: "IT bo'limi",
    type: "day",
    date: "2024-12-10",
    dayIndex: 1,
    location: "Bosh ofis",
    status: "active",
  },
  {
    id: 6,
    employee: "Nodira Karimova",
    avatar: "NK",
    department: "Moliya bo'limi",
    type: "morning",
    date: "2024-12-11",
    dayIndex: 2,
    location: "Bosh ofis",
    status: "active",
  },
  {
    id: 7,
    employee: "Sardor Mirzayev",
    avatar: "SM",
    department: "Savdo bo'limi",
    type: "day",
    date: "2024-12-12",
    dayIndex: 3,
    location: "Filial #1",
    status: "pending",
  },
  {
    id: 8,
    employee: "Gulnora Tosheva",
    avatar: "GT",
    department: "HR bo'limi",
    type: "evening",
    date: "2024-12-13",
    dayIndex: 4,
    location: "Bosh ofis",
    status: "active",
  },
]

const stats = [
  { label: "Jami smenalar", value: "156", trend: "+12%", icon: Calendar, color: "from-blue-500 to-cyan-500" },
  { label: "Bugungi smenalar", value: "24", trend: "+3", icon: Clock, color: "from-emerald-500 to-green-500" },
  { label: "Kutilayotgan", value: "8", trend: "-2", icon: AlertCircle, color: "from-amber-500 to-orange-500" },
  { label: "Xodimlar soni", value: "128", trend: "+5%", icon: Users, color: "from-purple-500 to-pink-500" },
]

export function ShiftsSection() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date("2024-12-09"))
  const [viewMode, setViewMode] = useState<"week" | "list">("week")

  const getWeekDates = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(date.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates()

  const getShiftType = (typeId: string) => shiftTypes.find((t) => t.id === typeId)

  const getShiftsForDay = (dayIndex: number) => {
    return shifts.filter((s) => s.dayIndex === dayIndex)
  }

  const filteredShifts =
    selectedDepartment === "all"
      ? shifts
      : shifts.filter((s) => s.department === departments.find((d) => d.id === selectedDepartment)?.label)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Smenalar boshqaruvi</h1>
          <p className="mt-1 text-muted-foreground">Xodimlar smenalarini rejalashtiring va boshqaring</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
          <Plus className="h-4 w-4" />
          Yangi smena
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-chart-2">{stat.trend} bu hafta</p>
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

      {/* Filters and View Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border/50 bg-card/50 backdrop-blur-sm">
                <Filter className="h-4 w-4" />
                {departments.find((d) => d.id === selectedDepartment)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {departments.map((dept) => (
                <DropdownMenuItem key={dept.id} onClick={() => setSelectedDepartment(dept.id)}>
                  {dept.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Shift Type Legend */}
          <div className="hidden items-center gap-3 lg:flex">
            {shiftTypes.map((type) => (
              <div key={type.id} className="flex items-center gap-1.5">
                <div className={cn("h-2.5 w-2.5 rounded-full bg-gradient-to-r", type.color)} />
                <span className="text-xs text-muted-foreground">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border/50 bg-card/50 p-1 backdrop-blur-sm">
            <button
              onClick={() => setViewMode("week")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                viewMode === "week"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Haftalik
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Ro'yxat
            </button>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => {
            const newDate = new Date(currentWeekStart)
            newDate.setDate(newDate.getDate() - 7)
            setCurrentWeekStart(newDate)
          }}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <h3 className="font-semibold text-foreground">
            {weekDates[0].toLocaleDateString("uz-UZ", { month: "long", year: "numeric" })}
          </h3>
          <p className="text-sm text-muted-foreground">
            {weekDates[0].getDate()} - {weekDates[6].getDate()}{" "}
            {weekDates[6].toLocaleDateString("uz-UZ", { month: "long" })}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => {
            const newDate = new Date(currentWeekStart)
            newDate.setDate(newDate.getDate() + 7)
            setCurrentWeekStart(newDate)
          }}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Week View */}
      {viewMode === "week" && (
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
          {/* Week Header */}
          <div className="grid grid-cols-7 border-b border-border/50">
            {weekDates.map((date, index) => {
              const isToday = date.toDateString() === new Date("2024-12-09").toDateString()
              return (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col items-center justify-center border-r border-border/50 p-3 last:border-r-0",
                    isToday && "bg-primary/5",
                  )}
                >
                  <span className="text-xs font-medium text-muted-foreground">{weekDays[index]}</span>
                  <span
                    className={cn(
                      "mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                      isToday ? "bg-primary text-primary-foreground" : "text-foreground",
                    )}
                  >
                    {date.getDate()}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Week Body */}
          <div className="grid grid-cols-7">
            {weekDates.map((_, dayIndex) => {
              const dayShifts = getShiftsForDay(dayIndex)
              const isToday = dayIndex === 0
              return (
                <div
                  key={dayIndex}
                  className={cn(
                    "min-h-[200px] border-r border-border/50 p-2 last:border-r-0",
                    isToday && "bg-primary/5",
                  )}
                >
                  <div className="space-y-2">
                    {dayShifts.map((shift) => {
                      const shiftType = getShiftType(shift.type)
                      return (
                        <div
                          key={shift.id}
                          className="group relative overflow-hidden rounded-lg border border-border/50 bg-card p-2 transition-all hover:border-primary/50 hover:shadow-md cursor-pointer"
                        >
                          <div
                            className={cn("absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b", shiftType?.color)}
                          />
                          <div className="pl-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-[10px] font-bold text-primary-foreground">
                                {shift.avatar}
                              </div>
                              <span className="text-xs font-medium text-foreground truncate">
                                {shift.employee.split(" ")[0]}
                              </span>
                            </div>
                            <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {shiftType?.time}
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "mt-1.5 text-[10px] px-1.5 py-0",
                                shift.status === "active"
                                  ? "border-chart-2/50 bg-chart-2/10 text-chart-2"
                                  : "border-amber-500/50 bg-amber-500/10 text-amber-500",
                              )}
                            >
                              {shift.status === "active" ? "Faol" : "Kutilmoqda"}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                    {dayShifts.length === 0 && (
                      <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border/50">
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Xodim
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Bo'lim
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Smena turi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Vaqti
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Joylashuv
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Holati
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredShifts.map((shift) => {
                  const shiftType = getShiftType(shift.type)
                  return (
                    <tr key={shift.id} className="group transition-colors hover:bg-muted/20">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20">
                            {shift.avatar}
                          </div>
                          <span className="font-medium text-foreground">{shift.employee}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">{shift.department}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br",
                              shiftType?.color,
                            )}
                          >
                            {shiftType && <shiftType.icon className="h-3.5 w-3.5 text-white" />}
                          </div>
                          <span className="text-sm font-medium text-foreground">{shiftType?.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {shiftType?.time}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {shift.location}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={cn(
                            "gap-1",
                            shift.status === "active"
                              ? "border-chart-2/50 bg-chart-2/10 text-chart-2"
                              : "border-amber-500/50 bg-amber-500/10 text-amber-500",
                          )}
                        >
                          {shift.status === "active" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          {shift.status === "active" ? "Faol" : "Kutilmoqda"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Tahrirlash
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Copy className="h-4 w-4" />
                              Nusxa olish
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" />
                              O'chirish
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Shift Templates */}
      <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-foreground">Tezkor smena shablonlari</h3>
        <p className="mt-1 text-sm text-muted-foreground">Tayyor shablonlardan foydalaning</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {shiftTypes.map((type) => (
            <button
              key={type.id}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-4 text-left transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-5",
                  type.color,
                )}
              />
              <div className="relative">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                    type.color,
                  )}
                >
                  <type.icon className="h-5 w-5 text-white" />
                </div>
                <h4 className="mt-3 font-semibold text-foreground">{type.label} smena</h4>
                <p className="mt-1 text-sm text-muted-foreground">{type.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
