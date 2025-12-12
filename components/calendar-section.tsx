"use client"

import { ChevronLeft, ChevronRight, Plus, CalendarIcon, Clock, MapPin, Users, X, Bell, Repeat, Tag } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Event {
  id: number
  title: string
  date: string
  startTime: string
  endTime: string
  type: "meeting" | "task" | "reminder" | "holiday" | "birthday"
  location?: string
  attendees?: string[]
  description?: string
  color: string
  isAllDay?: boolean
}

const events: Event[] = [
  {
    id: 1,
    title: "Haftalik rejalashtirish",
    date: "2024-12-09",
    startTime: "09:00",
    endTime: "10:00",
    type: "meeting",
    location: "Yig'ilishlar xonasi",
    attendees: ["Dilshod R.", "Laylo K.", "Sardor A."],
    color: "bg-blue-500",
    description: "Yangi hafta rejalari",
  },
  {
    id: 2,
    title: "Mijoz bilan uchrashuv",
    date: "2024-12-09",
    startTime: "14:00",
    endTime: "15:30",
    type: "meeting",
    location: "Zoom",
    attendees: ["Navoiy Media Group"],
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Loyiha topshirish muddati",
    date: "2024-12-10",
    startTime: "18:00",
    endTime: "18:00",
    type: "task",
    color: "bg-red-500",
  },
  {
    id: 4,
    title: "Marketing taqdimoti",
    date: "2024-12-11",
    startTime: "11:00",
    endTime: "12:00",
    type: "meeting",
    location: "3-xona",
    attendees: ["Marketing jamoasi"],
    color: "bg-purple-500",
  },
  {
    id: 5,
    title: "Sardor tug'ilgan kuni",
    date: "2024-12-12",
    startTime: "00:00",
    endTime: "23:59",
    type: "birthday",
    color: "bg-pink-500",
    isAllDay: true,
  },
  {
    id: 6,
    title: "Server texnik xizmat",
    date: "2024-12-13",
    startTime: "22:00",
    endTime: "02:00",
    type: "reminder",
    color: "bg-amber-500",
  },
  {
    id: 7,
    title: "Yangi yil tayyorgarlik",
    date: "2024-12-15",
    startTime: "10:00",
    endTime: "16:00",
    type: "task",
    color: "bg-teal-500",
  },
  {
    id: 8,
    title: "Mustaqillik kuni",
    date: "2024-12-08",
    startTime: "00:00",
    endTime: "23:59",
    type: "holiday",
    color: "bg-emerald-500",
    isAllDay: true,
  },
]

const weekDays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"]
const months = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
]

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 9))
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 11, 9))
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "meeting",
    location: "",
    description: "",
  })

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1

    const days: (number | null)[] = []
    for (let i = 0; i < startingDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }

  const getEventsForDate = (day: number | null) => {
    if (!day) return []
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter((e) => e.date === dateStr)
  }

  const selectedDateEvents = selectedDate
    ? events.filter(
      (e) =>
        e.date ===
        `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`,
    )
    : []

  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date("2024-12-09"))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const eventTypeLabels: Record<string, string> = {
    meeting: "Uchrashuv",
    task: "Vazifa",
    reminder: "Eslatma",
    holiday: "Bayram",
    birthday: "Tug'ilgan kun",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Kalendar</h1>
          <p className="mt-1 text-muted-foreground">Voqealar va uchrashuvlarni rejalashtiring</p>
        </div>
        <Button
          onClick={() => setShowAddEvent(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25"
        >
          <Plus className="h-4 w-4" />
          Yangi voqea
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Bugungi voqealar", value: "2", icon: CalendarIcon, color: "from-blue-500 to-blue-600" },
          { label: "Bu haftada", value: "8", icon: Clock, color: "from-green-500 to-green-600" },
          { label: "Uchrashuvlar", value: "12", icon: Users, color: "from-purple-500 to-purple-600" },
          { label: "Vazifalar", value: "5", icon: Tag, color: "from-amber-500 to-amber-600" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
          {/* Calendar Header */}
          <div className="p-4 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold text-foreground">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {["month", "week", "day"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as typeof viewMode)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
                    viewMode === mode
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted",
                  )}
                >
                  {mode === "month" ? "Oy" : mode === "week" ? "Hafta" : "Kun"}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((day, idx) => {
                const dayEvents = getEventsForDate(day)
                const isToday = day === 9 && currentDate.getMonth() === 11 && currentDate.getFullYear() === 2024
                const isSelected =
                  selectedDate && day === selectedDate.getDate() && currentDate.getMonth() === selectedDate.getMonth()

                return (
                  <button
                    key={idx}
                    onClick={() =>
                      day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                    }
                    disabled={!day}
                    className={cn(
                      "relative h-24 p-1 rounded-xl border transition-all text-left",
                      day ? "hover:bg-muted/50 cursor-pointer" : "cursor-default",
                      isToday && "border-primary bg-primary/5",
                      isSelected && !isToday && "border-primary/50 bg-primary/10",
                      !isToday && !isSelected && "border-transparent",
                    )}
                  >
                    {day && (
                      <>
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                            isToday && "bg-primary text-primary-foreground",
                          )}
                        >
                          {day}
                        </span>
                        <div className="mt-1 space-y-0.5 overflow-hidden">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={cn("text-[10px] px-1.5 py-0.5 rounded truncate text-white", event.color)}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-[10px] text-muted-foreground px-1">+{dayEvents.length - 2} ta</div>
                          )}
                        </div>
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-4">
            <h3 className="font-semibold text-foreground mb-4">
              {selectedDate ? `${selectedDate.getDate()} ${months[selectedDate.getMonth()]}` : "Sana tanlang"}
            </h3>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-xl bg-muted/50 border border-border/30">
                    <div className="flex items-start gap-3">
                      <div className={cn("w-1 h-12 rounded-full", event.color)} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{event.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{event.isAllDay ? "Kun bo'yi" : `${event.startTime} - ${event.endTime}`}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.attendees && (
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{event.attendees.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Bu kunda voqealar yo'q</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-4">
            <h3 className="font-semibold text-foreground mb-4">Kelgusi voqealar</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl text-white text-xs font-bold",
                      event.color,
                    )}
                  >
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">{eventTypeLabels[event.type]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border/50 bg-card shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h2 className="text-lg font-semibold">Yangi voqea qo'shish</h2>
              <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setShowAddEvent(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="event-title" className="text-sm font-medium text-foreground">Voqea nomi</label>
                <Input
                  id="event-title"
                  placeholder="Masalan: Mijoz bilan uchrashuv"
                  className="mt-1.5"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="event-date" className="text-sm font-medium text-foreground">Sana</label>
                  <Input
                    id="event-date"
                    type="date"
                    className="mt-1.5"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="event-type" className="text-sm font-medium text-foreground">Turi</label>
                  <select
                    id="event-type"
                    className="mt-1.5 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  >
                    <option value="meeting">Uchrashuv</option>
                    <option value="task">Vazifa</option>
                    <option value="reminder">Eslatma</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start-time" className="text-sm font-medium text-foreground">Boshlanish</label>
                  <Input
                    id="start-time"
                    type="time"
                    className="mt-1.5"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="end-time" className="text-sm font-medium text-foreground">Tugash</label>
                  <Input
                    id="end-time"
                    type="time"
                    className="mt-1.5"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="event-location" className="text-sm font-medium text-foreground">Joylashuv</label>
                <Input
                  id="event-location"
                  placeholder="Masalan: Zoom, 3-xona"
                  className="mt-1.5"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="event-desc" className="text-sm font-medium text-foreground">Tavsif</label>
                <textarea
                  id="event-desc"
                  placeholder="Qo'shimcha ma'lumot..."
                  className="mt-1.5 w-full h-20 rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Eslatma
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Repeat className="h-4 w-4" />
                  Takrorlash
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Users className="h-4 w-4" />
                  Ishtirokchilar
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-border/50">
              <Button variant="outline" onClick={() => setShowAddEvent(false)}>
                Bekor qilish
              </Button>
              <Button className="bg-gradient-to-r from-primary to-primary/80">Saqlash</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
