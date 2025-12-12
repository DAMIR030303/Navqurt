"use client"

import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  TrendingUp,
  Star,
  BadgeCheck,
  Clock,
  FileText,
  Award,
  Target,
  MessageSquare,
  Edit,
  Download,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Employee {
  id: number
  first_name?: string
  last_name?: string
  name: string
  role?: string
  department?: string
  email?: string
  phone?: string
  location?: string
  joinDate?: string
  status?: string
  avatar: string
  performance?: number
  isTopPerformer?: boolean
  position?: string
  avatar_url?: string
  join_date?: string
  is_top_performer?: boolean
}

interface EmployeeProfileModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
}

export function EmployeeProfileModal({ isOpen, onClose, employee }: EmployeeProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "attendance" | "documents">("overview")

  if (!isOpen || !employee) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30"
      case "vacation":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      case "inactive":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Faol"
      case "vacation":
        return "Ta'tilda"
      case "inactive":
        return "Nofaol"
      default:
        return status
    }
  }

  const tabs = [
    { id: "overview", label: "Umumiy" },
    { id: "tasks", label: "Vazifalar" },
    { id: "attendance", label: "Davomat" },
    { id: "documents", label: "Hujjatlar" },
  ]

  const recentTasks = [
    { title: "Dashboard dizaynini yakunlash", status: "completed", date: "Bugun" },
    { title: "API integratsiya", status: "in-progress", date: "Ertaga" },
    { title: "Test yozish", status: "pending", date: "3 kun" },
  ]

  const achievements = [
    { title: "Oyning eng yaxshi xodimi", date: "2024-yil Noyabr", icon: Award },
    { title: "100% davomat", date: "2024-yil Oktyabr", icon: Target },
    { title: "5 ta loyiha yakunlandi", date: "2024-yil", icon: Star },
  ]

  const attendanceStats = [
    { label: "Bu oy davomati", value: "96%", trend: "+2%" },
    { label: "Ish soatlari", value: "168 soat", trend: "+8 soat" },
    { label: "Kechikishlar", value: "2 marta", trend: "-1" },
    { label: "Ta'til kunlari", value: "3 kun", trend: "0" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose()
          }
        }}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header Background */}
        <div className="relative h-32 bg-gradient-to-br from-primary via-primary/80 to-chart-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/abstract-pattern.png')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Edit button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-16 top-4 gap-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <Edit className="h-4 w-4" />
            Tahrirlash
          </Button>
        </div>

        {/* Profile Section */}
        <div className="relative px-6 pb-4">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <div className="relative">
              <div
                className={cn(
                  "flex h-28 w-28 items-center justify-center rounded-2xl text-3xl font-bold text-white shadow-xl border-4 border-card",
                  employee.isTopPerformer
                    ? "bg-gradient-to-br from-chart-4 to-chart-1"
                    : "bg-gradient-to-br from-primary to-primary/70",
                )}
              >
                {employee.avatar}
              </div>
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-card",
                  employee.status === "active"
                    ? "bg-chart-2"
                    : employee.status === "vacation"
                      ? "bg-chart-4"
                      : "bg-destructive",
                )}
              />
              {employee.isTopPerformer && (
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-chart-4 shadow-lg border-2 border-card">
                  <Star className="h-4 w-4 text-white fill-white" />
                </div>
              )}
            </div>
          </div>

          {/* Name & Role */}
          <div className="pt-14 pl-36">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">{employee.name}</h2>
              {employee.isTopPerformer && <BadgeCheck className="h-6 w-6 text-primary" />}
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                  getStatusColor(employee.status || 'active'),
                )}
              >
                {getStatusText(employee.status || 'active')}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{employee.role}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {employee.department}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {employee.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {employee.joinDate || employee.join_date
                  ? new Date(employee.joinDate || employee.join_date || '').toLocaleDateString("uz-UZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Noma'lum"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border/50 px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-colors",
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-320px)] p-6">
          {activeTab === "overview" && (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Contact Info */}
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-5">
                <h3 className="font-semibold text-foreground mb-4">Bog'lanish ma'lumotlari</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground">{employee.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-2/10">
                      <Phone className="h-5 w-5 text-chart-2" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Telefon</p>
                      <p className="text-sm font-medium text-foreground">{employee.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/10">
                      <MapPin className="h-5 w-5 text-chart-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Manzil</p>
                      <p className="text-sm font-medium text-foreground">{employee.location}, O'zbekiston</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1 gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Xabar yuborish
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent">
                    <Phone className="h-4 w-4" />
                    Qo'ng'iroq
                  </Button>
                </div>
              </div>

              {/* Performance */}
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-5">
                <h3 className="font-semibold text-foreground mb-4">Samaradorlik</h3>
                <div className="flex items-center justify-center py-4">
                  <div className="relative">
                    <svg className="h-32 w-32 -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(employee.performance || 0) * 3.52} 352`}
                        className={cn(
                          (employee.performance || 0) >= 90
                            ? "text-chart-2"
                            : (employee.performance || 0) >= 80
                              ? "text-primary"
                              : "text-chart-4",
                        )}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-foreground">{employee.performance || 0}%</span>
                      <span className="text-xs text-muted-foreground">Samaradorlik</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-chart-2" />
                  <span className="text-chart-2 font-medium">+5% o'tgan oyga nisbatan</span>
                </div>
              </div>

              {/* Recent Tasks */}
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">So'nggi vazifalar</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Barchasini ko'rish
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentTasks.map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl bg-background/50 p-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            task.status === "completed"
                              ? "bg-chart-2"
                              : task.status === "in-progress"
                                ? "bg-chart-4"
                                : "bg-muted-foreground",
                          )}
                        />
                        <span className="text-sm text-foreground">{task.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{task.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-5">
                <h3 className="font-semibold text-foreground mb-4">Yutuqlar</h3>
                <div className="space-y-3">
                  {achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-xl bg-background/50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-chart-4 to-chart-1">
                        <achievement.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-6">
              {/* Attendance Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {attendanceStats.map((stat, idx) => (
                  <div key={idx} className="rounded-2xl border border-border/50 bg-muted/20 p-4">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                    <p
                      className={cn(
                        "mt-1 text-xs font-medium",
                        stat.trend.startsWith("+") || stat.trend === "0" ? "text-chart-2" : "text-destructive",
                      )}
                    >
                      {stat.trend} o'tgan oyga nisbatan
                    </p>
                  </div>
                ))}
              </div>

              {/* Calendar placeholder */}
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-5">
                <h3 className="font-semibold text-foreground mb-4">Davomat tarixi</h3>
                <div className="grid grid-cols-7 gap-2">
                  {["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Ya"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "aspect-square rounded-lg flex items-center justify-center text-sm",
                        i === 14 || i === 21
                          ? "bg-chart-4/20 text-chart-4"
                          : i === 6 || i === 13 || i === 20 || i === 27
                            ? "bg-muted/50 text-muted-foreground"
                            : "bg-chart-2/20 text-chart-2",
                      )}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                  <span className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-chart-2/20" />
                    Keldi
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-chart-4/20" />
                    Kechikdi
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-muted/50" />
                    Dam olish kuni
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Barcha vazifalar</h3>
                <Button size="sm" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Yangi vazifa
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: "Dashboard dizaynini yakunlash",
                    status: "completed",
                    priority: "yuqori",
                    date: "2024-12-05",
                  },
                  { title: "API integratsiya", status: "in-progress", priority: "yuqori", date: "2024-12-10" },
                  { title: "Test yozish", status: "pending", priority: "o'rta", date: "2024-12-12" },
                  { title: "Dokumentatsiya tayyorlash", status: "pending", priority: "past", date: "2024-12-15" },
                  { title: "Code review", status: "completed", priority: "o'rta", date: "2024-12-03" },
                ].map((task, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-2xl border border-border/50 bg-muted/20 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-3 w-3 rounded-full",
                          task.status === "completed"
                            ? "bg-chart-2"
                            : task.status === "in-progress"
                              ? "bg-chart-4"
                              : "bg-muted-foreground",
                        )}
                      />
                      <div>
                        <p className="font-medium text-foreground">{task.title}</p>
                        <p className="text-xs text-muted-foreground">Muddat: {task.date}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        task.priority === "yuqori"
                          ? "bg-destructive/20 text-destructive"
                          : task.priority === "o'rta"
                            ? "bg-chart-4/20 text-chart-4"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Hujjatlar</h3>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Barchasini yuklab olish
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "Mehnat shartnomasi", type: "PDF", size: "2.4 MB", date: "2023-03-15" },
                  { name: "Pasport nusxasi", type: "PDF", size: "1.2 MB", date: "2023-03-15" },
                  { name: "Diplom", type: "PDF", size: "3.1 MB", date: "2023-03-15" },
                  { name: "Sertifikatlar", type: "ZIP", size: "8.5 MB", date: "2024-06-20" },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-2xl border border-border/50 bg-muted/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
