"use client"

import { UserPlus, Clock, CheckCircle, AlertCircle, Calendar, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

const activities = [
  {
    id: 1,
    icon: UserPlus,
    gradient: "from-primary to-primary/70",
    title: "Yangi xodim qo'shildi",
    description: "Murod Toshmatov Dasturchilar jamoasiga qo'shildi",
    time: "2 daqiqa oldin",
    isNew: true,
  },
  {
    id: 2,
    icon: Clock,
    gradient: "from-chart-3 to-amber-400",
    title: "Kech kelish qayd etildi",
    description: "Nodira Azimova 15 daqiqa kech keldi",
    time: "15 daqiqa oldin",
    isNew: true,
  },
  {
    id: 3,
    icon: CheckCircle,
    gradient: "from-chart-2 to-emerald-400",
    title: "Vazifa bajarildi",
    description: "4-chorak moliyaviy hisoboti topshirildi",
    time: "1 soat oldin",
    isNew: false,
  },
  {
    id: 4,
    icon: Calendar,
    gradient: "from-chart-4 to-pink-400",
    title: "Smena almashtirildi",
    description: "Jasur va Bobur juma smenalarini almashtirishdi",
    time: "2 soat oldin",
    isNew: false,
  },
  {
    id: 5,
    icon: AlertCircle,
    gradient: "from-destructive to-red-400",
    title: "Ta'til so'rovi kutilmoqda",
    description: "Sarvarning 20-22 dekabr uchun so'rovi tasdiqlanishi kerak",
    time: "3 soat oldin",
    isNew: false,
  },
]

export function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Faoliyat lentasi</h2>
          <p className="mt-1 text-sm text-muted-foreground">So'nggi yangilanishlar va hodisalar</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-secondary">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="mt-6 space-y-1">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="group relative flex items-start gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-secondary/50"
          >
            {/* Timeline connector */}
            {index < activities.length - 1 && (
              <div className="absolute left-[26px] top-14 h-[calc(100%-20px)] w-px bg-border/50" />
            )}

            {/* Icon */}
            <div
              className={`relative z-10 rounded-xl bg-gradient-to-br ${activity.gradient} p-2.5 shadow-lg transition-transform duration-200 group-hover:scale-105`}
            >
              <activity.icon className="h-4 w-4 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-card-foreground">{activity.title}</p>
                {activity.isNew && (
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    Yangi
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{activity.description}</p>
            </div>

            {/* Time */}
            <span className="text-[10px] text-muted-foreground whitespace-nowrap pt-1">{activity.time}</span>
          </div>
        ))}
      </div>

      {/* View all button */}
      <Button variant="ghost" className="mt-4 w-full rounded-xl text-primary hover:text-primary hover:bg-primary/10">
        Barcha faoliyatlarni ko'rish
      </Button>
    </div>
  )
}
