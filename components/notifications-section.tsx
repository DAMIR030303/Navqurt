"use client"

import {
  Bell,
  CheckCheck,
  Trash2,
  Settings,
  Filter,
  Users,
  FileText,
  Calendar,
  DollarSign,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Star,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Notification {
  id: number
  title: string
  description: string
  time: string
  date: string
  type: "info" | "success" | "warning" | "error" | "message"
  category: "system" | "task" | "finance" | "hr" | "project" | "message"
  isRead: boolean
  isStarred: boolean
  actionUrl?: string
  sender?: string
  senderAvatar?: string
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Yangi xodim qo'shildi",
    description: "Laylo Karimova Marketing bo'limiga qo'shildi",
    time: "5 daqiqa oldin",
    date: "Bugun",
    type: "success",
    category: "hr",
    isRead: false,
    isStarred: false,
    sender: "Tizim",
  },
  {
    id: 2,
    title: "Vazifa muddati tugayapti",
    description: "'Loyiha taqdimoti' vazifasining muddati 2 soatdan keyin tugaydi",
    time: "30 daqiqa oldin",
    date: "Bugun",
    type: "warning",
    category: "task",
    isRead: false,
    isStarred: true,
  },
  {
    id: 3,
    title: "Yangi xabar",
    description: "Dilshod Rahimov sizga xabar yubordi",
    time: "1 soat oldin",
    date: "Bugun",
    type: "message",
    category: "message",
    isRead: false,
    isStarred: false,
    sender: "Dilshod R.",
    senderAvatar: "DR",
  },
  {
    id: 4,
    title: "To'lov qabul qilindi",
    description: "Navoiy Media Group dan 15,000,000 so'm to'lov qabul qilindi",
    time: "2 soat oldin",
    date: "Bugun",
    type: "success",
    category: "finance",
    isRead: true,
    isStarred: false,
  },
  {
    id: 5,
    title: "Loyiha holati o'zgardi",
    description: "'Marketing kampaniyasi' loyihasi 'Jarayonda' holatiga o'tkazildi",
    time: "3 soat oldin",
    date: "Bugun",
    type: "info",
    category: "project",
    isRead: true,
    isStarred: false,
  },
  {
    id: 6,
    title: "Tizim yangilanishi",
    description: "Tizim bugun kechqurun 22:00 da texnik xizmat uchun to'xtatiladi",
    time: "5 soat oldin",
    date: "Bugun",
    type: "warning",
    category: "system",
    isRead: true,
    isStarred: true,
  },
  {
    id: 7,
    title: "KPI maqsadi bajarildi",
    description: "Sardor Aliyev oylik KPI maqsadini 120% bajargan",
    time: "Kecha",
    date: "Kecha",
    type: "success",
    category: "hr",
    isRead: true,
    isStarred: false,
  },
  {
    id: 8,
    title: "Hujjat tasdiqlandi",
    description: "Mehnat shartnomasi #2451 tasdiqlandi",
    time: "Kecha",
    date: "Kecha",
    type: "success",
    category: "system",
    isRead: true,
    isStarred: false,
  },
  {
    id: 9,
    title: "Davomat ogohlantirish",
    description: "3 ta xodim bugun kechikib keldi",
    time: "Kecha",
    date: "Kecha",
    type: "warning",
    category: "hr",
    isRead: true,
    isStarred: false,
  },
  {
    id: 10,
    title: "Xatolik aniqlandi",
    description: "Moliya modulida xatolik aniqlandi va tuzatildi",
    time: "2 kun oldin",
    date: "07.12.2024",
    type: "error",
    category: "system",
    isRead: true,
    isStarred: false,
  },
]

const categoryIcons: Record<string, typeof Bell> = {
  system: Settings,
  task: FileText,
  finance: DollarSign,
  hr: Users,
  project: Calendar,
  message: MessageSquare,
}

const typeIcons: Record<string, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  message: MessageSquare,
}

const typeColors: Record<string, string> = {
  info: "from-blue-500 to-blue-600",
  success: "from-green-500 to-green-600",
  warning: "from-amber-500 to-amber-600",
  error: "from-red-500 to-red-600",
  message: "from-purple-500 to-purple-600",
}

export function NotificationsSection() {
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredNotifications = notificationsList.filter((n) => {
    if (filter === "unread" && n.isRead) return false
    if (filter === "starred" && !n.isStarred) return false
    if (categoryFilter !== "all" && n.category !== categoryFilter) return false
    return true
  })

  const groupedNotifications = filteredNotifications.reduce(
    (groups, notification) => {
      const date = notification.date
      if (!groups[date]) groups[date] = []
      groups[date].push(notification)
      return groups
    },
    {} as Record<string, Notification[]>,
  )

  const markAsRead = (id: number) => {
    setNotificationsList((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const toggleStar = (id: number) => {
    setNotificationsList((prev) => prev.map((n) => (n.id === id ? { ...n, isStarred: !n.isStarred } : n)))
  }

  const deleteNotification = (id: number) => {
    setNotificationsList((prev) => prev.filter((n) => n.id !== id))
  }

  const unreadCount = notificationsList.filter((n) => !n.isRead).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Bildirishnomalar</h1>
          <p className="mt-1 text-muted-foreground">Barcha yangiliklar va ogohlantirishlar</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4" />
            Barchasini o'qilgan deb belgilash
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Jami", value: notificationsList.length.toString(), icon: Bell, color: "from-blue-500 to-blue-600" },
          { label: "O'qilmagan", value: unreadCount.toString(), icon: Clock, color: "from-red-500 to-red-600" },
          {
            label: "Muhim",
            value: notificationsList.filter((n) => n.isStarred).length.toString(),
            icon: Star,
            color: "from-amber-500 to-amber-600",
          },
          { label: "Bu hafta", value: "24", icon: Calendar, color: "from-green-500 to-green-600" },
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
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {[
            { label: "Barchasi", value: "all" },
            { label: "O'qilmagan", value: "unread" },
            { label: "Muhim", value: "starred" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as typeof filter)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted",
              )}
            >
              {f.label}
              {f.value === "unread" && unreadCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-white/20 text-xs">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Barcha kategoriyalar</option>
            <option value="system">Tizim</option>
            <option value="task">Vazifalar</option>
            <option value="finance">Moliya</option>
            <option value="hr">HR</option>
            <option value="project">Loyihalar</option>
            <option value="message">Xabarlar</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
        {Object.entries(groupedNotifications).length > 0 ? (
          Object.entries(groupedNotifications).map(([date, items]) => (
            <div key={date}>
              <div className="px-4 py-2 bg-muted/30 border-b border-border/30">
                <span className="text-xs font-semibold text-muted-foreground uppercase">{date}</span>
              </div>
              {items.map((notification) => {
                const TypeIcon = typeIcons[notification.type]
                const CategoryIcon = categoryIcons[notification.category]

                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-4 p-4 border-b border-border/30 hover:bg-muted/20 transition-all cursor-pointer",
                      !notification.isRead && "bg-primary/5",
                    )}
                    onClick={() => markAsRead(notification.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        markAsRead(notification.id)
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                        typeColors[notification.type],
                      )}
                    >
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={cn("font-medium text-foreground", !notification.isRead && "font-semibold")}>
                              {notification.title}
                            </h4>
                            {!notification.isRead && <span className="h-2 w-2 rounded-full bg-primary" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{notification.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {notification.time}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CategoryIcon className="h-3 w-3" />
                              {notification.category === "system" && "Tizim"}
                              {notification.category === "task" && "Vazifa"}
                              {notification.category === "finance" && "Moliya"}
                              {notification.category === "hr" && "HR"}
                              {notification.category === "project" && "Loyiha"}
                              {notification.category === "message" && "Xabar"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleStar(notification.id)
                            }}
                          >
                            <Star
                              className={cn("h-4 w-4", notification.isStarred && "fill-amber-500 text-amber-500")}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Bildirishnomalar yo'q</h3>
            <p className="text-sm text-muted-foreground mt-1">Hozircha yangi bildirishnomalar mavjud emas</p>
          </div>
        )}
      </div>
    </div>
  )
}
