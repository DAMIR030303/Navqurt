"use client"

import {
  Building2,
  Plus,
  Search,
  Users,
  Calendar,
  CheckSquare,
  Clock,
  FolderKanban,
  CalendarDays,
  FileText,
  TrendingUp,
  Wallet,
  BarChart3,
  Settings,
  X,
  Zap,
  Star,
  Crown,
  ChevronRight,
  Check,
  Target,
  Award,
  AlertTriangle,
  Scale,
} from "lucide-react"
import { useState } from "react"

import { CompanyManagementModal } from "./company-management-modal"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"


// Mavjud modullar
const allModules = [
  { id: "dashboard", name: "Boshqaruv paneli", icon: BarChart3, category: "asosiy" },
  { id: "employees", name: "Xodimlar", icon: Users, category: "asosiy" },
  { id: "shifts", name: "Smenalar", icon: Calendar, category: "asosiy" },
  { id: "tasks", name: "Vazifalar", icon: CheckSquare, category: "asosiy" },
  { id: "attendance", name: "Davomat", icon: Clock, category: "asosiy" },
  { id: "projects", name: "Loyihalar", icon: FolderKanban, category: "biznes" },
  { id: "clients", name: "Mijozlar", icon: Users, category: "biznes" },
  { id: "finance", name: "Moliya", icon: Wallet, category: "biznes" },
  { id: "content", name: "Kontent kalendari", icon: CalendarDays, category: "biznes" },
  { id: "documents", name: "Hujjatlar", icon: FileText, category: "biznes" },
  { id: "analytics", name: "Analitika", icon: TrendingUp, category: "biznes" },
  // Yangi modullar
  { id: "crm", name: "CRM (Sotuvlar)", icon: Target, category: "hr_kpi" },
  { id: "kpi", name: "KPI Boshqaruvi", icon: Award, category: "hr_kpi" },
  { id: "bonus_penalty", name: "Bonus va Jarimalar", icon: Scale, category: "hr_kpi" },
  { id: "reports", name: "Hisobotlar", icon: BarChart3, category: "tizim" },
  { id: "settings", name: "Sozlamalar", icon: Settings, category: "tizim" },
]

// Tarif rejalari
const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    price: "500,000",
    color: "from-slate-500 to-slate-600",
    maxUsers: 10,
    maxStorage: "5 GB",
    modules: ["dashboard", "employees", "tasks", "attendance", "reports", "settings"],
    features: ["Asosiy boshqaruv", "10 ta xodim", "Email yordam"],
  },
  {
    id: "professional",
    name: "Professional",
    icon: Star,
    price: "1,500,000",
    color: "from-blue-500 to-blue-600",
    maxUsers: 50,
    maxStorage: "50 GB",
    modules: [
      "dashboard",
      "employees",
      "shifts",
      "tasks",
      "attendance",
      "projects",
      "clients",
      "documents",
      "kpi", // KPI qo'shildi
      "bonus_penalty", // Bonus/Jarima qo'shildi
      "reports",
      "settings",
    ],
    features: ["Professional boshqaruv", "50 ta xodim", "KPI tizimi", "Bonus/Jarima", "Telefon yordam"],
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    price: "3,000,000",
    color: "from-amber-500 to-amber-600",
    maxUsers: -1, // unlimited
    maxStorage: "500 GB",
    modules: allModules.map((m) => m.id), // Barcha modullar
    features: [
      "To'liq boshqaruv",
      "Cheksiz xodim",
      "CRM tizimi",
      "To'liq KPI",
      "Bonus/Jarima",
      "24/7 yordam",
      "Shaxsiy menejer",
    ],
  },
]

const industryKPITemplates: Record<
  string,
  {
    metrics: { name: string; target: number; unit: string }[]
    bonusRules: { type: string; amount: number; condition: string }[]
    penaltyRules: { type: string; amount: number; condition: string }[]
  }
> = {
  "Media/Reklama": {
    metrics: [
      { name: "Oylik loyihalar soni", target: 10, unit: "ta" },
      { name: "Mijozlar qoniqishi", target: 90, unit: "%" },
      { name: "Kreativ kontentlar", target: 30, unit: "ta" },
      { name: "Daromad", target: 50000000, unit: "so'm" },
    ],
    bonusRules: [
      { type: "KPI bajarish", amount: 500000, condition: "100% bajarilganda" },
      { type: "Loyiha muvaffaqiyati", amount: 300000, condition: "Mijoz 5 yulduz bahosi" },
      { type: "Yangi mijoz", amount: 200000, condition: "Har bir yangi mijoz uchun" },
    ],
    penaltyRules: [
      { type: "Kechikish", amount: 50000, condition: "Har bir deadline o'tkazilganda" },
      { type: "Sifat muammosi", amount: 100000, condition: "Qayta ishlash talab qilinganda" },
    ],
  },
  Jurnalistika: {
    metrics: [
      { name: "Maqolalar soni", target: 20, unit: "ta" },
      { name: "O'quvchilar soni", target: 50000, unit: "ta" },
      { name: "Eksklyuziv yangiliklar", target: 5, unit: "ta" },
      { name: "Ijtimoiy tarmoq ulushishi", target: 1000, unit: "ta" },
    ],
    bonusRules: [
      { type: "Viral maqola", amount: 400000, condition: "100K+ o'qilganda" },
      { type: "Eksklyuziv", amount: 300000, condition: "Birinchi xabar qilganda" },
    ],
    penaltyRules: [
      { type: "Xato ma'lumot", amount: 200000, condition: "Tuzatish talab qilinganda" },
      { type: "Muddat buzilishi", amount: 100000, condition: "Nashr kechikganda" },
    ],
  },
  "SMM/Digital": {
    metrics: [
      { name: "Postlar soni", target: 60, unit: "ta" },
      { name: "Follower o'sishi", target: 10, unit: "%" },
      { name: "Engagement rate", target: 5, unit: "%" },
      { name: "Reklama ROAS", target: 3, unit: "x" },
    ],
    bonusRules: [
      { type: "Viral post", amount: 300000, condition: "10K+ like/share" },
      { type: "KPI oshirish", amount: 500000, condition: "Target 120%+ bajarilganda" },
    ],
    penaltyRules: [
      { type: "Post o'tkazib yuborildi", amount: 50000, condition: "Har bir o'tkazilgan post" },
      { type: "Engagement tushdi", amount: 150000, condition: "Oylik 20%+ kamaysa" },
    ],
  },
  "Yuridik xizmatlar": {
    metrics: [
      { name: "Ishlar soni", target: 15, unit: "ta" },
      { name: "Yutuq foizi", target: 80, unit: "%" },
      { name: "Mijoz qoniqishi", target: 95, unit: "%" },
      { name: "Hujjatlar tayyorlash", target: 50, unit: "ta" },
    ],
    bonusRules: [
      { type: "Ish yutildi", amount: 1000000, condition: "Muhim ish yutuqqa erishganda" },
      { type: "Yangi mijoz", amount: 500000, condition: "Yirik mijoz jalb qilganda" },
    ],
    penaltyRules: [
      { type: "Muddat o'tkazildi", amount: 300000, condition: "Sud muddati o'tkazilganda" },
      { type: "Hujjat xatosi", amount: 200000, condition: "Qayta ko'rib chiqish kerak bo'lganda" },
    ],
  },
  "IT/Dasturlash": {
    metrics: [
      { name: "Tugallangan loyihalar", target: 5, unit: "ta" },
      { name: "Bug fix vaqti", target: 24, unit: "soat" },
      { name: "Code review", target: 20, unit: "ta" },
      { name: "Hujjatlashtirish", target: 100, unit: "%" },
    ],
    bonusRules: [
      { type: "Loyiha muddatidan oldin", amount: 800000, condition: "1 hafta oldin tugaganda" },
      { type: "Zero bug release", amount: 500000, condition: "Xatosiz reliz" },
    ],
    penaltyRules: [
      { type: "Critical bug", amount: 300000, condition: "Production da kritik xato" },
      { type: "Deadline buzilishi", amount: 200000, condition: "Har hafta kechikish uchun" },
    ],
  },
}

// Namuna korxonalar
const sampleCompanies = [
  {
    id: 1,
    name: "Navoiy Media Group",
    logo: "NM",
    industry: "Media/Reklama",
    region: "Navoiy",
    address: "Navoiy sh., A.Navoiy ko'chasi, 15-uy",
    phone: "+998 79 223 45 67",
    email: "info@navoiymedia.uz",
    website: "navoiymedia.uz",
    plan: "premium",
    status: "active" as const,
    createdAt: "2024-01-15",
    expiresAt: "2025-01-15",
    usersCount: 25,
    activeModules: allModules.map((m) => m.id),
    storageUsed: "45 GB",
    lastActivity: "5 daqiqa oldin",
    adminName: "Sardor Rahimov",
    adminEmail: "admin@navoiymedia.uz",
    kpiSettings: industryKPITemplates["Media/Reklama"],
    salarySettings: {
      baseSalary: 5000000,
      kpiBonus: 20, // % maoshdan
      attendanceBonus: 5, // %
      overtimeRate: 1.5, // x
    },
  },
  {
    id: 2,
    name: "Toshkent Advokatlari",
    logo: "TA",
    industry: "Yuridik xizmatlar",
    region: "Toshkent shahri",
    address: "Toshkent sh., Amir Temur ko'chasi, 100",
    phone: "+998 71 234 56 78",
    email: "info@toshadvokat.uz",
    website: "toshadvokat.uz",
    plan: "professional",
    status: "active" as const,
    createdAt: "2024-02-20",
    expiresAt: "2025-02-20",
    usersCount: 12,
    activeModules: plans.find((p) => p.id === "professional")?.modules || [],
    storageUsed: "8 GB",
    lastActivity: "1 soat oldin",
    adminName: "Aziza Karimova",
    adminEmail: "admin@toshadvokat.uz",
    kpiSettings: industryKPITemplates["Yuridik xizmatlar"],
    salarySettings: {
      baseSalary: 8000000,
      kpiBonus: 25,
      attendanceBonus: 5,
      overtimeRate: 2,
    },
  },
  {
    id: 3,
    name: "Digital Solutions",
    logo: "DS",
    industry: "SMM/Digital",
    region: "Samarqand",
    address: "Samarqand sh., Registon ko'chasi, 50",
    phone: "+998 66 234 56 78",
    email: "hello@digitalsolutions.uz",
    website: "digitalsolutions.uz",
    plan: "starter",
    status: "trial" as const,
    createdAt: "2024-03-01",
    expiresAt: "2024-03-15",
    usersCount: 5,
    activeModules: plans.find((p) => p.id === "starter")?.modules || [],
    storageUsed: "1.2 GB",
    lastActivity: "3 kun oldin",
    adminName: "Bobur Aliyev",
    adminEmail: "admin@digitalsolutions.uz",
    kpiSettings: industryKPITemplates["SMM/Digital"],
    salarySettings: {
      baseSalary: 4000000,
      kpiBonus: 15,
      attendanceBonus: 5,
      overtimeRate: 1.5,
    },
  },
]

// Soha turlari
const industries = [
  "Media/Reklama",
  "Jurnalistika",
  "SMM/Digital",
  "Marketing",
  "IT/Dasturlash",
  "Yuridik xizmatlar",
  "Konsalting",
  "Moliya/Bank",
  "Ta'lim",
  "Sog'liqni saqlash",
  "Ishlab chiqarish",
  "Savdo",
  "Xizmat ko'rsatish",
  "Qurilish",
  "Transport/Logistika",
  "Boshqa",
]

// Viloyatlar
const regions = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand",
  "Buxoro",
  "Navoiy",
  "Andijon",
  "Farg'ona",
  "Namangan",
  "Qashqadaryo",
  "Surxondaryo",
  "Jizzax",
  "Sirdaryo",
  "Xorazm",
  "Qoraqalpog'iston",
]

export function SuperAdminSection() {
  const [companies, setCompanies] = useState(sampleCompanies)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "trial" | "expired">("all")
  const [filterPlan, setFilterPlan] = useState<"all" | "starter" | "professional" | "premium">("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<(typeof sampleCompanies)[0] | null>(null)

  const [newCompany, setNewCompany] = useState({
    name: "",
    industry: "",
    region: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    plan: "professional",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    selectedModules: [] as string[],
    kpiMetrics: [] as { name: string; target: number; unit: string }[],
    bonusRules: [] as { type: string; amount: number; condition: string }[],
    penaltyRules: [] as { type: string; amount: number; condition: string }[],
    baseSalary: 5000000,
    kpiBonus: 20,
    attendanceBonus: 5,
    overtimeRate: 1.5,
  })

  const [formStep, setFormStep] = useState(1)

  // Statistikalar
  const stats = {
    totalCompanies: companies.length,
    activeCompanies: companies.filter((c) => c.status === "active").length,
    trialCompanies: companies.filter((c) => c.status === "trial").length,
    expiredCompanies: companies.filter((c) => c.status !== "active" && c.status !== "trial").length,
    totalUsers: companies.reduce((acc, c) => acc + c.usersCount, 0),
    totalRevenue: companies
      .filter((c) => c.status === "active")
      .reduce((acc, c) => {
        const plan = plans.find((p) => p.id === c.plan)
        return acc + (plan ? Number.parseInt(plan.price.replace(/,/g, "")) : 0)
      }, 0),
  }

  // Filtrlangan korxonalar
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.region.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || company.status === filterStatus
    const matchesPlan = filterPlan === "all" || company.plan === filterPlan
    return matchesSearch && matchesStatus && matchesPlan
  })

  const handleIndustrySelect = (industry: string) => {
    const template = industryKPITemplates[industry]
    if (template) {
      setNewCompany({
        ...newCompany,
        industry,
        kpiMetrics: [...template.metrics],
        bonusRules: [...template.bonusRules],
        penaltyRules: [...template.penaltyRules],
      })
    } else {
      setNewCompany({ ...newCompany, industry })
    }
  }

  // Tarif tanlanganda modullarni avtomatik tanlash
  const handlePlanSelect = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (plan) {
      setNewCompany({
        ...newCompany,
        plan: planId,
        selectedModules: [...plan.modules],
      })
    }
  }

  const handleAddCompany = () => {
    const newId = Math.max(...companies.map((c) => c.id)) + 1
    const today = new Date()
    const expiryDate = new Date(today)
    expiryDate.setFullYear(expiryDate.getFullYear() + 1)

    const company = {
      id: newId,
      name: newCompany.name,
      logo: newCompany.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      industry: newCompany.industry,
      region: newCompany.region,
      address: newCompany.address,
      phone: newCompany.phone,
      email: newCompany.email,
      website: newCompany.website,
      plan: newCompany.plan,
      status: "active" as const,
      createdAt: today.toISOString().split("T")[0],
      expiresAt: expiryDate.toISOString().split("T")[0],
      usersCount: 1,
      activeModules: newCompany.selectedModules,
      storageUsed: "0 GB",
      lastActivity: "Hozirgina",
      adminName: newCompany.adminName,
      adminEmail: newCompany.adminEmail,
      kpiSettings: {
        metrics: newCompany.kpiMetrics,
        bonusRules: newCompany.bonusRules,
        penaltyRules: newCompany.penaltyRules,
      },
      salarySettings: {
        baseSalary: newCompany.baseSalary,
        kpiBonus: newCompany.kpiBonus,
        attendanceBonus: newCompany.attendanceBonus,
        overtimeRate: newCompany.overtimeRate,
      },
    }

    setCompanies([company, ...companies])
    setShowAddModal(false)
    setFormStep(1)
    setNewCompany({
      name: "",
      industry: "",
      region: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      plan: "professional",
      adminName: "",
      adminEmail: "",
      adminPassword: "",
      selectedModules: [],
      kpiMetrics: [],
      bonusRules: [],
      penaltyRules: [],
      baseSalary: 5000000,
      kpiBonus: 20,
      attendanceBonus: 5,
      overtimeRate: 1.5,
    })
  }

  const handleUpdateCompany = (updatedCompany: any) => {
    setCompanies(companies.map((c) => (c.id === updatedCompany.id ? updatedCompany : c)))
    setShowCompanyModal(false)
  }

  const handleOpenCompany = (company: any) => {
    setSelectedCompany(company)
    setShowCompanyModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Super Admin Panel</h1>
          <p className="mt-1 text-muted-foreground">Barcha korxonalarni boshqaring va kuzating</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi korxona
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jami korxonalar</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalCompanies}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-2/10">
              <Check className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faol obunalar</p>
              <p className="text-2xl font-bold text-foreground">{stats.activeCompanies}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-chart-4/20 to-chart-4/10">
              <Users className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jami foydalanuvchilar</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/10">
              <Wallet className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Oylik daromad</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.totalRevenue.toLocaleString()} <span className="text-sm font-normal">so'm</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Korxona qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="h-10 px-3 rounded-lg bg-card/50 border border-border/50 text-sm"
          >
            <option value="all">Barcha holatlar</option>
            <option value="active">Faol</option>
            <option value="trial">Sinov</option>
            <option value="expired">Muddati o'tgan</option>
          </select>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value as typeof filterPlan)}
            className="h-10 px-3 rounded-lg bg-card/50 border border-border/50 text-sm"
          >
            <option value="all">Barcha tariflar</option>
            <option value="starter">Starter</option>
            <option value="professional">Professional</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>

      {/* Companies Table */}
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">Korxona</th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Soha</th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Tarif</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Holat</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => {
              const plan = plans.find((p) => p.id === company.plan)
              return (
                <tr
                  key={company.id}
                  className="border-t border-border/30 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => handleOpenCompany(company)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-sm",
                          company.status === "active"
                            ? "bg-gradient-to-br from-primary to-primary/70"
                            : company.status === "trial"
                              ? "bg-gradient-to-br from-chart-4 to-chart-4/70"
                              : "bg-gradient-to-br from-muted to-muted/70",
                        )}
                      >
                        {company.logo}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{company.name}</p>
                        <p className="text-sm text-muted-foreground">{company.region}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{company.industry}</td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      {plan && (
                        <>
                          <div
                            className={cn(
                              "h-6 w-6 rounded-md bg-gradient-to-br flex items-center justify-center text-white",
                              plan.color,
                            )}
                          >
                            <plan.icon className="h-3 w-3" />
                          </div>
                          <span className="text-sm font-medium">{plan.name}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        company.status === "active"
                          ? "bg-chart-2/10 text-chart-2"
                          : company.status === "trial"
                            ? "bg-chart-4/10 text-chart-4"
                            : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {company.status === "active" ? "Faol" : company.status === "trial" ? "Sinov" : "Muddati o'tgan"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenCompany(company)
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="w-full max-w-3xl rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                    <Building2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Yangi korxona qo'shish</h2>
                    <p className="text-sm text-muted-foreground">Bosqich {formStep} / 4</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowAddModal(false)
                    setFormStep(1)
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {/* Progress */}
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all",
                      step <= formStep ? "bg-primary" : "bg-muted",
                    )}
                  />
                ))}
              </div>
              {/* Step labels */}
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span className={formStep >= 1 ? "text-primary" : ""}>Ma'lumotlar</span>
                <span className={formStep >= 2 ? "text-primary" : ""}>Tarif</span>
                <span className={formStep >= 3 ? "text-primary" : ""}>KPI & Maosh</span>
                <span className={formStep >= 4 ? "text-primary" : ""}>Administrator</span>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6 space-y-6">
              {/* Step 1: Korxona ma'lumotlari */}
              {formStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Korxona ma'lumotlari</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Korxona nomi *</Label>
                      <Input
                        placeholder="Masalan: Navoiy Media Group"
                        value={newCompany.name}
                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Faoliyat sohasi *</Label>
                      <select
                        value={newCompany.industry}
                        onChange={(e) => handleIndustrySelect(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/50 text-sm"
                      >
                        <option value="">Tanlang...</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Hudud *</Label>
                      <select
                        value={newCompany.region}
                        onChange={(e) => setNewCompany({ ...newCompany, region: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/50 text-sm"
                      >
                        <option value="">Tanlang...</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Manzil</Label>
                      <Input
                        placeholder="To'liq manzil"
                        value={newCompany.address}
                        onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Telefon *</Label>
                      <Input
                        placeholder="+998 XX XXX XX XX"
                        value={newCompany.phone}
                        onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        placeholder="info@company.uz"
                        value={newCompany.email}
                        onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Veb-sayt</Label>
                      <Input
                        placeholder="company.uz"
                        value={newCompany.website}
                        onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Tarif va modullar */}
              {formStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Tarif rejasini tanlang</h3>
                    <div className="grid gap-3 md:grid-cols-3">
                      {plans.map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => handlePlanSelect(plan.id)}
                          className={cn(
                            "p-4 rounded-xl border text-left transition-all",
                            newCompany.plan === plan.id
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-border/50 hover:border-primary/50 bg-background/50",
                          )}
                        >
                          <div
                            className={cn(
                              "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white mb-2",
                              plan.color,
                            )}
                          >
                            <plan.icon className="h-5 w-5" />
                          </div>
                          <p className="font-semibold text-foreground">{plan.name}</p>
                          <p className="text-sm text-primary font-medium">{plan.price} so'm/oy</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {plan.maxUsers === -1 ? "Cheksiz" : plan.maxUsers} foydalanuvchi
                          </p>
                          <ul className="mt-3 space-y-1">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="h-3 w-3 text-chart-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Modullarni sozlash</h3>
                    <div className="space-y-4">
                      {["asosiy", "biznes", "hr_kpi", "tizim"].map((category) => (
                        <div key={category}>
                          <p className="text-sm font-medium text-muted-foreground mb-2 capitalize">
                            {category === "asosiy"
                              ? "Asosiy modullar"
                              : category === "biznes"
                                ? "Biznes modullar"
                                : category === "hr_kpi"
                                  ? "HR & KPI modullar"
                                  : "Tizim modullari"}
                          </p>
                          <div className="grid gap-2 md:grid-cols-3">
                            {allModules
                              .filter((m) => m.category === category)
                              .map((module) => {
                                const isSelected = newCompany.selectedModules.includes(module.id)
                                const selectedPlan = plans.find((p) => p.id === newCompany.plan)
                                const isInPlan = selectedPlan?.modules.includes(module.id)

                                return (
                                  <button
                                    key={module.id}
                                    onClick={() => {
                                      if (isSelected) {
                                        setNewCompany({
                                          ...newCompany,
                                          selectedModules: newCompany.selectedModules.filter((id) => id !== module.id),
                                        })
                                      } else {
                                        setNewCompany({
                                          ...newCompany,
                                          selectedModules: [...newCompany.selectedModules, module.id],
                                        })
                                      }
                                    }}
                                    className={cn(
                                      "flex items-center gap-2 p-3 rounded-lg border text-left transition-all",
                                      isSelected
                                        ? "border-primary bg-primary/5"
                                        : "border-border/50 hover:border-primary/50 bg-background/50",
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "h-8 w-8 rounded-lg flex items-center justify-center",
                                        isSelected ? "bg-primary text-white" : "bg-muted",
                                      )}
                                    >
                                      <module.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium truncate">{module.name}</p>
                                      {isInPlan && !isSelected && (
                                        <p className="text-xs text-chart-2">Tarifga kiradi</p>
                                      )}
                                    </div>
                                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                                  </button>
                                )
                              })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">KPI ko'rsatkichlari</h3>
                      {newCompany.industry && industryKPITemplates[newCompany.industry] && (
                        <span className="text-xs bg-chart-2/10 text-chart-2 px-2 py-1 rounded-full">
                          {newCompany.industry} uchun shablon yuklandi
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      {newCompany.kpiMetrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50"
                        >
                          <Target className="h-4 w-4 text-primary" />
                          <div className="flex-1 grid grid-cols-3 gap-3">
                            <Input
                              value={metric.name}
                              onChange={(e) => {
                                const updated = [...newCompany.kpiMetrics]
                                updated[idx].name = e.target.value
                                setNewCompany({ ...newCompany, kpiMetrics: updated })
                              }}
                              placeholder="Ko'rsatkich nomi"
                              className="text-sm"
                            />
                            <Input
                              type="number"
                              value={metric.target}
                              onChange={(e) => {
                                const updated = [...newCompany.kpiMetrics]
                                updated[idx].target = Number(e.target.value)
                                setNewCompany({ ...newCompany, kpiMetrics: updated })
                              }}
                              placeholder="Maqsad"
                              className="text-sm"
                            />
                            <Input
                              value={metric.unit}
                              onChange={(e) => {
                                const updated = [...newCompany.kpiMetrics]
                                updated[idx].unit = e.target.value
                                setNewCompany({ ...newCompany, kpiMetrics: updated })
                              }}
                              placeholder="Birlik"
                              className="text-sm"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setNewCompany({
                                ...newCompany,
                                kpiMetrics: newCompany.kpiMetrics.filter((_, i) => i !== idx),
                              })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full gap-2 bg-transparent"
                        onClick={() => {
                          setNewCompany({
                            ...newCompany,
                            kpiMetrics: [...newCompany.kpiMetrics, { name: "", target: 0, unit: "" }],
                          })
                        }}
                      >
                        <Plus className="h-4 w-4" />
                        KPI qo'shish
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Award className="h-4 w-4 text-chart-2" />
                        Bonus qoidalari
                      </h3>
                      <div className="space-y-2">
                        {newCompany.bonusRules.map((rule, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-chart-2/5 border border-chart-2/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">{rule.type}</span>
                              <span className="text-sm text-chart-2 font-bold">
                                +{rule.amount.toLocaleString()} so'm
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">{rule.condition}</p>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2 border-chart-2/30 text-chart-2 hover:bg-chart-2/10 bg-transparent"
                          onClick={() => {
                            setNewCompany({
                              ...newCompany,
                              bonusRules: [
                                ...newCompany.bonusRules,
                                { type: "Yangi bonus", amount: 100000, condition: "Shartni kiriting" },
                              ],
                            })
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          Bonus qo'shish
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        Jarima qoidalari
                      </h3>
                      <div className="space-y-2">
                        {newCompany.penaltyRules.map((rule, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">{rule.type}</span>
                              <span className="text-sm text-destructive font-bold">
                                -{rule.amount.toLocaleString()} so'm
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">{rule.condition}</p>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 bg-transparent"
                          onClick={() => {
                            setNewCompany({
                              ...newCompany,
                              penaltyRules: [
                                ...newCompany.penaltyRules,
                                { type: "Yangi jarima", amount: 50000, condition: "Shartni kiriting" },
                              ],
                            })
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          Jarima qo'shish
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      Maosh sozlamalari
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Asosiy maosh (standart)</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={newCompany.baseSalary}
                            onChange={(e) => setNewCompany({ ...newCompany, baseSalary: Number(e.target.value) })}
                            className="pr-16"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            so'm
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>KPI bonus foizi</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={newCompany.kpiBonus}
                            onChange={(e) => setNewCompany({ ...newCompany, kpiBonus: Number(e.target.value) })}
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            %
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Davomat bonus foizi</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={newCompany.attendanceBonus}
                            onChange={(e) => setNewCompany({ ...newCompany, attendanceBonus: Number(e.target.value) })}
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            %
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Ortiqcha ish koeffitsienti</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.1"
                            value={newCompany.overtimeRate}
                            onChange={(e) => setNewCompany({ ...newCompany, overtimeRate: Number(e.target.value) })}
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            x
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Maosh hisoblash misoli */}
                    <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                      <p className="text-sm font-medium mb-3">Maosh hisoblash misoli:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Asosiy maosh:</span>
                          <span>{newCompany.baseSalary.toLocaleString()} so'm</span>
                        </div>
                        <div className="flex justify-between text-chart-2">
                          <span>+ KPI bonus (100% bajarilsa):</span>
                          <span>+{((newCompany.baseSalary * newCompany.kpiBonus) / 100).toLocaleString()} so'm</span>
                        </div>
                        <div className="flex justify-between text-chart-2">
                          <span>+ Davomat bonus:</span>
                          <span>
                            +{((newCompany.baseSalary * newCompany.attendanceBonus) / 100).toLocaleString()} so'm
                          </span>
                        </div>
                        <div className="border-t border-border/50 pt-2 flex justify-between font-bold">
                          <span>Maksimal maosh:</span>
                          <span>
                            {(
                              newCompany.baseSalary *
                              (1 + newCompany.kpiBonus / 100 + newCompany.attendanceBonus / 100)
                            ).toLocaleString()}{" "}
                            so'm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Administrator */}
              {formStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Administrator hisobi</h3>
                  <p className="text-sm text-muted-foreground">Korxona boshqaruvchisi uchun login ma'lumotlari</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Administrator ismi *</Label>
                      <Input
                        placeholder="To'liq ism"
                        value={newCompany.adminName}
                        onChange={(e) => setNewCompany({ ...newCompany, adminName: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email (login) *</Label>
                      <Input
                        type="email"
                        placeholder="admin@company.uz"
                        value={newCompany.adminEmail}
                        onChange={(e) => setNewCompany({ ...newCompany, adminEmail: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Parol *</Label>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Parol"
                          value={newCompany.adminPassword}
                          onChange={(e) => setNewCompany({ ...newCompany, adminPassword: e.target.value })}
                          className="bg-background/50"
                        />
                        <Button
                          variant="outline"
                          onClick={() => {
                            const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%"
                            let password = ""
                            for (let i = 0; i < 12; i++) {
                              password += chars.charAt(Math.floor(Math.random() * chars.length))
                            }
                            setNewCompany({ ...newCompany, adminPassword: password })
                          }}
                        >
                          Generatsiya
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Xulosa */}
                  <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/50">
                    <h4 className="font-medium mb-3">Korxona ma'lumotlari xulosasi</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Korxona:</p>
                        <p className="font-medium">{newCompany.name || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Soha:</p>
                        <p className="font-medium">{newCompany.industry || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tarif:</p>
                        <p className="font-medium">{plans.find((p) => p.id === newCompany.plan)?.name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Modullar soni:</p>
                        <p className="font-medium">{newCompany.selectedModules.length} ta</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">KPI ko'rsatkichlari:</p>
                        <p className="font-medium">{newCompany.kpiMetrics.length} ta</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Bonus/Jarima qoidalari:</p>
                        <p className="font-medium">
                          {newCompany.bonusRules.length + newCompany.penaltyRules.length} ta
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/50 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setFormStep(Math.max(1, formStep - 1))}
                disabled={formStep === 1}
              >
                Orqaga
              </Button>
              {formStep < 4 ? (
                <Button
                  onClick={() => setFormStep(formStep + 1)}
                  disabled={
                    (formStep === 1 && (!newCompany.name || !newCompany.industry || !newCompany.region)) ||
                    (formStep === 2 && newCompany.selectedModules.length === 0)
                  }
                >
                  Keyingi
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleAddCompany}
                  disabled={!newCompany.adminName || !newCompany.adminEmail || !newCompany.adminPassword}
                  className="bg-gradient-to-r from-chart-2 to-chart-2/80"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Korxonani yaratish
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Company Management Modal */}
      {showCompanyModal && selectedCompany && (
        <CompanyManagementModal
          company={selectedCompany}
          onClose={() => setShowCompanyModal(false)}
          onUpdate={handleUpdateCompany}
        />
      )}
    </div>
  )
}
