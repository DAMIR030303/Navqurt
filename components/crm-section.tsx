"use client"

import {
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  MoreVertical,
  Building2,
  User,
  DollarSign,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  TrendingUp,
  Briefcase,
  FileText,
  PhoneCall,
  Video,
  Star,
  X,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Lead {
  id: number
  name: string
  company: string
  email: string
  phone: string
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost"
  value: string
  source: string
  assignedTo: string
  lastContact: string
  nextAction: string
  nextActionDate: string
  notes: string
  createdAt: string
  priority: "low" | "medium" | "high"
}

const leads: Lead[] = [
  {
    id: 1,
    name: "Aziz Rahimov",
    company: "TechnoSoft LLC",
    email: "aziz@technosoft.uz",
    phone: "+998 90 123 45 67",
    status: "proposal",
    value: "45,000,000",
    source: "Veb-sayt",
    assignedTo: "Sardor Aliyev",
    lastContact: "2 soat oldin",
    nextAction: "Taklifnoma yuborish",
    nextActionDate: "Bugun, 15:00",
    notes: "Katta loyiha, 6 oylik shartnoma",
    createdAt: "2024-12-01",
    priority: "high",
  },
  {
    id: 2,
    name: "Malika Karimova",
    company: "Green Energy",
    email: "malika@greenenergy.uz",
    phone: "+998 91 234 56 78",
    status: "negotiation",
    value: "120,000,000",
    source: "Tavsiya",
    assignedTo: "Nilufar Azimova",
    lastContact: "1 kun oldin",
    nextAction: "Uchrashuv",
    nextActionDate: "Ertaga, 10:00",
    notes: "Byudjet tasdiqlandi, shartnoma muhokamasi",
    createdAt: "2024-11-25",
    priority: "high",
  },
  {
    id: 3,
    name: "Bobur Yusupov",
    company: "MediaPlus",
    email: "bobur@mediaplus.uz",
    phone: "+998 93 345 67 89",
    status: "qualified",
    value: "25,000,000",
    source: "LinkedIn",
    assignedTo: "Sardor Aliyev",
    lastContact: "3 kun oldin",
    nextAction: "Demo ko'rsatish",
    nextActionDate: "12-dekabr",
    notes: "SMM xizmatlarga qiziqish",
    createdAt: "2024-12-05",
    priority: "medium",
  },
  {
    id: 4,
    name: "Dilnoza Saidova",
    company: "Fashion House",
    email: "dilnoza@fashionhouse.uz",
    phone: "+998 94 456 78 90",
    status: "new",
    value: "15,000,000",
    source: "Instagram",
    assignedTo: "Nilufar Azimova",
    lastContact: "Yangi",
    nextAction: "Qo'ng'iroq qilish",
    nextActionDate: "Bugun",
    notes: "Reklama kampaniyasi kerak",
    createdAt: "2024-12-09",
    priority: "medium",
  },
  {
    id: 5,
    name: "Rustam Qodirov",
    company: "AutoParts Pro",
    email: "rustam@autoparts.uz",
    phone: "+998 95 567 89 01",
    status: "contacted",
    value: "35,000,000",
    source: "Telefon",
    assignedTo: "Sardor Aliyev",
    lastContact: "5 soat oldin",
    nextAction: "Taklif tayyorlash",
    nextActionDate: "11-dekabr",
    notes: "Veb-sayt va SEO kerak",
    createdAt: "2024-12-07",
    priority: "low",
  },
  {
    id: 6,
    name: "Shohruh Toshmatov",
    company: "BuildMax",
    email: "shohruh@buildmax.uz",
    phone: "+998 97 678 90 12",
    status: "won",
    value: "80,000,000",
    source: "Tavsiya",
    assignedTo: "Nilufar Azimova",
    lastContact: "1 hafta oldin",
    nextAction: "Shartnoma imzolash",
    nextActionDate: "Bajarildi",
    notes: "1 yillik shartnoma imzolandi",
    createdAt: "2024-11-15",
    priority: "high",
  },
]

const pipelineStages = [
  { id: "new", label: "Yangi", color: "bg-slate-500", count: 1 },
  { id: "contacted", label: "Bog'lanildi", color: "bg-blue-500", count: 1 },
  { id: "qualified", label: "Malakali", color: "bg-cyan-500", count: 1 },
  { id: "proposal", label: "Taklif", color: "bg-amber-500", count: 1 },
  { id: "negotiation", label: "Muzokara", color: "bg-purple-500", count: 1 },
  { id: "won", label: "Yutildi", color: "bg-emerald-500", count: 1 },
  { id: "lost", label: "Yo'qotildi", color: "bg-red-500", count: 0 },
]

const activities = [
  {
    type: "call",
    user: "Sardor Aliyev",
    action: "Aziz Rahimov bilan gaplashdi",
    time: "2 soat oldin",
    icon: PhoneCall,
  },
  {
    type: "email",
    user: "Nilufar Azimova",
    action: "Malika Karimovaga taklif yubordi",
    time: "4 soat oldin",
    icon: Mail,
  },
  { type: "meeting", user: "Sardor Aliyev", action: "Bobur Yusupov bilan uchrashuv", time: "Kecha", icon: Video },
  {
    type: "note",
    user: "Nilufar Azimova",
    action: "Dilnoza Saidova haqida eslatma qo'shdi",
    time: "Kecha",
    icon: FileText,
  },
]

export function CRMSection() {
  const [viewMode, setViewMode] = useState<"pipeline" | "list">("pipeline")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)


  const getStatusColor = (status: Lead["status"]) => {
    const colors = {
      new: "bg-slate-500/20 text-slate-400 border-slate-500/30",
      contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      qualified: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      proposal: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      negotiation: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      won: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      lost: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return colors[status]
  }

  const getPriorityColor = (priority: Lead["priority"]) => {
    const colors = {
      low: "text-slate-400",
      medium: "text-amber-400",
      high: "text-red-400",
    }
    return colors[priority]
  }

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const stats = [
    {
      label: "Jami lidlar",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: Target,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Konversiya",
      value: "24%",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Pipeline qiymati",
      value: "320M",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "from-amber-500 to-amber-600",
    },
    {
      label: "Yutilgan",
      value: "12",
      change: "+2",
      trend: "up",
      icon: CheckCircle2,
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">CRM</h1>
          <p className="mt-1 text-muted-foreground">Mijozlar bilan munosabatlarni boshqaring</p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi lid
        </Button>
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
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  stat.trend === "up" ? "text-emerald-400" : "text-red-400",
                )}
              >
                {stat.trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "pipeline" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("pipeline")}
            className="gap-2"
          >
            <Briefcase className="h-4 w-4" />
            Pipeline
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Ro'yxat
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Lid qidirish..."
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

      {/* Pipeline View */}
      {viewMode === "pipeline" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {pipelineStages.map((stage) => {
              const stageLeads = filteredLeads.filter((lead) => lead.status === stage.id)
              const totalValue = stageLeads.reduce(
                (sum, lead) => sum + Number.parseInt(lead.value.replace(/,/g, "")),
                0,
              )

              return (
                <div key={stage.id} className="w-72 flex-shrink-0">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-3 w-3 rounded-full", stage.color)} />
                      <span className="font-semibold text-foreground">{stage.label}</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {stageLeads.length}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{(totalValue / 1000000).toFixed(0)}M so'm</span>
                  </div>
                  <div className="space-y-3 min-h-[400px] rounded-xl bg-muted/20 p-2">
                    {stageLeads.map((lead) => <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedLead(lead)
                        }
                      }}
                      className="cursor-pointer rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:shadow-lg hover:border-primary/30"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-xs font-bold text-white">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.company}</p>
                          </div>
                        </div>
                        <Star className={cn("h-4 w-4", getPriorityColor(lead.priority))} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-emerald-400">{lead.value} so'm</span>
                        <span className="text-xs text-muted-foreground">{lead.lastContact}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{lead.nextAction}</span>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Lid</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Kompaniya</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Holat</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Qiymat</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Mas'ul</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Keyingi qadam</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-white">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{lead.company}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn("rounded-full border px-3 py-1 text-xs font-medium", getStatusColor(lead.status))}
                    >
                      {pipelineStages.find((s) => s.id === lead.status)?.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-emerald-400">{lead.value}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-foreground">{lead.assignedTo}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{lead.nextActionDate}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recent Activities */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
          <h3 className="font-semibold text-foreground mb-4">So'nggi faoliyatlar</h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-xl">
          <h3 className="font-semibold text-foreground mb-4">Tezkor amallar</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <PhoneCall className="h-4 w-4 text-blue-400" />
              Qo'ng'iroq qilish
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <Mail className="h-4 w-4 text-emerald-400" />
              Email yuborish
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <Video className="h-4 w-4 text-purple-400" />
              Uchrashuv rejalashtirish
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <FileText className="h-4 w-4 text-amber-400" />
              Taklif yaratish
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <MessageSquare className="h-4 w-4 text-cyan-400" />
              Eslatma qo'shish
            </Button>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/70 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-xl font-bold text-white">
                    {selectedLead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedLead.name}</h2>
                    <p className="text-white/80">{selectedLead.company}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedLead(null)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground mb-1">Qiymat</p>
                  <p className="text-xl font-bold text-emerald-400">{selectedLead.value} so'm</p>
                </div>
                <div className="rounded-xl bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground mb-1">Holat</p>
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium",
                      getStatusColor(selectedLead.status),
                    )}
                  >
                    {pipelineStages.find((s) => s.id === selectedLead.status)?.label}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedLead.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedLead.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Mas'ul: {selectedLead.assignedTo}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    Keyingi: {selectedLead.nextAction} - {selectedLead.nextActionDate}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground mb-2">Eslatmalar</p>
                <p className="text-sm text-foreground">{selectedLead.notes}</p>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 gap-2">
                  <PhoneCall className="h-4 w-4" />
                  Qo'ng'iroq
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <FileText className="h-4 w-4" />
                  Taklif
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
