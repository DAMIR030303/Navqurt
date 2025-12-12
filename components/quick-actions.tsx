"use client"

import {
  UserPlus,
  CalendarPlus,
  FileText,
  Send,
  ClipboardList,
  Download,
  ArrowRight,
  X,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Briefcase,
  Mail,
  Bell,
  FileSpreadsheet,
  FileBarChart,
  Table,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

const actions = [
  {
    id: "add-employee",
    icon: UserPlus,
    label: "Xodim qo'shish",
    description: "Yangi xodim ro'yxatga olish",
    gradient: "from-primary to-primary/70",
  },
  {
    id: "create-shift",
    icon: CalendarPlus,
    label: "Smena yaratish",
    description: "Ish jadvalini tuzish",
    gradient: "from-chart-2 to-emerald-400",
  },
  {
    id: "assign-task",
    icon: ClipboardList,
    label: "Vazifa berish",
    description: "Yangi vazifa tayinlash",
    gradient: "from-chart-5 to-cyan-400",
  },
  {
    id: "create-report",
    icon: FileText,
    label: "Hisobot yaratish",
    description: "Tahlil hisoboti",
    gradient: "from-chart-4 to-pink-400",
  },
  {
    id: "send-announcement",
    icon: Send,
    label: "E'lon yuborish",
    description: "Xabar tarqatish",
    gradient: "from-chart-3 to-amber-400",
  },
  {
    id: "download-data",
    icon: Download,
    label: "Ma'lumotlarni yuklab olish",
    description: "Excel formatida",
    gradient: "from-muted-foreground to-muted-foreground/70",
  },
]

// Xodim qo'shish modali
function AddEmployeeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
      }, 1500)
    }, 1000)
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="animate-in zoom-in-95 fade-in duration-300 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-2/20">
            <CheckCircle2 className="h-8 w-8 text-chart-2" />
          </div>
          <h3 className="text-xl font-semibold">Xodim muvaffaqiyatli qo'shildi!</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="animate-in zoom-in-95 fade-in duration-300 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-primary to-primary/70 p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Yangi xodim qo'shish</h2>
                <p className="text-sm text-white/80">Qadam {step}/2</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30">
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
          {/* Progress */}
          <div className="relative mt-4 flex gap-2">
            <div className="h-1 flex-1 rounded-full bg-white/30">
              <div className="h-full rounded-full bg-white transition-all" style={{ width: "100%" }} />
            </div>
            <div className="h-1 flex-1 rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: step >= 2 ? "100%" : "0%" }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Shaxsiy ma'lumotlar</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="employee-firstname" className="text-sm text-muted-foreground">Ism *</label>
                  <input
                    id="employee-firstname"
                    type="text"
                    placeholder="Ism kiriting"
                    className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="employee-lastname" className="text-sm text-muted-foreground">Familiya *</label>
                  <input
                    id="employee-lastname"
                    type="text"
                    placeholder="Familiya kiriting"
                    className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="employee-email" className="text-sm text-muted-foreground">Email *</label>
                <input
                  id="employee-email"
                  type="email"
                  placeholder="email@example.com"
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="employee-phone" className="text-sm text-muted-foreground">Telefon *</label>
                <input
                  id="employee-phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Ish ma'lumotlari</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="employee-department" className="text-sm text-muted-foreground">Bo'lim *</label>
                  <select id="employee-department" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">Tanlang</option>
                    <option value="it">IT bo'limi</option>
                    <option value="hr">Kadrlar</option>
                    <option value="sales">Savdo</option>
                    <option value="marketing">Marketing</option>
                    <option value="finance">Moliya</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="employee-position" className="text-sm text-muted-foreground">Lavozim *</label>
                  <input
                    id="employee-position"
                    type="text"
                    placeholder="Lavozim kiriting"
                    className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="employee-date" className="text-sm text-muted-foreground">Ishga kirish sanasi *</label>
                  <input
                    id="employee-date"
                    type="date"
                    className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="employee-salary" className="text-sm text-muted-foreground">Maosh (so'm)</label>
                  <input
                    id="employee-salary"
                    type="number"
                    placeholder="5,000,000"
                    className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border p-4">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              Orqaga
            </Button>
          ) : (
            <Button variant="ghost" onClick={onClose}>
              Bekor qilish
            </Button>
          )}
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)} className="bg-gradient-to-r from-primary to-primary/80">
              Keyingi
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Smena yaratish modali
function CreateShiftModal({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const shiftTypes = [
    { id: "morning", label: "Ertalabki", time: "08:00 - 16:00", color: "from-amber-500 to-orange-500" },
    { id: "day", label: "Kunduzi", time: "09:00 - 18:00", color: "from-primary to-blue-400" },
    { id: "evening", label: "Kechki", time: "16:00 - 00:00", color: "from-purple-500 to-pink-500" },
    { id: "night", label: "Tungi", time: "00:00 - 08:00", color: "from-slate-600 to-slate-800" },
  ]

  const [selectedType, setSelectedType] = useState("day")

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => onClose(), 1500)
    }, 1000)
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="animate-in zoom-in-95 fade-in duration-300 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-2/20">
            <CheckCircle2 className="h-8 w-8 text-chart-2" />
          </div>
          <h3 className="text-xl font-semibold">Smena muvaffaqiyatli yaratildi!</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="animate-in zoom-in-95 fade-in duration-300 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-chart-2 to-emerald-400 p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                <CalendarPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Yangi smena yaratish</h2>
                <p className="text-sm text-white/80">Ish jadvalini tuzish</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30">
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Smena turi */}
          <div>
            <p className="text-sm font-medium text-foreground">Smena turi</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {shiftTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`relative overflow-hidden rounded-xl border p-3 text-left transition-all ${selectedType === type.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                      : "border-border bg-secondary/30 hover:bg-secondary/50"
                    }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${type.color} opacity-10`} />
                  <div className="relative">
                    <p className="font-medium text-foreground">{type.label}</p>
                    <p className="text-xs text-muted-foreground">{type.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sana va xodimlar */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="shift-date" className="text-sm text-muted-foreground">Sana *</label>
              <input
                id="shift-date"
                type="date"
                className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label htmlFor="shift-repeat" className="text-sm text-muted-foreground">Takrorlanish</label>
              <select id="shift-repeat" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="once">Bir martalik</option>
                <option value="daily">Har kuni</option>
                <option value="weekly">Har hafta</option>
                <option value="monthly">Har oy</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="shift-employees" className="text-sm text-muted-foreground">Xodimlarni tanlang *</label>
            <select id="shift-employees" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Bo'lim tanlang</option>
              <option value="it">IT bo'limi (12 xodim)</option>
              <option value="hr">Kadrlar (8 xodim)</option>
              <option value="sales">Savdo (15 xodim)</option>
              <option value="marketing">Marketing (10 xodim)</option>
            </select>
          </div>

          <div>
            <label htmlFor="shift-location" className="text-sm text-muted-foreground">Joylashuv</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2.5">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <input
                id="shift-location"
                type="text"
                placeholder="Ofis, filial..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border p-4">
          <Button variant="ghost" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-chart-2 to-emerald-400"
          >
            {isSubmitting ? "Yaratilmoqda..." : "Yaratish"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Vazifa berish modali
function AssignTaskModal({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [priority, setPriority] = useState("medium")

  const priorities = [
    { id: "low", label: "Past", color: "bg-slate-500" },
    { id: "medium", label: "O'rta", color: "bg-amber-500" },
    { id: "high", label: "Yuqori", color: "bg-orange-500" },
    { id: "urgent", label: "Shoshilinch", color: "bg-red-500" },
  ]

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => onClose(), 1500)
    }, 1000)
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="animate-in zoom-in-95 fade-in duration-300 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-2/20">
            <CheckCircle2 className="h-8 w-8 text-chart-2" />
          </div>
          <h3 className="text-xl font-semibold">Vazifa muvaffaqiyatli tayinlandi!</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="animate-in zoom-in-95 fade-in duration-300 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-chart-5 to-cyan-400 p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Vazifa tayinlash</h2>
                <p className="text-sm text-white/80">Yangi vazifa yaratish</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30">
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <label htmlFor="task-title" className="text-sm text-muted-foreground">Vazifa nomi *</label>
            <input
              id="task-title"
              type="text"
              placeholder="Vazifa nomini kiriting"
              className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="task-description" className="text-sm text-muted-foreground">Tavsif</label>
            <textarea
              id="task-description"
              rows={3}
              placeholder="Vazifa haqida batafsil ma'lumot..."
              className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Muhimlik darajasi</p>
            <div className="mt-2 flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-all ${priority === p.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-secondary/30 hover:bg-secondary/50"
                    }`}
                >
                  <div className={`h-2 w-2 rounded-full ${p.color}`} />
                  <span className="text-sm">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="task-assignee" className="text-sm text-muted-foreground">Mas'ul xodim *</label>
              <select id="task-assignee" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">Tanlang</option>
                <option value="1">Alisher Karimov</option>
                <option value="2">Nodira Saidova</option>
                <option value="3">Jasur Toshmatov</option>
                <option value="4">Dilnoza Rahimova</option>
              </select>
            </div>
            <div>
              <label htmlFor="task-deadline" className="text-sm text-muted-foreground">Muddat *</label>
              <input
                id="task-deadline"
                type="date"
                className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="task-category" className="text-sm text-muted-foreground">Kategoriya</label>
            <select id="task-category" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Tanlang</option>
              <option value="development">Dasturlash</option>
              <option value="design">Dizayn</option>
              <option value="marketing">Marketing</option>
              <option value="hr">Kadrlar ishi</option>
              <option value="finance">Moliya</option>
              <option value="other">Boshqa</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border p-4">
          <Button variant="ghost" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-gradient-to-r from-chart-5 to-cyan-400">
            {isSubmitting ? "Tayinlanmoqda..." : "Tayinlash"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Hisobot yaratish modali
function CreateReportModal({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedType, setSelectedType] = useState("")

  const reportTypes = [
    { id: "attendance", label: "Davomat hisoboti", icon: Calendar, description: "Xodimlar davomati tahlili" },
    { id: "salary", label: "Ish haqi hisoboti", icon: Briefcase, description: "Maosh hisob-kitob" },
    { id: "performance", label: "Samaradorlik", icon: FileBarChart, description: "Ish samaradorligi tahlili" },
    { id: "tasks", label: "Vazifalar", icon: ClipboardList, description: "Vazifalar holati" },
  ]

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => onClose(), 1500)
    }, 1000)
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="animate-in zoom-in-95 fade-in duration-300 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-2/20">
            <CheckCircle2 className="h-8 w-8 text-chart-2" />
          </div>
          <h3 className="text-xl font-semibold">Hisobot muvaffaqiyatli yaratildi!</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="animate-in zoom-in-95 fade-in duration-300 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-chart-4 to-pink-400 p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Hisobot yaratish</h2>
                <p className="text-sm text-white/80">Tahlil hisoboti tuzish</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30">
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <p className="text-sm font-medium text-foreground">Hisobot turi</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${selectedType === type.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                      : "border-border bg-secondary/30 hover:bg-secondary/50"
                    }`}
                >
                  <div className="rounded-lg bg-chart-4/20 p-2">
                    <type.icon className="h-4 w-4 text-chart-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{type.label}</p>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="report-start" className="text-sm text-muted-foreground">Boshlanish sanasi *</label>
              <input
                id="report-start"
                type="date"
                className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label htmlFor="report-end" className="text-sm text-muted-foreground">Tugash sanasi *</label>
              <input
                id="report-end"
                type="date"
                className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="report-department" className="text-sm text-muted-foreground">Bo'lim</label>
            <select id="report-department" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Barcha bo'limlar</option>
              <option value="it">IT bo'limi</option>
              <option value="hr">Kadrlar</option>
              <option value="sales">Savdo</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Format</p>
            <div className="mt-2 flex gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2">
                <FileSpreadsheet className="h-4 w-4 text-chart-2" />
                <span className="text-sm">Excel</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2 hover:bg-secondary/50">
                <FileText className="h-4 w-4 text-red-500" />
                <span className="text-sm">PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border p-4">
          <Button variant="ghost" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedType}
            className="bg-gradient-to-r from-chart-4 to-pink-400"
          >
            {isSubmitting ? "Yaratilmoqda..." : "Yaratish"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// E'lon yuborish modali
function SendAnnouncementModal({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [channels, setChannels] = useState({ email: true, push: true, sms: false })

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => onClose(), 1500)
    }, 1000)
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="animate-in zoom-in-95 fade-in duration-300 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-2/20">
            <CheckCircle2 className="h-8 w-8 text-chart-2" />
          </div>
          <h3 className="text-xl font-semibold">E'lon muvaffaqiyatli yuborildi!</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="animate-in zoom-in-95 fade-in duration-300 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-chart-3 to-amber-400 p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                <Send className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">E'lon yuborish</h2>
                <p className="text-sm text-white/80">Xabar tarqatish</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30">
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <label htmlFor="announcement-title" className="text-sm text-muted-foreground">E'lon sarlavhasi *</label>
            <input
              id="announcement-title"
              type="text"
              placeholder="Sarlavha kiriting"
              className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="announcement-text" className="text-sm text-muted-foreground">Xabar matni *</label>
            <textarea
              id="announcement-text"
              rows={4}
              placeholder="E'lon matnini kiriting..."
              className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div>
            <label htmlFor="announcement-recipients" className="text-sm text-muted-foreground">Qabul qiluvchilar</label>
            <select id="announcement-recipients" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="all">Barcha xodimlar</option>
              <option value="it">IT bo'limi</option>
              <option value="hr">Kadrlar</option>
              <option value="sales">Savdo</option>
              <option value="marketing">Marketing</option>
              <option value="managers">Faqat menejerlar</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Yuborish kanallari</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setChannels({ ...channels, email: !channels.email })}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-all ${channels.email ? "border-primary bg-primary/10" : "border-border bg-secondary/30"
                  }`}
              >
                <Mail className={`h-4 w-4 ${channels.email ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm">Email</span>
              </button>
              <button
                onClick={() => setChannels({ ...channels, push: !channels.push })}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-all ${channels.push ? "border-primary bg-primary/10" : "border-border bg-secondary/30"
                  }`}
              >
                <Bell className={`h-4 w-4 ${channels.push ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm">Push</span>
              </button>
              <button
                onClick={() => setChannels({ ...channels, sms: !channels.sms })}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-all ${channels.sms ? "border-primary bg-primary/10" : "border-border bg-secondary/30"
                  }`}
              >
                <Send className={`h-4 w-4 ${channels.sms ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm">SMS</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <p className="text-sm text-amber-200">E'lon barcha tanlangan xodimlarga yuboriladi</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border p-4">
          <Button variant="ghost" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-gradient-to-r from-chart-3 to-amber-400">
            {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Ma'lumotlarni yuklab olish modali
function DownloadDataModal({ onClose }: { onClose: () => void }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedData, setSelectedData] = useState<string[]>(["employees"])

  const dataTypes = [
    { id: "employees", label: "Xodimlar", icon: Users, count: "156 ta" },
    { id: "attendance", label: "Davomat", icon: Calendar, count: "30 kunlik" },
    { id: "tasks", label: "Vazifalar", icon: ClipboardList, count: "89 ta" },
    { id: "shifts", label: "Smenalar", icon: Clock, count: "45 ta" },
    { id: "reports", label: "Hisobotlar", icon: FileBarChart, count: "23 ta" },
  ]

  const toggleData = (id: string) => {
    if (selectedData.includes(id)) {
      setSelectedData(selectedData.filter((d) => d !== id))
    } else {
      setSelectedData([...selectedData, id])
    }
  }

  const handleDownload = () => {
    setIsDownloading(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setDownloadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setIsDownloading(false)
        setIsSuccess(true)
        setTimeout(() => onClose(), 1500)
      }
    }, 200)
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="animate-in zoom-in-95 fade-in duration-300 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-2/20">
            <CheckCircle2 className="h-8 w-8 text-chart-2" />
          </div>
          <h3 className="text-xl font-semibold">Ma'lumotlar yuklandi!</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="animate-in zoom-in-95 fade-in duration-300 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-slate-600 to-slate-800 p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                <Download className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Ma'lumotlarni yuklab olish</h2>
                <p className="text-sm text-white/80">Excel formatida eksport</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30">
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <p className="text-sm font-medium text-foreground">Ma'lumot turini tanlang</p>
            <div className="mt-3 space-y-2">
              {dataTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleData(type.id)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 transition-all ${selectedData.includes(type.id)
                      ? "border-primary bg-primary/10"
                      : "border-border bg-secondary/30 hover:bg-secondary/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg p-2 ${selectedData.includes(type.id) ? "bg-primary/20" : "bg-secondary"}`}
                    >
                      <type.icon
                        className={`h-4 w-4 ${selectedData.includes(type.id) ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <span className="font-medium text-foreground">{type.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{type.count}</span>
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedData.includes(type.id) ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}
                    >
                      {selectedData.includes(type.id) && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Format</p>
            <div className="mt-2 flex gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2">
                <Table className="h-4 w-4 text-chart-2" />
                <span className="text-sm">Excel (.xlsx)</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2 hover:bg-secondary/50">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">CSV</span>
              </button>
            </div>
          </div>

          {isDownloading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Yuklanmoqda...</span>
                <span className="text-foreground">{downloadProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border p-4">
          <span className="text-sm text-muted-foreground">{selectedData.length} ta tanlandi</span>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading || selectedData.length === 0}
              className="bg-gradient-to-r from-slate-600 to-slate-800"
            >
              {isDownloading ? "Yuklanmoqda..." : "Yuklab olish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function QuickActions() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (id: string) => setActiveModal(id)
  const closeModal = () => setActiveModal(null)

  return (
    <>
      <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Tezkor amallar</h2>
            <p className="mt-1 text-sm text-muted-foreground">Eng ko'p ishlatiladigan vazifalar</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
            Barchasi
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => openModal(action.id)}
              className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-xl border border-border/50 bg-secondary/30 p-4 text-center transition-all duration-300 hover:border-border hover:bg-secondary/50 hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Hover gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              />

              <div
                className={`relative rounded-xl bg-gradient-to-br ${action.gradient} p-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <action.icon className="h-5 w-5 text-white" />
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${action.gradient} opacity-40 blur-md`}
                />
              </div>
              <div>
                <span className="text-sm font-medium text-card-foreground">{action.label}</span>
                <p className="mt-0.5 text-[10px] text-muted-foreground hidden sm:block">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modallar */}
      {activeModal === "add-employee" && <AddEmployeeModal onClose={closeModal} />}
      {activeModal === "create-shift" && <CreateShiftModal onClose={closeModal} />}
      {activeModal === "assign-task" && <AssignTaskModal onClose={closeModal} />}
      {activeModal === "create-report" && <CreateReportModal onClose={closeModal} />}
      {activeModal === "send-announcement" && <SendAnnouncementModal onClose={closeModal} />}
      {activeModal === "download-data" && <DownloadDataModal onClose={closeModal} />}
    </>
  )
}
