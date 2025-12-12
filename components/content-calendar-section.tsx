"use client"

import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  ImageIcon,
  Video,
  FileText,
  Calendar,
  Clock,
  MoreHorizontal,
  Eye,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
  { id: "twitter", name: "Twitter/X", icon: Twitter, color: "bg-foreground" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "bg-red-600" },
  { id: "website", name: "Veb-sayt", icon: Globe, color: "bg-chart-2" },
]

const contentTypes = [
  { id: "image", label: "Rasm", icon: ImageIcon },
  { id: "video", label: "Video", icon: Video },
  { id: "article", label: "Maqola", icon: FileText },
]

const scheduledPosts = [
  {
    id: 1,
    title: "Yangi mahsulot taqdimoti",
    platform: "instagram",
    type: "image",
    date: "2024-12-09",
    time: "10:00",
    status: "scheduled",
    engagement: { views: 0, likes: 0, comments: 0 },
  },
  {
    id: 2,
    title: "Haftalik yangiliklar",
    platform: "linkedin",
    type: "article",
    date: "2024-12-10",
    time: "09:00",
    status: "draft",
    engagement: { views: 0, likes: 0, comments: 0 },
  },
  {
    id: 3,
    title: "Mijoz muvaffaqiyat hikoyasi",
    platform: "facebook",
    type: "video",
    date: "2024-12-11",
    time: "14:00",
    status: "scheduled",
    engagement: { views: 0, likes: 0, comments: 0 },
  },
  {
    id: 4,
    title: "Soha yangiliklari sharhi",
    platform: "twitter",
    type: "article",
    date: "2024-12-12",
    time: "11:00",
    status: "scheduled",
    engagement: { views: 0, likes: 0, comments: 0 },
  },
  {
    id: 5,
    title: "Behind the scenes video",
    platform: "youtube",
    type: "video",
    date: "2024-12-13",
    time: "16:00",
    status: "draft",
    engagement: { views: 0, likes: 0, comments: 0 },
  },
  {
    id: 6,
    title: "Blog yangi maqola",
    platform: "website",
    type: "article",
    date: "2024-12-14",
    time: "08:00",
    status: "scheduled",
    engagement: { views: 0, likes: 0, comments: 0 },
  },
]

const publishedPosts = [
  {
    id: 1,
    title: "Kompaniya yubiley tadbirimiz",
    platform: "instagram",
    type: "image",
    date: "2024-12-05",
    engagement: { views: 5420, likes: 342, comments: 28, shares: 45 },
  },
  {
    id: 2,
    title: "CEO intervyusi",
    platform: "linkedin",
    type: "video",
    date: "2024-12-03",
    engagement: { views: 2150, likes: 156, comments: 23, shares: 34 },
  },
  {
    id: 3,
    title: "Yangi xizmatlar haqida",
    platform: "facebook",
    type: "article",
    date: "2024-12-01",
    engagement: { views: 3200, likes: 245, comments: 42, shares: 67 },
  },
]

export function ContentCalendarSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11, 1))
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const monthName = currentMonth.toLocaleDateString("uz-UZ", { month: "long", year: "numeric" })

  const days = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"]

  const getPostsForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return scheduledPosts.filter((p) => p.date === dateStr)
  }

  const stats = [
    {
      label: "Rejalashtirilgan",
      value: scheduledPosts.filter((p) => p.status === "scheduled").length,
      color: "text-primary",
    },
    { label: "Qoralama", value: scheduledPosts.filter((p) => p.status === "draft").length, color: "text-chart-4" },
    { label: "Nashr qilingan", value: publishedPosts.length, color: "text-chart-2" },
    { label: "Umumiy ko'rishlar", value: "10.7K", color: "text-chart-1" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Kontent kalendari</h1>
          <p className="mt-1 text-muted-foreground">Ijtimoiy tarmoqlar va veb-sayt kontentini rejalashtiring</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25">
          <Plus className="h-4 w-4" />
          Yangi post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl text-center"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Platform filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedPlatform === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPlatform(null)}
        >
          Barchasi
        </Button>
        {platforms.map((platform) => (
          <Button
            key={platform.id}
            variant={selectedPlatform === platform.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPlatform(platform.id)}
            className="gap-2"
          >
            <platform.icon className="h-4 w-4" />
            {platform.name}
          </Button>
        ))}
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-foreground capitalize">{monthName}</h2>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border p-1">
          <button
            onClick={() => setView("calendar")}
            className={`rounded-md px-3 py-1.5 text-sm ${view === "calendar" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Kalendar
          </button>
          <button
            onClick={() => setView("list")}
            className={`rounded-md px-3 py-1.5 text-sm ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Ro'yxat
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
          {/* Days header */}
          <div className="grid grid-cols-7 border-b border-border">
            {days.map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {/* Empty cells for days before the first day of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-24 border-b border-r border-border p-2 bg-muted/20" />
            ))}
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const posts = getPostsForDay(day)
              const isToday = day === 9 && currentMonth.getMonth() === 11 && currentMonth.getFullYear() === 2024

              return (
                <div
                  key={day}
                  className={`min-h-24 border-b border-r border-border p-2 ${isToday ? "bg-primary/5" : "hover:bg-muted/30"}`}
                >
                  <span
                    className={`text-sm font-medium ${isToday ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground" : "text-foreground"}`}
                  >
                    {day}
                  </span>
                  <div className="mt-1 space-y-1">
                    {posts.slice(0, 2).map((post) => {
                      const platform = platforms.find((p) => p.id === post.platform)!
                      return (
                        <div
                          key={post.id}
                          className={`group cursor-pointer rounded-md p-1.5 text-xs ${platform.color} text-white truncate`}
                        >
                          <div className="flex items-center gap-1">
                            <platform.icon className="h-3 w-3" />
                            <span className="truncate">{post.title}</span>
                          </div>
                        </div>
                      )
                    })}
                    {posts.length > 2 && <span className="text-xs text-muted-foreground">+{posts.length - 2} ta</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {scheduledPosts.map((post) => {
            const platform = platforms.find((p) => p.id === post.platform)!
            const contentType = contentTypes.find((t) => t.id === post.type)!
            return (
              <div
                key={post.id}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${platform.color}`}>
                  <platform.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <contentType.icon className="h-3.5 w-3.5" />
                      {contentType.label}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.date).toLocaleDateString("uz-UZ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.time}
                    </span>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    post.status === "scheduled" ? "bg-chart-2/10 text-chart-2" : "bg-chart-4/10 text-chart-4"
                  }`}
                >
                  {post.status === "scheduled" ? "Rejalashtirilgan" : "Qoralama"}
                </span>
                <button className="rounded-lg p-2 hover:bg-muted">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Published posts performance */}
      <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">So'nggi nashrlar samaradorligi</h3>
        <div className="space-y-4">
          {publishedPosts.map((post) => {
            const platform = platforms.find((p) => p.id === post.platform)!
            return (
              <div key={post.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${platform.color}`}>
                  <platform.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{post.title}</p>
                  <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString("uz-UZ")}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>{post.engagement.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-chart-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.engagement.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.engagement.comments}</span>
                  </div>
                  <div className="flex items-center gap-1 text-chart-2">
                    <Share2 className="h-4 w-4" />
                    <span>{post.engagement.shares}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
