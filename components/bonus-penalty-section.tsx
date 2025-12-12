"use client"

import {
  Gift,
  AlertTriangle,
  Filter,
  Search,
  DollarSign,
  Calendar,
  User,
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  X,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type RecordType = "bonus" | "penalty"
type RecordStatus = "pending" | "approved" | "rejected" | "paid"

interface BonusPenaltyRecord {
  id: number
  type: RecordType
  employeeId: number
  employeeName: string
  employeePosition: string
  employeeAvatar: string
  amount: number
  reason: string
  category: string
  date: string
  status: RecordStatus
  approvedBy?: string
  approvedDate?: string
  notes?: string
}

const records: BonusPenaltyRecord[] = [
  {
    id: 1,
    type: "bonus",
    employeeId: 1,
    employeeName: "Sardor Aliyev",
    employeePosition: "Sotuv menejeri",
    employeeAvatar: "SA",
    amount: 3000000,
    reason: "Oylik sotuvlar rejasini 125% bajarish",
    category: "KPI bonusi",
    date: "2024-12-09",
    status: "approved",
    approvedBy: "Alisher Karimov",
    approvedDate: "2024-12-09",
  },
  {
    id: 2,
    type: "bonus",
    employeeId: 2,
    employeeName: "Nilufar Azimova",
    employeePosition: "Marketing menejeri",
    employeeAvatar: "NA",
    amount: 2500000,
    reason: "Muvaffaqiyatli marketing kampaniyasi",
    category: "Loyiha bonusi",
    date: "2024-12-08",
    status: "pending",
  },
  {
    id: 3,
    type: "penalty",
    employeeId: 4,
    employeeName: "Malika Karimova",
    employeePosition: "Loyiha menejeri",
    employeeAvatar: "MK",
    amount: 500000,
    reason: "Loyiha muddatini o'tkazib yuborish",
    category: "Intizom",
    date: "2024-12-07",
    status: "approved",
    approvedBy: "Alisher Karimov",
    approvedDate: "2024-12-08",
    notes: "Birinchi ogohlantirish",
  },
  {
    id: 4,
    type: "bonus",
    employeeId: 3,
    employeeName: "Bobur Yusupov",
    employeePosition: "SMM mutaxassisi",
    employeeAvatar: "BY",
    amount: 1500000,
    reason: "Viral kontent yaratish",
    category: "Kreativ bonus",
    date: "2024-12-06",
    status: "paid",
    approvedBy: "Alisher Karimov",
    approvedDate: "2024-12-06",
  },
  {
    id: 5,
    type: "penalty",
    employeeId: 5,
    employeeName: "Rustam Qodirov",
    employeePosition: "Dizayner",
    employeeAvatar: "RQ",
    amount: 300000,
    reason: "Kechikish (3 marta)",
    category: "Davomat",
    date: "2024-12-05",
    status: "rejected",
    notes: "Sababli kechikishlar - transport muammosi",
  },
  {
    id: 6,
    type: "bonus",
    employeeId: 1,
    employeeName: "Sardor Aliyev",
    employeePosition: "Sotuv menejeri",
    employeeAvatar: "SA",
    amount: 5000000,
    reason: "Yirik shartnoma imzolash (BuildMax)",
    category: "Shartnoma bonusi",
    date: "2024-12-04",
    status: "paid",
    approvedBy: "Alisher Karimov",
    approvedDate: "2024-12-04",
  },
]

const bonusCategories = [
  { id: "kpi", label: "KPI bonusi", icon: Target },
  { id: "project", label: "Loyiha bonusi", icon: FileText },
  { id: "creative", label: "Kreativ bonus", icon: Zap },
  { id: "contract", label: "Shartnoma bonusi", icon: DollarSign },
  { id: "referral", label: "Tavsiya bonusi", icon: User },
  { id: "anniversary", label: "Yubiley bonusi", icon: Gift },
]

const penaltyCategories = [
  { id: "discipline", label: "Intizom", icon: AlertTriangle },
  { id: "attendance", label: "Davomat", icon: Clock },
  { id: "quality", label: "Sifat", icon: XCircle },
  { id: "deadline", label: "Muddat", icon: Calendar },
]

export function BonusPenaltySection() {
  const [viewMode, setViewMode] = useState<"all" | "bonus" | "penalty">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [addType, setAddType] = useState<RecordType>("bonus")
  const [selectedRecord, setSelectedRecord] = useState<BonusPenaltyRecord | null>(null)

  const getStatusColor = (status: RecordStatus) => {
    const colors = {
      pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      approved: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      rejected: "bg-red-500/20 text-red-400 border-red-500/30",
      paid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    }
    return colors[status]
  }

  const getStatusLabel = (status: RecordStatus) => {
    const labels = {
      pending: "Kutilmoqda",
      approved: "Tasdiqlangan",
      rejected: "Rad etilgan",
      paid: "To'langan",
    }
    return labels[status]
  }

  const filteredRecords = records.filter((record) => {
    const matchesType = viewMode === "all" || record.type === viewMode
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.reason.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const totalBonuses = records
    .filter((r) => r.type === "bonus" && r.status !== "rejected")
    .reduce((sum, r) => sum + r.amount, 0)
  const totalPenalties = records
    .filter((r) => r.type === "penalty" && r.status !== "rejected")
    .reduce((sum, r) => sum + r.amount, 0)
  const pendingCount = records.filter((r) => r.status === "pending").length

  const stats = [
    {
      label: "Jami bonuslar",
      value: `${(totalBonuses / 1000000).toFixed(1)}M`,
      subValue: "Bu oy",
      icon: Gift,
      color: "from-emerald-500 to-emerald-600",
      trend: "+18%",
      trendUp: true,
    },
    {
      label: "Jami jarimalar",
      value: `${(totalPenalties / 1000000).toFixed(1)}M`,
      subValue: "Bu oy",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      trend: "-5%",
      trendUp: true,
    },
    {
      label: "Sof farq",
      value: `${((totalBonuses - totalPenalties) / 1000000).toFixed(1)}M`,
      subValue: "Bonus - Jarima",
      icon: TrendingUp,
      color: "from-primary to-primary/70",
      trend: "+12%",
      trendUp: true,
    },
    {
      label: "Kutilmoqda",
      value: pendingCount.toString(),
      subValue: "Tasdiqlash kerak",
      icon: Clock,
      color: "from-amber-500 to-amber-600",
      trend: "0",
      trendUp: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Bonus va Jarimalar</h1>
          <p className="mt-1 text-muted-foreground">Xodimlar uchun rag'batlantirish va jazolarni boshqaring</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              setAddType("penalty")
              setShowAddModal(true)
            }}
            variant="outline"
            className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <AlertTriangle className="h-4 w-4" />
            Jarima yozish
          </Button>
          <Button
            onClick={() => {
              setAddType("bonus")
              setShowAddModal(true)
            }}
            className="gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
            <Gift className="h-4 w-4" />
            Bonus berish
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                  stat.color,
                )}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              {stat.trend !== "0" && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.trendUp ? "text-emerald-400" : "text-red-400",
                  )}
                >
                  {stat.trendUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {stat.trend}
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">
                {stat.value} <span className="text-sm font-normal text-muted-foreground">so'm</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.label} • {stat.subValue}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "all" ? "default" : "outline"} size="sm" onClick={() => setViewMode("all")}>
            Barchasi
          </Button>
          <Button
            variant={viewMode === "bonus" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("bonus")}
            className={viewMode === "bonus" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
          >
            <Gift className="h-4 w-4 mr-2" />
            Bonuslar
          </Button>
          <Button
            variant={viewMode === "penalty" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("penalty")}
            className={viewMode === "penalty" ? "bg-red-500 hover:bg-red-600" : ""}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Jarimalar
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 bg-card/50 border-border/50"
            />
          </div>
          <Button variant="outline" size="icon" className="border-border/50 bg-transparent">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Records Table */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Turi</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Xodim</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Sabab</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Miqdor</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Sana</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Holat</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr
                key={record.id}
                className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer"
                onClick={() => setSelectedRecord(record)}
              >
                <td className="p-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      record.type === "bonus" ? "bg-emerald-500/20" : "bg-red-500/20",
                    )}
                  >
                    {record.type === "bonus" ? (
                      <Gift className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-white">
                      {record.employeeAvatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{record.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{record.employeePosition}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 max-w-xs">
                  <p className="text-sm text-foreground truncate">{record.reason}</p>
                  <p className="text-xs text-muted-foreground">{record.category}</p>
                </td>
                <td className="p-4">
                  <span
                    className={cn("text-lg font-bold", record.type === "bonus" ? "text-emerald-400" : "text-red-400")}
                  >
                    {record.type === "bonus" ? "+" : "-"}
                    {record.amount.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">so'm</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {record.date}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={cn("rounded-full border px-3 py-1 text-xs font-medium", getStatusColor(record.status))}
                  >
                    {getStatusLabel(record.status)}
                  </span>
                </td>
                <td className="p-4">
                  {record.status === "pending" && (
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-emerald-400 hover:bg-emerald-500/20"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/20">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Monthly Summary */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bonus Categories */}
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Gift className="h-5 w-5 text-emerald-400" />
            Bonus kategoriyalari
          </h3>
          <div className="space-y-3">
            {bonusCategories.map((cat) => {
              const catRecords = records.filter(
                (r) => r.type === "bonus" && r.category.toLowerCase().includes(cat.label.toLowerCase().split(" ")[0]),
              )
              const total = catRecords.reduce((sum, r) => sum + r.amount, 0)
              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                      <cat.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <span className="font-medium text-foreground">{cat.label}</span>
                  </div>
                  <span className="font-semibold text-emerald-400">{(total / 1000000).toFixed(1)}M so'm</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Penalty Categories */}
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Jarima kategoriyalari
          </h3>
          <div className="space-y-3">
            {penaltyCategories.map((cat) => {
              const catRecords = records.filter(
                (r) => r.type === "penalty" && r.category.toLowerCase().includes(cat.label.toLowerCase()),
              )
              const total = catRecords.reduce((sum, r) => sum + r.amount, 0)
              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                      <cat.icon className="h-5 w-5 text-red-400" />
                    </div>
                    <span className="font-medium text-foreground">{cat.label}</span>
                  </div>
                  <span className="font-semibold text-red-400">{(total / 1000000).toFixed(1)}M so'm</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden">
            <div
              className={cn(
                "p-6",
                addType === "bonus"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  : "bg-gradient-to-r from-red-500 to-red-600",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {addType === "bonus" ? (
                    <Gift className="h-6 w-6 text-white" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-white" />
                  )}
                  <h2 className="text-xl font-bold text-white">
                    {addType === "bonus" ? "Yangi bonus berish" : "Jarima yozish"}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddModal(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2 block">Xodim</p>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  Xodimni tanlang
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2 block">Kategoriya</p>
                <div className="grid grid-cols-2 gap-2">
                  {(addType === "bonus" ? bonusCategories : penaltyCategories).slice(0, 4).map((cat) => (
                    <Button key={cat.id} variant="outline" className="justify-start gap-2 bg-transparent">
                      <cat.icon className="h-4 w-4" />
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="bonus-amount" className="text-sm font-medium text-foreground mb-2 block">Miqdor (so'm)</label>
                <Input id="bonus-amount" type="number" placeholder="0" className="bg-muted/30" />
              </div>
              <div>
                <label htmlFor="bonus-reason" className="text-sm font-medium text-foreground mb-2 block">Sabab</label>
                <textarea
                  id="bonus-reason"
                  placeholder={addType === "bonus" ? "Bonus berilish sababi..." : "Jarima sababi..."}
                  className="w-full h-24 rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddModal(false)}>
                  Bekor qilish
                </Button>
                <Button
                  className={cn(
                    "flex-1",
                    addType === "bonus" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600",
                  )}
                >
                  {addType === "bonus" ? "Bonus berish" : "Jarima yozish"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden">
            <div
              className={cn(
                "p-6",
                selectedRecord.type === "bonus"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  : "bg-gradient-to-r from-red-500 to-red-600",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-lg font-bold text-white">
                    {selectedRecord.employeeAvatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedRecord.employeeName}</h2>
                    <p className="text-white/80">{selectedRecord.employeePosition}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedRecord(null)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <span className="text-muted-foreground">Miqdor</span>
                <span
                  className={cn(
                    "text-2xl font-bold",
                    selectedRecord.type === "bonus" ? "text-emerald-400" : "text-red-400",
                  )}
                >
                  {selectedRecord.type === "bonus" ? "+" : "-"}
                  {selectedRecord.amount.toLocaleString()} so'm
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Kategoriya</span>
                  <span className="text-foreground font-medium">{selectedRecord.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sana</span>
                  <span className="text-foreground">{selectedRecord.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Holat</span>
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium",
                      getStatusColor(selectedRecord.status),
                    )}
                  >
                    {getStatusLabel(selectedRecord.status)}
                  </span>
                </div>
                {selectedRecord.approvedBy && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tasdiqlagan</span>
                    <span className="text-foreground">{selectedRecord.approvedBy}</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Sabab</p>
                <p className="text-foreground">{selectedRecord.reason}</p>
              </div>

              {selectedRecord.notes && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <p className="text-xs text-amber-400 mb-2">Izoh</p>
                  <p className="text-foreground">{selectedRecord.notes}</p>
                </div>
              )}

              {selectedRecord.status === "pending" && (
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rad etish
                  </Button>
                  <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Tasdiqlash
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
