"use client"

import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Calendar,
  DollarSign,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  PlayCircle,
  FolderKanban,
  Briefcase,
  Megaphone,
  Scale,
  Newspaper,
  Palette,
  ArrowUpRight,
  X,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

// Loyiha turlari - turli sohalar uchun
const projectTypes = [
  { id: "marketing", label: "Marketing kampaniya", icon: Megaphone, color: "bg-chart-1" },
  { id: "legal", label: "Yuridik ish", icon: Scale, color: "bg-chart-2" },
  { id: "media", label: "Media loyiha", icon: Newspaper, color: "bg-chart-3" },
  { id: "design", label: "Dizayn loyiha", icon: Palette, color: "bg-chart-4" },
  { id: "business", label: "Biznes loyiha", icon: Briefcase, color: "bg-primary" },
]

const projects = [
  {
    id: 1,
    name: "Yangi mahsulot kampaniyasi",
    type: "marketing",
    client: "TechCorp LLC",
    status: "active",
    progress: 65,
    budget: 25000000,
    spent: 16250000,
    deadline: "2024-12-25",
    team: ["AK", "BT", "SM", "NK"],
    tasks: { total: 24, completed: 16 },
    priority: "high",
  },
  {
    id: 2,
    name: "Shartnoma tuzish",
    type: "legal",
    client: "Global Trade",
    status: "active",
    progress: 80,
    budget: 5000000,
    spent: 4000000,
    deadline: "2024-12-15",
    team: ["YK", "AT"],
    tasks: { total: 8, completed: 6 },
    priority: "high",
  },
  {
    id: 3,
    name: "Korporativ video",
    type: "media",
    client: "Mega Bank",
    status: "review",
    progress: 90,
    budget: 15000000,
    spent: 13500000,
    deadline: "2024-12-12",
    team: ["MR", "KL", "OP"],
    tasks: { total: 12, completed: 11 },
    priority: "medium",
  },
  {
    id: 4,
    name: "Brend dizayni",
    type: "design",
    client: "StartUp Inc",
    status: "active",
    progress: 45,
    budget: 8000000,
    spent: 3600000,
    deadline: "2024-12-30",
    team: ["DS", "NK"],
    tasks: { total: 18, completed: 8 },
    priority: "medium",
  },
  {
    id: 5,
    name: "Biznes strategiya",
    type: "business",
    client: "Local Market",
    status: "paused",
    progress: 30,
    budget: 12000000,
    spent: 3600000,
    deadline: "2025-01-15",
    team: ["AK", "BT"],
    tasks: { total: 15, completed: 5 },
    priority: "low",
  },
  {
    id: 6,
    name: "Sud jarayoni",
    type: "legal",
    client: "Private Client",
    status: "active",
    progress: 55,
    budget: 20000000,
    spent: 11000000,
    deadline: "2025-02-01",
    team: ["YK", "AT", "MN"],
    tasks: { total: 20, completed: 11 },
    priority: "high",
  },
]

const statusConfig = {
  active: { label: "Faol", icon: PlayCircle, color: "text-chart-2 bg-chart-2/10" },
  paused: { label: "To'xtatilgan", icon: PauseCircle, color: "text-chart-5 bg-chart-5/10" },
  review: { label: "Tekshiruvda", icon: AlertCircle, color: "text-chart-4 bg-chart-4/10" },
  completed: { label: "Tugallangan", icon: CheckCircle2, color: "text-primary bg-primary/10" },
}

export function ProjectsSection() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState("all")
  const [showNewProject, setShowNewProject] = useState(false)

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm"
  }

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.type === filter)

  const stats = [
    { label: "Jami loyihalar", value: projects.length, icon: FolderKanban, color: "from-primary/20 to-primary/5" },
    {
      label: "Faol loyihalar",
      value: projects.filter((p) => p.status === "active").length,
      icon: PlayCircle,
      color: "from-chart-2/20 to-chart-2/5",
    },
    {
      label: "Umumiy byudjet",
      value: formatMoney(projects.reduce((a, b) => a + b.budget, 0)),
      icon: DollarSign,
      color: "from-chart-4/20 to-chart-4/5",
      isLarge: true,
    },
    {
      label: "Sarflangan",
      value: formatMoney(projects.reduce((a, b) => a + b.spent, 0)),
      icon: ArrowUpRight,
      color: "from-chart-1/20 to-chart-1/5",
      isLarge: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Loyihalar</h1>
          <p className="mt-1 text-muted-foreground">Barcha loyihalarni boshqaring va kuzating</p>
        </div>
        <Button
          onClick={() => setShowNewProject(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi loyiha
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${stat.color} p-5 backdrop-blur-xl`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`mt-1 font-bold text-foreground ${stat.isLarge ? "text-lg" : "text-2xl"}`}>
                  {stat.value}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/50">
                <stat.icon className="h-6 w-6 text-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="whitespace-nowrap"
          >
            Barchasi
          </Button>
          {projectTypes.map((type) => (
            <Button
              key={type.id}
              variant={filter === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type.id)}
              className="whitespace-nowrap gap-2"
            >
              <type.icon className="h-4 w-4" />
              {type.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Loyiha qidirish..."
              className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex items-center rounded-lg border border-border p-1">
            <button
              onClick={() => setView("grid")}
              className={`rounded-md p-1.5 ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-md p-1.5 ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={view === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
        {filteredProjects.map((project) => {
          const typeConfig = projectTypes.find((t) => t.id === project.type)!
          const status = statusConfig[project.status as keyof typeof statusConfig]

          return view === "grid" ? (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
            >
              <div className={`h-1.5 w-full ${typeConfig.color}`} />
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${typeConfig.color}`}>
                      <typeConfig.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{project.client}</p>
                    </div>
                  </div>
                  <button className="rounded-lg p-1.5 hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Status & Priority */}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}
                  >
                    <status.icon className="h-3.5 w-3.5" />
                    {status.label}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${project.priority === "high"
                        ? "bg-destructive/10 text-destructive"
                        : project.priority === "medium"
                          ? "bg-chart-4/10 text-chart-4"
                          : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {project.priority === "high" ? "Yuqori" : project.priority === "medium" ? "O'rta" : "Past"}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Jarayon</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${typeConfig.color}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.deadline).toLocaleDateString("uz-UZ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {project.tasks.completed}/{project.tasks.total} vazifa
                    </span>
                  </div>
                </div>

                {/* Budget */}
                <div className="rounded-xl bg-muted/50 p-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Byudjet</span>
                    <span className="font-medium text-foreground">{formatMoney(project.budget)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Sarflangan</span>
                    <span className="font-medium text-chart-4">{formatMoney(project.spent)}</span>
                  </div>
                </div>

                {/* Team */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 4).map((member, i) => (
                      <div
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-gradient-to-br from-primary to-primary/70 text-xs font-medium text-primary-foreground"
                      >
                        {member}
                      </div>
                    ))}
                    {project.team.length > 4 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium">
                        +{project.team.length - 4}
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Ochish
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={project.id}
              className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl transition-all hover:shadow-lg hover:border-primary/30"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${typeConfig.color}`}>
                <typeConfig.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.client}</p>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">{project.progress}%</p>
                  <p className="text-xs text-muted-foreground">Jarayon</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">{formatMoney(project.budget)}</p>
                  <p className="text-xs text-muted-foreground">Byudjet</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}
                >
                  <status.icon className="h-3.5 w-3.5" />
                  {status.label}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Yangi loyiha</h2>
              <button onClick={() => setShowNewProject(false)} className="rounded-lg p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="project-name" className="text-sm font-medium text-foreground">Loyiha nomi</label>
                <input id="project-name" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Loyiha turi</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      className="flex items-center gap-2 rounded-lg border border-border p-3 hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${type.color}`}>
                        <type.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="project-client" className="text-sm font-medium text-foreground">Mijoz</label>
                <input id="project-client" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="project-budget" className="text-sm font-medium text-foreground">Byudjet</label>
                  <input
                    id="project-budget"
                    type="number"
                    className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="project-deadline" className="text-sm font-medium text-foreground">Muddat</label>
                  <input
                    id="project-deadline"
                    type="date"
                    className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => setShowNewProject(false)}>
                Loyihani yaratish
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
