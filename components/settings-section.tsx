"use client"

import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Check,
  ChevronRight,
  Camera,
  Building2,
  Users,
  Clock,
  CreditCard,
  HelpCircle,
  LogOut,
  Trash2,
  Download,
  Upload,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const settingsTabs = [
  { id: "profile", label: "Profil", icon: User },
  { id: "notifications", label: "Bildirishnomalar", icon: Bell },
  { id: "security", label: "Xavfsizlik", icon: Shield },
  { id: "appearance", label: "Ko'rinish", icon: Palette },
  { id: "language", label: "Til", icon: Globe },
  { id: "company", label: "Kompaniya", icon: Building2 },
  { id: "team", label: "Jamoa", icon: Users },
  { id: "billing", label: "To'lov", icon: CreditCard },
  { id: "data", label: "Ma'lumotlar", icon: Database },
  { id: "help", label: "Yordam", icon: HelpCircle },
]

const languages = [
  { code: "uz", name: "O'zbek tili", flag: "🇺🇿" },
  { code: "ru", name: "Rus tili", flag: "🇷🇺" },
  { code: "en", name: "Ingliz tili", flag: "🇬🇧" },
]

const themes = [
  { id: "light", name: "Yorug'", icon: Sun },
  { id: "dark", name: "Qorong'u", icon: Moon },
  { id: "system", name: "Tizim", icon: Monitor },
]

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState("profile")
  const [selectedLanguage, setSelectedLanguage] = useState("uz")
  const [selectedTheme, setSelectedTheme] = useState("dark")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true,
    newEmployee: true,
    taskAssigned: true,
    shiftReminder: true,
    reports: false,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Sozlamalar</h1>
          <p className="mt-1 text-muted-foreground">Tizim sozlamalarini boshqaring</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar Navigation */}
        <div className="space-y-2 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm h-fit">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
              <ChevronRight
                className={cn("ml-auto h-4 w-4 transition-transform", activeTab === tab.id && "rotate-90")}
              />
            </button>
          ))}

          <div className="my-4 border-t border-border/50" />

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all">
            <LogOut className="h-5 w-5" />
            Chiqish
          </button>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Shaxsiy ma'lumotlar</h3>

                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-xl shadow-primary/25">
                      <span className="text-2xl font-bold text-primary-foreground">AK</span>
                    </div>
                    <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="profile-name" className="text-sm font-medium text-foreground">Ism</label>
                        <input
                          id="profile-name"
                          type="text"
                          defaultValue="Alisher"
                          className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="profile-lastname" className="text-sm font-medium text-foreground">Familiya</label>
                        <input
                          id="profile-lastname"
                          type="text"
                          defaultValue="Karimov"
                          className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="profile-email" className="text-sm font-medium text-foreground">Email</label>
                      <input
                        id="profile-email"
                        type="email"
                        defaultValue="alisher.karimov@company.uz"
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="profile-phone" className="text-sm font-medium text-foreground">Telefon</label>
                      <input
                        id="profile-phone"
                        type="tel"
                        defaultValue="+998 90 123 45 67"
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="profile-position" className="text-sm font-medium text-foreground">Lavozim</label>
                      <input
                        id="profile-position"
                        type="text"
                        defaultValue="HR Menejeri"
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" className="rounded-xl bg-transparent">
                    Bekor qilish
                  </Button>
                  <Button className="rounded-xl bg-primary hover:bg-primary/90">Saqlash</Button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Bildirishnoma kanallari</h3>

                <div className="space-y-4">
                  {[
                    {
                      id: "email",
                      label: "Email orqali",
                      desc: "Muhim xabarlarni emailingizga yuboramiz",
                      icon: Mail,
                      key: "email" as const,
                    },
                    {
                      id: "push",
                      label: "Push bildirishnomalar",
                      desc: "Brauzer orqali real-time xabarlar",
                      icon: Bell,
                      key: "push" as const,
                    },
                    {
                      id: "sms",
                      label: "SMS xabarlar",
                      desc: "Juda muhim xabarlar uchun SMS",
                      icon: Smartphone,
                      key: "sms" as const,
                    },
                    {
                      id: "desktop",
                      label: "Desktop xabarlari",
                      desc: "Ish stolidagi bildirishnomalar",
                      icon: Monitor,
                      key: "desktop" as const,
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl bg-background/50 p-4 border border-border/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={cn(
                          "relative h-6 w-11 rounded-full transition-colors",
                          notifications[item.key] ? "bg-primary" : "bg-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                            notifications[item.key] ? "left-[22px]" : "left-0.5",
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Bildirishnoma turlari</h3>

                <div className="space-y-4">
                  {[
                    { id: "newEmployee", label: "Yangi xodim qo'shilganda", key: "newEmployee" as const },
                    { id: "taskAssigned", label: "Vazifa tayinlanganda", key: "taskAssigned" as const },
                    { id: "shiftReminder", label: "Smena eslatmalari", key: "shiftReminder" as const },
                    { id: "reports", label: "Haftalik hisobotlar", key: "reports" as const },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl bg-background/50 p-4 border border-border/30"
                    >
                      <p className="font-medium text-foreground">{item.label}</p>
                      <button
                        onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={cn(
                          "relative h-6 w-11 rounded-full transition-colors",
                          notifications[item.key] ? "bg-primary" : "bg-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                            notifications[item.key] ? "left-[22px]" : "left-0.5",
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Parolni o'zgartirish</h3>

                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium text-foreground">Joriy parol</label>
                    <input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium text-foreground">Yangi parol</label>
                    <input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">Parolni tasdiqlash</label>
                    <input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button className="rounded-xl bg-primary hover:bg-primary/90">Parolni yangilash</Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Ikki bosqichli autentifikatsiya</h3>

                <div className="flex items-center justify-between rounded-xl bg-background/50 p-4 border border-border/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-2/10 text-chart-2">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">2FA yoqilgan</p>
                      <p className="text-sm text-muted-foreground">Hisobingiz qo'shimcha himoyalangan</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-chart-2 text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                      Sozlash
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Aktiv seanslar</h3>

                <div className="space-y-3">
                  {[
                    { device: "MacBook Pro", location: "Toshkent, UZ", time: "Hozir faol", current: true },
                    { device: "iPhone 14", location: "Toshkent, UZ", time: "2 soat oldin", current: false },
                    { device: "Windows PC", location: "Samarqand, UZ", time: "1 kun oldin", current: false },
                  ].map((session, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-background/50 p-4 border border-border/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <Monitor className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{session.device}</p>
                            {session.current && (
                              <span className="rounded-full bg-chart-2/20 px-2 py-0.5 text-[10px] font-semibold text-chart-2">
                                Joriy
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {session.location} • {session.time}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          Chiqarish
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Mavzu tanlash</h3>

                <div className="grid gap-4 md:grid-cols-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={cn(
                        "relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all",
                        selectedTheme === theme.id
                          ? "border-primary bg-primary/5"
                          : "border-border/50 bg-background/50 hover:border-primary/50",
                      )}
                    >
                      {selectedTheme === theme.id && (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <div
                        className={cn(
                          "flex h-14 w-14 items-center justify-center rounded-xl",
                          theme.id === "dark"
                            ? "bg-gray-800 text-white"
                            : theme.id === "light"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-gradient-to-br from-gray-100 to-gray-800 text-gray-500",
                        )}
                      >
                        <theme.icon className="h-7 w-7" />
                      </div>
                      <span className="font-medium text-foreground">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Asosiy rang</h3>

                <div className="flex flex-wrap gap-3">
                  {[
                    { color: "bg-blue-500", name: "Ko'k" },
                    { color: "bg-violet-500", name: "Binafsha" },
                    { color: "bg-pink-500", name: "Pushti" },
                    { color: "bg-red-500", name: "Qizil" },
                    { color: "bg-orange-500", name: "To'q sariq" },
                    { color: "bg-green-500", name: "Yashil" },
                    { color: "bg-teal-500", name: "Zangori" },
                    { color: "bg-cyan-500", name: "Moviy" },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className={cn(
                        "group relative h-12 w-12 rounded-xl transition-transform hover:scale-110",
                        item.color,
                        i === 0 && "ring-2 ring-offset-2 ring-offset-background ring-primary",
                      )}
                    >
                      {i === 0 && (
                        <span className="absolute inset-0 flex items-center justify-center text-white">
                          <Check className="h-5 w-5" />
                        </span>
                      )}
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Language Settings */}
          {activeTab === "language" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Tizim tili</h3>

                <div className="space-y-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all",
                        selectedLanguage === lang.code
                          ? "border-primary bg-primary/5"
                          : "border-border/50 bg-background/50 hover:border-primary/50",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-medium text-foreground">{lang.name}</span>
                      </div>
                      {selectedLanguage === lang.code && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Mintaqa sozlamalari</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="settings-timezone" className="text-sm font-medium text-foreground">Vaqt mintaqasi</label>
                    <select id="settings-timezone" className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Toshkent (UTC+5)</option>
                      <option>Moskva (UTC+3)</option>
                      <option>London (UTC+0)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="settings-dateformat" className="text-sm font-medium text-foreground">Sana formati</label>
                    <select id="settings-dateformat" className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Company Settings */}
          {activeTab === "company" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Kompaniya ma'lumotlari</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-xl">
                      <Building2 className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <Button variant="outline" className="rounded-xl bg-transparent">
                      Logotipni o'zgartirish
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="company-name" className="text-sm font-medium text-foreground">Kompaniya nomi</label>
                      <input
                        id="company-name"
                        type="text"
                        defaultValue="IshOqimi LLC"
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company-sector" className="text-sm font-medium text-foreground">Soha</label>
                      <select id="company-sector" className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Texnologiya</option>
                        <option>Moliya</option>
                        <option>Sog'liqni saqlash</option>
                        <option>Ta'lim</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company-address" className="text-sm font-medium text-foreground">Manzil</label>
                      <input
                        id="company-address"
                        type="text"
                        defaultValue="Toshkent sh., Amir Temur ko'chasi, 100"
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company-phone" className="text-sm font-medium text-foreground">Telefon</label>
                      <input
                        id="company-phone"
                        type="tel"
                        defaultValue="+998 71 200 00 00"
                        className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Ish vaqti</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between rounded-xl bg-background/50 p-4 border border-border/30">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground">Ish boshlanishi</span>
                    </div>
                    <span className="font-semibold text-primary">09:00</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-background/50 p-4 border border-border/30">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground">Ish tugashi</span>
                    </div>
                    <span className="font-semibold text-primary">18:00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Settings */}
          {activeTab === "data" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Ma'lumotlarni eksport qilish</h3>

                <div className="space-y-4">
                  {[
                    { label: "Xodimlar ro'yxati", format: "CSV, Excel" },
                    { label: "Davomat hisoboti", format: "PDF, Excel" },
                    { label: "Ish haqi hisoboti", format: "PDF, Excel" },
                    { label: "Barcha ma'lumotlar", format: "JSON, ZIP" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-background/50 p-4 border border-border/30"
                    >
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.format}</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-lg gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Yuklab olish
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Ma'lumotlarni import qilish</h3>

                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-background/30 p-8">
                  <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="font-medium text-foreground">Faylni bu yerga tashlang</p>
                  <p className="text-sm text-muted-foreground mt-1">yoki</p>
                  <Button variant="outline" className="mt-4 rounded-xl bg-transparent">
                    Faylni tanlash
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-destructive/50 bg-destructive/5 p-6">
                <h3 className="text-lg font-semibold text-destructive mb-2">Xavfli zona</h3>
                <p className="text-sm text-muted-foreground mb-4">Bu amallarni qaytarib bo'lmaydi</p>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="rounded-xl border-destructive/50 text-destructive hover:bg-destructive/10 gap-2 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                    Barcha ma'lumotlarni o'chirish
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Team, Billing, Help - simplified placeholders */}
          {activeTab === "team" && (
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground mb-6">Jamoa a'zolari</h3>
              <p className="text-muted-foreground">Jamoa boshqaruvi tez orada qo'shiladi</p>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground mb-6">To'lov ma'lumotlari</h3>
              <div className="flex items-center gap-4 rounded-xl bg-primary/10 p-4 border border-primary/20">
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Pro rejasi</p>
                  <p className="text-sm text-muted-foreground">Keyingi to'lov: 2025-yil 1-yanvar</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "help" && (
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground mb-6">Yordam markazi</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { title: "Foydalanish qo'llanmasi", desc: "Boshlang'ich qo'llanma" },
                  { title: "Ko'p so'raladigan savollar", desc: "Tez-tez beriladigan savollar" },
                  { title: "Texnik yordam", desc: "Mutaxassislar bilan bog'laning" },
                  { title: "Video darsliklar", desc: "Qadamba-qadam o'rganish" },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-4 rounded-xl bg-background/50 p-4 border border-border/30 hover:border-primary/50 transition-colors text-left"
                  >
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
