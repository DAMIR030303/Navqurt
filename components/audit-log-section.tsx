"use client"

import {
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogIn,
  LogOut,
  Settings,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AuditLog {
  id: number
  user: string
  userAvatar: string
  userRole: string
  action: string
  actionType: "create" | "update" | "delete" | "login" | "logout" | "view" | "export" | "settings"
  module: string
  description: string
  ipAddress: string
  device: string
  timestamp: string
  date: string
  status: "success" | "warning" | "error"
  details?: Record<string, string>
}

const auditLogs: AuditLog[] = [
  {
    id: 1,
    user: "Alisher Karimov",
    userAvatar: "AK",
    userRole: "Super Admin",
    action: "Tizimga kirdi",
    actionType: "login",
    module: "Autentifikatsiya",
    description: "Muvaffaqiyatli tizimga kirdi",
    ipAddress: "192.168.1.100",
    device: "Chrome / Windows",
    timestamp: "10:45:23",
    date: "2024-12-09",
    status: "success",
  },
  {
    id: 2,
    user: "Alisher Karimov",
    userAvatar: "AK",
    userRole: "Super Admin",
    action: "Yangi korxona qo'shdi",
    actionType: "create",
    module: "Korxonalar",
    description: "Navoiy Media Group korxonasi qo'shildi",
    ipAddress: "192.168.1.100",
    device: "Chrome / Windows",
    timestamp: "10:30:15",
    date: "2024-12-09",
    status: "success",
    details: { Korxona: "Navoiy Media Group", Tarif: "Premium", Hudud: "Navoiy" },
  },
  {
    id: 3,
    user: "Dilshod Rahimov",
    userAvatar: "DR",
    userRole: "Administrator",
    action: "Xodim ma'lumotlarini o'zgartirdi",
    actionType: "update",
    module: "Xodimlar",
    description: "Laylo Karimova ma'lumotlari yangilandi",
    ipAddress: "192.168.1.105",
    device: "Firefox / MacOS",
    timestamp: "09:55:42",
    date: "2024-12-09",
    status: "success",
    details: { Xodim: "Laylo Karimova", "O'zgarish": "Lavozim: Designer → Senior Designer" },
  },
  {
    id: 4,
    user: "Sardor Aliyev",
    userAvatar: "SA",
    userRole: "Menejer",
    action: "Hisobotni yuklab oldi",
    actionType: "export",
    module: "Hisobotlar",
    description: "Oylik moliya hisoboti eksport qilindi",
    ipAddress: "192.168.1.110",
    device: "Safari / iPhone",
    timestamp: "09:30:18",
    date: "2024-12-09",
    status: "success",
  },
  {
    id: 5,
    user: "Mohira Tosheva",
    userAvatar: "MT",
    userRole: "HR",
    action: "Vazifa yaratdi",
    actionType: "create",
    module: "Vazifalar",
    description: "Yangi vazifa yaratildi: Marketing taqdimoti",
    ipAddress: "192.168.1.112",
    device: "Chrome / Windows",
    timestamp: "09:15:55",
    date: "2024-12-09",
    status: "success",
  },
  {
    id: 6,
    user: "Nozim Qodirov",
    userAvatar: "NQ",
    userRole: "Xodim",
    action: "Parolni o'zgartirishga urinish",
    actionType: "settings",
    module: "Xavfsizlik",
    description: "Noto'g'ri joriy parol kiritildi",
    ipAddress: "192.168.1.115",
    device: "Chrome / Android",
    timestamp: "08:45:33",
    date: "2024-12-09",
    status: "error",
  },
  {
    id: 7,
    user: "Alisher Karimov",
    userAvatar: "AK",
    userRole: "Super Admin",
    action: "Foydalanuvchi rolini o'zgartirdi",
    actionType: "update",
    module: "Foydalanuvchilar",
    description: "Dilshod Rahimov roli o'zgartirildi",
    ipAddress: "192.168.1.100",
    device: "Chrome / Windows",
    timestamp: "17:20:10",
    date: "2024-12-08",
    status: "success",
    details: { Foydalanuvchi: "Dilshod Rahimov", "Eski rol": "Menejer", "Yangi rol": "Administrator" },
  },
  {
    id: 8,
    user: "Tizim",
    userAvatar: "T",
    userRole: "Tizim",
    action: "Avtomatik zaxira nusxa",
    actionType: "export",
    module: "Tizim",
    description: "Kunlik zaxira nusxa yaratildi",
    ipAddress: "127.0.0.1",
    device: "Server",
    timestamp: "03:00:00",
    date: "2024-12-08",
    status: "success",
  },
  {
    id: 9,
    user: "Laylo Karimova",
    userAvatar: "LK",
    userRole: "Designer",
    action: "Hujjat yukladi",
    actionType: "create",
    module: "Hujjatlar",
    description: "Dizayn fayli yuklandi: logo_v2.psd",
    ipAddress: "192.168.1.120",
    device: "Chrome / MacOS",
    timestamp: "16:45:22",
    date: "2024-12-08",
    status: "success",
  },
  {
    id: 10,
    user: "Dilshod Rahimov",
    userAvatar: "DR",
    userRole: "Administrator",
    action: "Mijozni o'chirdi",
    actionType: "delete",
    module: "Mijozlar",
    description: "Test Company mijozi o'chirildi",
    ipAddress: "192.168.1.105",
    device: "Firefox / MacOS",
    timestamp: "15:30:45",
    date: "2024-12-08",
    status: "warning",
  },
]

const actionTypeIcons: Record<string, typeof Plus> = {
  create: Plus,
  update: Edit,
  delete: Trash2,
  login: LogIn,
  logout: LogOut,
  view: Eye,
  export: Download,
  settings: Settings,
}

const actionTypeColors: Record<string, string> = {
  create: "from-green-500 to-green-600",
  update: "from-blue-500 to-blue-600",
  delete: "from-red-500 to-red-600",
  login: "from-emerald-500 to-emerald-600",
  logout: "from-gray-500 to-gray-600",
  view: "from-purple-500 to-purple-600",
  export: "from-amber-500 to-amber-600",
  settings: "from-slate-500 to-slate-600",
}

const statusIcons: Record<string, typeof CheckCircle> = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
}

const statusColors: Record<string, string> = {
  success: "text-green-500",
  warning: "text-amber-500",
  error: "text-red-500",
}

export function AuditLogSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [moduleFilter, setModuleFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [currentPage] = useState(1)

  const filteredLogs = auditLogs.filter((log) => {
    if (
      searchQuery &&
      !log.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    if (actionFilter !== "all" && log.actionType !== actionFilter) return false
    if (moduleFilter !== "all" && log.module !== moduleFilter) return false
    if (dateFilter && log.date !== dateFilter) return false
    return true
  })

  const modules = [...new Set(auditLogs.map((l) => l.module))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Audit Log</h1>
          <p className="mt-1 text-muted-foreground">Tizimdagi barcha harakatlar tarixi</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25">
          <Download className="h-4 w-4" />
          Eksport qilish
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Jami yozuvlar", value: "1,245", icon: FileText, color: "from-blue-500 to-blue-600" },
          { label: "Bugungi", value: "48", icon: Clock, color: "from-green-500 to-green-600" },
          { label: "Ogohlantirishlar", value: "3", icon: AlertTriangle, color: "from-amber-500 to-amber-600" },
          { label: "Xatoliklar", value: "1", icon: XCircle, color: "from-red-500 to-red-600" },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                  stat.color,
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Foydalanuvchi yoki harakatni qidirish..."
              className="pl-9 bg-muted/50 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="all">Barcha harakatlar</option>
            <option value="create">Yaratish</option>
            <option value="update">O'zgartirish</option>
            <option value="delete">O'chirish</option>
            <option value="login">Kirish</option>
            <option value="logout">Chiqish</option>
            <option value="export">Eksport</option>
          </select>
          <select
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
          >
            <option value="all">Barcha modullar</option>
            {modules.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <Input type="date" className="w-[160px]" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground">Foydalanuvchi</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground">Harakat</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground">Modul</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground">Tavsif</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground">Vaqt</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground">Holat</th>
                <th className="text-right p-4 text-xs font-semibold text-muted-foreground">Batafsil</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const ActionIcon = actionTypeIcons[log.actionType]
                const StatusIcon = statusIcons[log.status]

                return (
                  <tr key={log.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-white text-xs font-semibold">
                          {log.userAvatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{log.user}</p>
                          <p className="text-xs text-muted-foreground">{log.userRole}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-white",
                            actionTypeColors[log.actionType],
                          )}
                        >
                          <ActionIcon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm text-foreground">{log.action}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-md bg-muted/50 text-xs font-medium text-foreground">
                        {log.module}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-muted-foreground max-w-[200px] truncate">{log.description}</p>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-foreground">{log.timestamp}</p>
                        <p className="text-xs text-muted-foreground">{log.date}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={cn("flex items-center gap-1", statusColors[log.status])}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="text-xs font-medium capitalize">
                          {log.status === "success" && "Muvaffaqiyatli"}
                          {log.status === "warning" && "Ogohlantirish"}
                          {log.status === "error" && "Xatolik"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setSelectedLog(log)}>
                        <Eye className="h-4 w-4" />
                        Ko'rish
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            {filteredLogs.length} ta yozuvdan {Math.min(10, filteredLogs.length)} tasi ko'rsatilmoqda
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg bg-transparent"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-foreground px-3">1 / 1</span>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg bg-transparent" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border/50 bg-card shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h2 className="text-lg font-semibold">Batafsil ma'lumot</h2>
              <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setSelectedLog(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white font-semibold">
                  {selectedLog.userAvatar}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedLog.user}</h3>
                  <p className="text-sm text-muted-foreground">{selectedLog.userRole}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-muted/30">
                  <p className="text-xs text-muted-foreground">Harakat</p>
                  <p className="font-medium text-foreground">{selectedLog.action}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30">
                  <p className="text-xs text-muted-foreground">Modul</p>
                  <p className="font-medium text-foreground">{selectedLog.module}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30">
                  <p className="text-xs text-muted-foreground">IP manzil</p>
                  <p className="font-medium text-foreground">{selectedLog.ipAddress}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30">
                  <p className="text-xs text-muted-foreground">Qurilma</p>
                  <p className="font-medium text-foreground">{selectedLog.device}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground">Tavsif</p>
                <p className="font-medium text-foreground">{selectedLog.description}</p>
              </div>

              {selectedLog.details && (
                <div className="p-3 rounded-xl bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Qo'shimcha ma'lumotlar</p>
                  {Object.entries(selectedLog.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between text-sm py-1 border-b border-border/30 last:border-0"
                    >
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                <span>
                  {selectedLog.date} {selectedLog.timestamp}
                </span>
                <div className={cn("flex items-center gap-1", statusColors[selectedLog.status])}>
                  {statusIcons[selectedLog.status] && <statusIcons.success className="h-4 w-4" />}
                  <span className="capitalize">
                    {selectedLog.status === "success" && "Muvaffaqiyatli"}
                    {selectedLog.status === "warning" && "Ogohlantirish"}
                    {selectedLog.status === "error" && "Xatolik"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
