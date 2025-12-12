"use client"

import {
  Building2,
  Users,
  Briefcase,
  Key,
  Settings,
  X,
  Check,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  RefreshCw,
  Copy,
  Shield,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  Send,
  Monitor,
  Lock,
  BarChart3,
  FileText,
  Pause,
  Download,
  Search,
  Star,
  Crown,
  Zap,
  HardDrive,
  Activity,
  LayoutDashboard,
  Calendar,
  FolderOpen,
  TrendingUp,
  DollarSign,
  ClipboardList,
  ArrowLeft,
  Bell,
  Sun,
  Menu,
  ChevronRight,
  Mail,
  Phone,
  Play,
  Maximize2,
  Info,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface Company {
  id: number
  name: string
  logo: string
  industry: string
  region: string
  address: string
  phone: string
  email: string
  website: string
  plan: string
  status: "active" | "trial" | "suspended" | "expired"
  createdAt: string
  expiresAt: string
  usersCount: number
  activeModules: string[]
  storageUsed: string
  lastActivity: string
  adminName: string
  adminEmail: string
  kpiSettings?: {
    metrics: { name: string; target: number; unit: string }[]
    bonusRules: { type: string; amount: number; condition: string }[]
    penaltyRules: { type: string; amount: number; condition: string }[]
  }
  salarySettings?: {
    baseSalary: number
    kpiBonus: number
    attendanceBonus: number
    overtimeRate: number
  }
}

interface CompanyManagementModalProps {
  company: Company
  onClose: () => void
  onUpdate: (company: Company) => void
}

// Namuna xodimlar
const sampleEmployees = [
  {
    id: 1,
    name: "Sardor Rahimov",
    position: "Bosh direktor",
    department: "Rahbariyat",
    email: "sardor@navoiymedia.uz",
    phone: "+998 90 123 45 67",
    status: "active",
    role: "admin",
  },
  {
    id: 2,
    name: "Nilufar Karimova",
    position: "Marketing menejeri",
    department: "Marketing",
    email: "nilufar@navoiymedia.uz",
    phone: "+998 91 234 56 78",
    status: "active",
    role: "manager",
  },
  {
    id: 3,
    name: "Javohir Alimov",
    position: "SMM mutaxassisi",
    department: "Marketing",
    email: "javohir@navoiymedia.uz",
    phone: "+998 93 345 67 89",
    status: "active",
    role: "user",
  },
  {
    id: 4,
    name: "Madina Usmanova",
    position: "Dizayner",
    department: "Kreativ",
    email: "madina@navoiymedia.uz",
    phone: "+998 94 456 78 90",
    status: "active",
    role: "user",
  },
  {
    id: 5,
    name: "Bekzod Toshev",
    position: "Video operator",
    department: "Kreativ",
    email: "bekzod@navoiymedia.uz",
    phone: "+998 95 567 89 01",
    status: "inactive",
    role: "user",
  },
  {
    id: 6,
    name: "Zarina Nazarova",
    position: "Kontent menejeri",
    department: "Kontent",
    email: "zarina@navoiymedia.uz",
    phone: "+998 97 678 90 12",
    status: "active",
    role: "user",
  },
]

// Namuna lavozimlar
const samplePositions = [
  { id: 1, name: "Bosh direktor", department: "Rahbariyat", employeeCount: 1, salary: "15,000,000" },
  { id: 2, name: "Marketing menejeri", department: "Marketing", employeeCount: 1, salary: "8,000,000" },
  { id: 3, name: "SMM mutaxassisi", department: "Marketing", employeeCount: 2, salary: "5,000,000" },
  { id: 4, name: "Dizayner", department: "Kreativ", employeeCount: 3, salary: "6,000,000" },
  { id: 5, name: "Video operator", department: "Kreativ", employeeCount: 2, salary: "5,500,000" },
  { id: 6, name: "Kontent menejeri", department: "Kontent", employeeCount: 2, salary: "4,500,000" },
  { id: 7, name: "Jurnalist", department: "Kontent", employeeCount: 4, salary: "4,000,000" },
  { id: 8, name: "Buxgalter", department: "Moliya", employeeCount: 1, salary: "6,000,000" },
]

// Namuna bo'limlar
const sampleDepartments = [
  { id: 1, name: "Rahbariyat", employeeCount: 2, head: "Sardor Rahimov", color: "from-amber-500 to-amber-600" },
  { id: 2, name: "Marketing", employeeCount: 8, head: "Nilufar Karimova", color: "from-blue-500 to-blue-600" },
  { id: 3, name: "Kreativ", employeeCount: 12, head: "Madina Usmanova", color: "from-purple-500 to-purple-600" },
  { id: 4, name: "Kontent", employeeCount: 10, head: "Zarina Nazarova", color: "from-green-500 to-green-600" },
  { id: 5, name: "Moliya", employeeCount: 3, head: "Anvar Tursunov", color: "from-red-500 to-red-600" },
  { id: 6, name: "IT", employeeCount: 5, head: "Shoxrux Qodirov", color: "from-cyan-500 to-cyan-600" },
]

function CompanyDemoPreview({ company, onClose }: { company: Company; onClose: () => void }) {
  const [demoPage, setDemoPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const demoNavItems = [
    { id: "dashboard", label: "Boshqaruv paneli", icon: LayoutDashboard },
    { id: "employees", label: "Xodimlar", icon: Users },
    { id: "projects", label: "Loyihalar", icon: FolderOpen },
    { id: "tasks", label: "Vazifalar", icon: ClipboardList },
    { id: "clients", label: "Mijozlar", icon: Building2 },
    { id: "finance", label: "Moliya", icon: DollarSign },
    { id: "calendar", label: "Kalendar", icon: Calendar },
    { id: "analytics", label: "Analitika", icon: TrendingUp },
    { id: "settings", label: "Sozlamalar", icon: Settings },
  ]

  // Faol modullarni tekshirish
  const isModuleActive = (moduleId: string) => {
    const moduleMap: Record<string, string> = {
      employees: "employees",
      projects: "projects",
      tasks: "tasks",
      clients: "clients",
      finance: "finance",
      calendar: "content",
      analytics: "analytics",
    }
    return (
      company.activeModules.includes(moduleMap[moduleId] || moduleId) ||
      moduleId === "dashboard" ||
      moduleId === "settings"
    )
  }

  return (
    <div className="fixed inset-0 z-[60] bg-background">
      {/* Super Admin banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5" />
          <span className="font-medium">Super Admin - Demo ko'rinishi</span>
          <span className="text-amber-100">|</span>
          <span className="text-amber-100">{company.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
            <Info className="h-4 w-4" />
            <span className="text-sm">Barcha o'zgarishlar test rejimida</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-44px)]">
        {/* Demo Sidebar */}
        <aside
          className={cn(
            "h-full bg-card border-r border-border/50 transition-all duration-300 flex flex-col",
            sidebarOpen ? "w-64" : "w-20",
          )}
        >
          {/* Company Logo */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white font-bold text-lg flex-shrink-0">
                {company.logo}
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <h2 className="font-bold text-foreground truncate">{company.name}</h2>
                  <p className="text-xs text-muted-foreground truncate">{company.industry}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {demoNavItems.map((item) => {
              const isActive = demoPage === item.id
              const isEnabled = isModuleActive(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() => isEnabled && setDemoPage(item.id)}
                  disabled={!isEnabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : isEnabled
                        ? "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        : "text-muted-foreground/40 cursor-not-allowed",
                    !sidebarOpen && "justify-center",
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", !isEnabled && "opacity-40")} />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                      {!isEnabled && <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />}
                    </>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Sidebar toggle */}
          <div className="p-3 border-t border-border/50">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Menu className="h-5 w-5" />
              {sidebarOpen && <span className="text-sm">Yig'ish</span>}
            </button>
          </div>
        </aside>

        {/* Demo Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Demo Header */}
          <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-xl flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-foreground">
                {demoNavItems.find((n) => n.id === demoPage)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Qidirish..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 pl-3 border-l border-border/50">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-medium">
                  {company.adminName.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">{company.adminName}</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
            </div>
          </header>

          {/* Demo Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-background via-background to-primary/5">
            {demoPage === "dashboard" && (
              <div className="space-y-6">
                {/* Welcome */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20">
                  <h2 className="text-2xl font-bold text-foreground">Xush kelibsiz, {company.adminName}!</h2>
                  <p className="text-muted-foreground mt-1">
                    {company.name} boshqaruv paneli -{" "}
                    {new Date().toLocaleDateString("uz-UZ", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs text-chart-2 bg-chart-2/10 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mt-4">{company.usersCount}</p>
                    <p className="text-sm text-muted-foreground">Jami xodimlar</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <FolderOpen className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs text-chart-2 bg-chart-2/10 px-2 py-1 rounded-full">+8%</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mt-4">24</p>
                    <p className="text-sm text-muted-foreground">Faol loyihalar</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <ClipboardList className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">78%</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mt-4">156</p>
                    <p className="text-sm text-muted-foreground">Vazifalar bajarildi</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs text-chart-2 bg-chart-2/10 px-2 py-1 rounded-full">+23%</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mt-4">86.4M</p>
                    <p className="text-sm text-muted-foreground">Bu oylik daromad</p>
                  </div>
                </div>

                {/* Charts and Recent */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Chart */}
                  <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl">
                    <h3 className="font-semibold text-foreground mb-4">Oylik daromad</h3>
                    <div className="h-48 flex items-end gap-2">
                      {[65, 45, 78, 52, 63, 85, 72, 90, 68, 75, 82, 95].map((value, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg transition-all hover:from-primary hover:to-primary/70"
                            style={{ height: `${value}%` }}
                          />
                          <span className="text-xs text-muted-foreground">
                            {["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl">
                    <h3 className="font-semibold text-foreground mb-4">Oxirgi faoliyat</h3>
                    <div className="space-y-4">
                      {[
                        {
                          text: "Yangi loyiha yaratildi",
                          user: "Nilufar K.",
                          time: "5 daqiqa oldin",
                          icon: FolderOpen,
                          color: "text-blue-500",
                        },
                        {
                          text: "Vazifa bajarildi",
                          user: "Javohir A.",
                          time: "15 daqiqa oldin",
                          icon: CheckCircle2,
                          color: "text-green-500",
                        },
                        {
                          text: "Yangi mijoz qo'shildi",
                          user: "Sardor R.",
                          time: "1 soat oldin",
                          icon: UserPlus,
                          color: "text-purple-500",
                        },
                        {
                          text: "Hisobot yuklandi",
                          user: "Madina U.",
                          time: "2 soat oldin",
                          icon: FileText,
                          color: "text-amber-500",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                        >
                          <div
                            className={cn(
                              "h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center",
                              item.color,
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{item.text}</p>
                            <p className="text-xs text-muted-foreground">{item.user}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl">
                  <h3 className="font-semibold text-foreground mb-4">Tezkor amallar</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { label: "Xodim qo'shish", icon: UserPlus, color: "from-blue-500 to-blue-600" },
                      { label: "Loyiha yaratish", icon: FolderOpen, color: "from-green-500 to-green-600" },
                      { label: "Vazifa berish", icon: ClipboardList, color: "from-purple-500 to-purple-600" },
                      { label: "Hisobot olish", icon: FileText, color: "from-amber-500 to-amber-600" },
                    ].map((action, i) => (
                      <button
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group"
                      >
                        <div
                          className={cn(
                            "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white",
                            action.color,
                          )}
                        >
                          <action.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {action.label}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {demoPage === "employees" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Xodimlar ro'yxati</h2>
                    <p className="text-muted-foreground">Jami {sampleEmployees.length} ta xodim</p>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Yangi xodim
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sampleEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      className="p-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{emp.name}</h3>
                          <p className="text-sm text-muted-foreground">{emp.position}</p>
                          <span
                            className={cn(
                              "inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium",
                              emp.status === "active" ? "bg-chart-2/10 text-chart-2" : "bg-muted text-muted-foreground",
                            )}
                          >
                            {emp.status === "active" ? "Faol" : "Nofaol"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {emp.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {emp.phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {demoPage === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Loyihalar</h2>
                    <p className="text-muted-foreground">Barcha loyihalarni boshqaring</p>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Yangi loyiha
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "SMM kampaniya - TechCorp",
                      status: "Jarayonda",
                      progress: 65,
                      budget: "25,000,000",
                      client: "TechCorp",
                    },
                    {
                      name: "Brend dizayni - FoodMax",
                      status: "Bajarildi",
                      progress: 100,
                      budget: "15,000,000",
                      client: "FoodMax",
                    },
                    {
                      name: "Video reklama - AutoPlus",
                      status: "Jarayonda",
                      progress: 40,
                      budget: "35,000,000",
                      client: "AutoPlus",
                    },
                    {
                      name: "Web sayt - MedClinic",
                      status: "Kutilmoqda",
                      progress: 0,
                      budget: "45,000,000",
                      client: "MedClinic",
                    },
                    {
                      name: "PR kampaniya - EduCenter",
                      status: "Jarayonda",
                      progress: 80,
                      budget: "20,000,000",
                      client: "EduCenter",
                    },
                    {
                      name: "Reklama bannerlari - ShopMall",
                      status: "Jarayonda",
                      progress: 55,
                      budget: "8,000,000",
                      client: "ShopMall",
                    },
                  ].map((project, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{project.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">Mijoz: {project.client}</p>
                        </div>
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            project.status === "Bajarildi" && "bg-chart-2/10 text-chart-2",
                            project.status === "Jarayonda" && "bg-blue-500/10 text-blue-500",
                            project.status === "Kutilmoqda" && "bg-amber-500/10 text-amber-500",
                          )}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Jarayon</span>
                          <span className="font-medium text-foreground">{project.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              project.progress === 100 ? "bg-chart-2" : "bg-primary",
                            )}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Byudjet</span>
                        <span className="font-semibold text-foreground">{project.budget} so'm</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {demoPage === "tasks" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Vazifalar</h2>
                    <p className="text-muted-foreground">Barcha vazifalarni kuzating</p>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Yangi vazifa
                  </Button>
                </div>
                <div className="grid gap-6 lg:grid-cols-4">
                  {[
                    { title: "Kutilmoqda", color: "border-slate-500", tasks: 8 },
                    { title: "Jarayonda", color: "border-blue-500", tasks: 12 },
                    { title: "Tekshiruvda", color: "border-amber-500", tasks: 5 },
                    { title: "Bajarildi", color: "border-green-500", tasks: 24 },
                  ].map((column, i) => (
                    <div key={i} className={cn("p-4 rounded-2xl border-t-4 bg-card/50 backdrop-blur-xl", column.color)}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">{column.title}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium">{column.tasks}</span>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((_, j) => (
                          <div key={j} className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                            <h4 className="text-sm font-medium text-foreground">Namuna vazifa #{i * 3 + j + 1}</h4>
                            <p className="text-xs text-muted-foreground mt-1">Marketing bo'limi</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="h-6 w-6 rounded-full bg-primary/20" />
                              <span className="text-xs text-muted-foreground">3 kun qoldi</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {demoPage === "clients" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Mijozlar</h2>
                    <p className="text-muted-foreground">Mijozlar bazasini boshqaring</p>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Yangi mijoz
                  </Button>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left p-4 font-medium text-muted-foreground">Mijoz</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Aloqa</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Loyihalar</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Daromad</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Holat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "TechCorp",
                          contact: "info@techcorp.uz",
                          projects: 5,
                          revenue: "125,000,000",
                          status: "Faol",
                        },
                        {
                          name: "FoodMax",
                          contact: "hello@foodmax.uz",
                          projects: 3,
                          revenue: "85,000,000",
                          status: "Faol",
                        },
                        {
                          name: "AutoPlus",
                          contact: "sales@autoplus.uz",
                          projects: 2,
                          revenue: "65,000,000",
                          status: "Faol",
                        },
                        {
                          name: "MedClinic",
                          contact: "admin@medclinic.uz",
                          projects: 1,
                          revenue: "45,000,000",
                          status: "Yangi",
                        },
                        {
                          name: "EduCenter",
                          contact: "info@educenter.uz",
                          projects: 4,
                          revenue: "95,000,000",
                          status: "Faol",
                        },
                      ].map((client, i) => (
                        <tr key={i} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold">
                                {client.name.charAt(0)}
                              </div>
                              <span className="font-medium text-foreground">{client.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">{client.contact}</td>
                          <td className="p-4 text-foreground">{client.projects} ta</td>
                          <td className="p-4 font-medium text-foreground">{client.revenue} so'm</td>
                          <td className="p-4">
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                client.status === "Faol"
                                  ? "bg-chart-2/10 text-chart-2"
                                  : "bg-blue-500/10 text-blue-500",
                              )}
                            >
                              {client.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {demoPage === "finance" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Moliyaviy hisobot</h2>
                    <p className="text-muted-foreground">Daromad va xarajatlarni kuzating</p>
                  </div>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Hisobot yuklab olish
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="p-5 rounded-2xl border border-border/50 bg-gradient-to-br from-green-500/10 to-transparent">
                    <p className="text-sm text-muted-foreground">Jami daromad</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      415,000,000 <span className="text-sm font-normal text-muted-foreground">so'm</span>
                    </p>
                    <span className="text-xs text-chart-2">+18% o'tgan oyga nisbatan</span>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/50 bg-gradient-to-br from-red-500/10 to-transparent">
                    <p className="text-sm text-muted-foreground">Jami xarajat</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      186,500,000 <span className="text-sm font-normal text-muted-foreground">so'm</span>
                    </p>
                    <span className="text-xs text-red-500">+5% o'tgan oyga nisbatan</span>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/50 bg-gradient-to-br from-blue-500/10 to-transparent">
                    <p className="text-sm text-muted-foreground">Sof foyda</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      228,500,000 <span className="text-sm font-normal text-muted-foreground">so'm</span>
                    </p>
                    <span className="text-xs text-chart-2">+25% o'tgan oyga nisbatan</span>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/50 bg-gradient-to-br from-purple-500/10 to-transparent">
                    <p className="text-sm text-muted-foreground">Kutilayotgan to'lovlar</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      65,000,000 <span className="text-sm font-normal text-muted-foreground">so'm</span>
                    </p>
                    <span className="text-xs text-amber-500">3 ta hisob-faktura</span>
                  </div>
                </div>
              </div>
            )}

            {(demoPage === "calendar" || demoPage === "analytics" || demoPage === "settings") && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="h-20 w-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                  {demoPage === "calendar" && <Calendar className="h-10 w-10 text-muted-foreground" />}
                  {demoPage === "analytics" && <TrendingUp className="h-10 w-10 text-muted-foreground" />}
                  {demoPage === "settings" && <Settings className="h-10 w-10 text-muted-foreground" />}
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {demoNavItems.find((n) => n.id === demoPage)?.label}
                </h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Bu bo'lim demo rejimida. Haqiqiy ma'lumotlar korxona faollashtirilgandan keyin ko'rinadi.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export function CompanyManagementModal({ company, onClose, onUpdate }: CompanyManagementModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "employees" | "positions" | "departments" | "credentials" | "settings"
  >("overview")
  const [employees, setEmployees] = useState(sampleEmployees)
  const [positions, setPositions] = useState(samplePositions)
  const [departments, setDepartments] = useState(sampleDepartments)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [showAddPosition, setShowAddPosition] = useState(false)
  const [showAddDepartment, setShowAddDepartment] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<(typeof sampleEmployees)[0] | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [editingCompany, setEditingCompany] = useState({ ...company })
  const [showDemoPreview, setShowDemoPreview] = useState(false)

  // Yangi xodim form
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    role: "user",
  })

  // Yangi lavozim form
  const [newPosition, setNewPosition] = useState({
    name: "",
    department: "",
    salary: "",
  })

  // Yangi bo'lim form
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    head: "",
  })

  // Parol generatsiya qilish
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setGeneratedPassword(password)
    return password
  }

  // Parolni nusxalash
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Xodim qo'shish
  const handleAddEmployee = () => {
    const newId = Math.max(...employees.map((e) => e.id)) + 1
    setEmployees([
      ...employees,
      {
        id: newId,
        name: newEmployee.name,
        position: newEmployee.position,
        department: newEmployee.department,
        email: newEmployee.email,
        phone: newEmployee.phone,
        status: "active",
        role: newEmployee.role,
      },
    ])
    setShowAddEmployee(false)
    setNewEmployee({ name: "", email: "", phone: "", position: "", department: "", role: "user" })
  }

  // Lavozim qo'shish
  const handleAddPosition = () => {
    const newId = Math.max(...positions.map((p) => p.id)) + 1
    setPositions([
      ...positions,
      {
        id: newId,
        name: newPosition.name,
        department: newPosition.department,
        employeeCount: 0,
        salary: newPosition.salary,
      },
    ])
    setShowAddPosition(false)
    setNewPosition({ name: "", department: "", salary: "" })
  }

  // Bo'lim qo'shish
  const handleAddDepartment = () => {
    const newId = Math.max(...departments.map((d) => d.id)) + 1
    const colors = [
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-teal-500 to-teal-600",
      "from-orange-500 to-orange-600",
    ]
    setDepartments([
      ...departments,
      {
        id: newId,
        name: newDepartment.name,
        employeeCount: 0,
        head: newDepartment.head,
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    ])
    setShowAddDepartment(false)
    setNewDepartment({ name: "", head: "" })
  }

  // Xodimni o'chirish
  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }

  // Filtrlangan xodimlar
  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const tabs = [
    { id: "overview", label: "Umumiy", icon: Building2 },
    { id: "employees", label: "Xodimlar", icon: Users, count: employees.length },
    { id: "positions", label: "Lavozimlar", icon: Briefcase, count: positions.length },
    { id: "departments", label: "Bo'limlar", icon: BarChart3, count: departments.length },
    { id: "credentials", label: "Login / Parol", icon: Key },
    { id: "settings", label: "Sozlamalar", icon: Settings },
  ]

  if (showDemoPreview) {
    return <CompanyDemoPreview company={company} onClose={() => setShowDemoPreview(false)} />
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="w-full max-w-6xl h-[90vh] rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white font-bold text-lg">
                {company.logo}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{company.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {company.industry} • {company.region}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowDemoPreview(true)}
                className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg"
              >
                <Play className="h-4 w-4" />
                Demo ko'rish
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-xs",
                      activeTab === tab.id ? "bg-white/20" : "bg-muted",
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Umumiy ma'lumotlar */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Monitor className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Korxona interfeysini ko'ring</p>
                    <p className="text-sm text-muted-foreground">
                      Barcha funksiyalarni test qilish uchun demo rejimga kiring
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowDemoPreview(true)}
                  className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <Maximize2 className="h-4 w-4" />
                  Demo ochish
                </Button>
              </div>

              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-primary/10 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{employees.length}</p>
                      <p className="text-xs text-muted-foreground">Jami xodimlar</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-chart-2/10 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/20">
                      <Briefcase className="h-5 w-5 text-chart-2" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{positions.length}</p>
                      <p className="text-xs text-muted-foreground">Lavozimlar</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-chart-4/10 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/20">
                      <BarChart3 className="h-5 w-5 text-chart-4" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{departments.length}</p>
                      <p className="text-xs text-muted-foreground">Bo'limlar</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-amber-500/10 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                      <HardDrive className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{company.storageUsed}</p>
                      <p className="text-xs text-muted-foreground">Xotira ishlatilgan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Korxona ma'lumotlari */}
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="p-6 rounded-xl border border-border/50 bg-card/50">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Korxona ma'lumotlari
                  </h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Korxona nomi</Label>
                        <Input
                          value={editingCompany.name}
                          onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Faoliyat sohasi</Label>
                        <Input
                          value={editingCompany.industry}
                          onChange={(e) => setEditingCompany({ ...editingCompany, industry: e.target.value })}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Manzil</Label>
                      <Input
                        value={editingCompany.address}
                        onChange={(e) => setEditingCompany({ ...editingCompany, address: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Telefon</Label>
                        <Input
                          value={editingCompany.phone}
                          onChange={(e) => setEditingCompany({ ...editingCompany, phone: e.target.value })}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Email</Label>
                        <Input
                          value={editingCompany.email}
                          onChange={(e) => setEditingCompany({ ...editingCompany, email: e.target.value })}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Veb-sayt</Label>
                      <Input
                        value={editingCompany.website}
                        onChange={(e) => setEditingCompany({ ...editingCompany, website: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <Button className="w-full mt-2" onClick={() => onUpdate(editingCompany)}>
                      <Check className="h-4 w-4 mr-2" />
                      O'zgarishlarni saqlash
                    </Button>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border/50 bg-card/50">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-chart-2" />
                    Obuna holati
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div>
                        <p className="text-sm text-muted-foreground">Joriy tarif</p>
                        <p className="font-semibold text-foreground flex items-center gap-2 mt-1">
                          {company.plan === "premium" && <Crown className="h-4 w-4 text-amber-500" />}
                          {company.plan === "professional" && <Star className="h-4 w-4 text-blue-500" />}
                          {company.plan === "starter" && <Zap className="h-4 w-4 text-slate-500" />}
                          {company.plan.charAt(0).toUpperCase() + company.plan.slice(1)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Tarifni o'zgartirish
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="p-3 rounded-lg bg-muted/20">
                        <p className="text-xs text-muted-foreground">Boshlanish sanasi</p>
                        <p className="font-medium text-foreground">{company.createdAt}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/20">
                        <p className="text-xs text-muted-foreground">Tugash sanasi</p>
                        <p className="font-medium text-foreground">{company.expiresAt}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-chart-2/10 border border-chart-2/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-chart-2" />
                        <span className="font-medium text-chart-2">Faol obuna</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Obuna muddati tugashiga{" "}
                        {Math.max(
                          0,
                          Math.floor(
                            (new Date(company.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                          ),
                        )}{" "}
                        kun qoldi
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Faol modullar */}
              <div className="p-6 rounded-xl border border-border/50 bg-card/50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-chart-4" />
                  Faol modullar
                </h3>
                <div className="flex flex-wrap gap-2">
                  {company.activeModules.map((module) => (
                    <span
                      key={module}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                    >
                      {module === "employees" && "Xodimlar"}
                      {module === "projects" && "Loyihalar"}
                      {module === "clients" && "Mijozlar"}
                      {module === "finance" && "Moliya"}
                      {module === "tasks" && "Vazifalar"}
                      {module === "content" && "Kontent"}
                      {module === "documents" && "Hujjatlar"}
                      {module === "analytics" && "Analitika"}
                      {module === "attendance" && "Davomat"}
                      {module === "reports" && "Hisobotlar"}
                      {module === "shifts" && "Smenalar"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Xodimlar */}
          {activeTab === "employees" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Xodim qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => setShowAddEmployee(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Xodim qo'shish
                </Button>
              </div>

              <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-4 font-medium text-muted-foreground">Xodim</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Bo'lim</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Aloqa</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Holat</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-medium">
                              {emp.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{emp.name}</p>
                              <p className="text-sm text-muted-foreground">{emp.position}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">{emp.department}</td>
                        <td className="p-4 hidden lg:table-cell">
                          <p className="text-sm text-muted-foreground">{emp.email}</p>
                          <p className="text-sm text-muted-foreground">{emp.phone}</p>
                        </td>
                        <td className="p-4">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              emp.status === "active" ? "bg-chart-2/10 text-chart-2" : "bg-muted text-muted-foreground",
                            )}
                          >
                            {emp.status === "active" ? "Faol" : "Nofaol"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedEmployee(emp)
                                generatePassword()
                                setShowPasswordModal(true)
                              }}
                            >
                              <Key className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteEmployee(emp.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Xodim qo'shish modali */}
              {showAddEmployee && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                  <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground">Yangi xodim qo'shish</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowAddEmployee(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>To'liq ism</Label>
                        <Input
                          value={newEmployee.name}
                          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                          placeholder="Ism Familiya"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={newEmployee.email}
                          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Telefon</Label>
                        <Input
                          value={newEmployee.phone}
                          onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                          placeholder="+998 90 123 45 67"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Lavozim</Label>
                          <select
                            value={newEmployee.position}
                            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground"
                          >
                            <option value="">Tanlang</option>
                            {positions.map((pos) => (
                              <option key={pos.id} value={pos.name}>
                                {pos.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Bo'lim</Label>
                          <select
                            value={newEmployee.department}
                            onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground"
                          >
                            <option value="">Tanlang</option>
                            {departments.map((dept) => (
                              <option key={dept.id} value={dept.name}>
                                {dept.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Rol</Label>
                        <select
                          value={newEmployee.role}
                          onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground"
                        >
                          <option value="user">Xodim</option>
                          <option value="manager">Menejer</option>
                          <option value="admin">Administrator</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setShowAddEmployee(false)}
                      >
                        Bekor qilish
                      </Button>
                      <Button className="flex-1" onClick={handleAddEmployee}>
                        <Plus className="h-4 w-4 mr-2" />
                        Qo'shish
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Parol modali */}
              {showPasswordModal && selectedEmployee && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                  <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground">Parolni boshqarish</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowPasswordModal(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="text-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                        {selectedEmployee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <p className="font-semibold text-foreground">{selectedEmployee.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.email}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Yangi parol</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              type={showPassword ? "text" : "password"}
                              value={generatedPassword}
                              onChange={(e) => setGeneratedPassword(e.target.value)}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          <Button variant="outline" size="icon" onClick={generatePassword}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => copyToClipboard(generatedPassword)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-amber-500">Muhim eslatma</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Parolni saqlash va xodimga yuborishni unutmang. Xavfsizlik uchun xodimdan parolni
                              o'zgartirishni so'rang.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setShowPasswordModal(false)}
                      >
                        Yopish
                      </Button>
                      <Button className="flex-1 gap-2">
                        <Send className="h-4 w-4" />
                        Emailga yuborish
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Lavozimlar */}
          {activeTab === "positions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Lavozimlar ro'yxati</h3>
                <Button onClick={() => setShowAddPosition(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Lavozim qo'shish
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {positions.map((pos) => (
                  <div
                    key={pos.id}
                    className="p-4 rounded-xl border border-border/50 bg-card/50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{pos.name}</h4>
                        <p className="text-sm text-muted-foreground">{pos.department}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Xodimlar soni</p>
                        <p className="font-semibold text-foreground">{pos.employeeCount} ta</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Maosh</p>
                        <p className="font-semibold text-foreground">{pos.salary} so'm</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lavozim qo'shish modali */}
              {showAddPosition && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                  <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground">Yangi lavozim qo'shish</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowAddPosition(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Lavozim nomi</Label>
                        <Input
                          value={newPosition.name}
                          onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                          placeholder="Masalan: Senior dizayner"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bo'lim</Label>
                        <select
                          value={newPosition.department}
                          onChange={(e) => setNewPosition({ ...newPosition, department: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground"
                        >
                          <option value="">Tanlang</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.name}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Maosh (so'm)</Label>
                        <Input
                          value={newPosition.salary}
                          onChange={(e) => setNewPosition({ ...newPosition, salary: e.target.value })}
                          placeholder="5,000,000"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setShowAddPosition(false)}
                      >
                        Bekor qilish
                      </Button>
                      <Button className="flex-1" onClick={handleAddPosition}>
                        <Plus className="h-4 w-4 mr-2" />
                        Qo'shish
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bo'limlar */}
          {activeTab === "departments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Bo'limlar ro'yxati</h3>
                <Button onClick={() => setShowAddDepartment(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Bo'lim qo'shish
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    className="rounded-xl border border-border/50 bg-card/50 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className={cn("h-2 bg-gradient-to-r", dept.color)} />
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{dept.name}</h4>
                          <p className="text-sm text-muted-foreground">Rahbar: {dept.head}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground font-medium">{dept.employeeCount} ta xodim</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bo'lim qo'shish modali */}
              {showAddDepartment && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                  <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground">Yangi bo'lim qo'shish</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowAddDepartment(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Bo'lim nomi</Label>
                        <Input
                          value={newDepartment.name}
                          onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                          placeholder="Masalan: Sotuvlar bo'limi"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bo'lim rahbari</Label>
                        <select
                          value={newDepartment.head}
                          onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground"
                        >
                          <option value="">Tanlang</option>
                          {employees
                            .filter((e) => e.role === "manager" || e.role === "admin")
                            .map((emp) => (
                              <option key={emp.id} value={emp.name}>
                                {emp.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setShowAddDepartment(false)}
                      >
                        Bekor qilish
                      </Button>
                      <Button className="flex-1" onClick={handleAddDepartment}>
                        <Plus className="h-4 w-4 mr-2" />
                        Qo'shish
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Login / Parol */}
          {activeTab === "credentials" && (
            <div className="space-y-6">
              {/* Admin hisobi */}
              <div className="p-6 rounded-xl border border-border/50 bg-card/50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-500" />
                  Administrator hisobi
                </h3>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
                    {company.adminName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{company.adminName}</p>
                    <p className="text-sm text-muted-foreground">{company.adminEmail}</p>
                  </div>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Key className="h-4 w-4" />
                    Parolni o'zgartirish
                  </Button>
                </div>
              </div>

              {/* Xodimlar login */}
              <div className="p-6 rounded-xl border border-border/50 bg-card/50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Xodimlar login ma'lumotlari
                </h3>
                <div className="space-y-3">
                  {employees.slice(0, 5).map((emp) => (
                    <div
                      key={emp.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-medium text-sm">
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">{emp.email}</p>
                      </div>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          emp.role === "admin" && "bg-amber-500/10 text-amber-500",
                          emp.role === "manager" && "bg-blue-500/10 text-blue-500",
                          emp.role === "user" && "bg-muted text-muted-foreground",
                        )}
                      >
                        {emp.role === "admin" && "Admin"}
                        {emp.role === "manager" && "Menejer"}
                        {emp.role === "user" && "Xodim"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedEmployee(emp)
                          generatePassword()
                          setShowPasswordModal(true)
                        }}
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Parol
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sozlamalar */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Xavfli zona */}
              <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/5">
                <h3 className="font-semibold text-red-500 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Xavfli zona
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                    <div>
                      <p className="font-medium text-foreground">Korxonani to'xtatish</p>
                      <p className="text-sm text-muted-foreground">Vaqtincha korxona hisobini to'xtatib qo'yish</p>
                    </div>
                    <Button
                      variant="outline"
                      className="gap-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 bg-transparent"
                    >
                      <Pause className="h-4 w-4" />
                      To'xtatish
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                    <div>
                      <p className="font-medium text-foreground">Korxonani o'chirish</p>
                      <p className="text-sm text-muted-foreground">
                        Barcha ma'lumotlar o'chiriladi va qayta tiklab bo'lmaydi
                      </p>
                    </div>
                    <Button variant="destructive" className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      O'chirish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
