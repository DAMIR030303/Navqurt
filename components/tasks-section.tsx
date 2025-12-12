"use client"

import {
  Plus,
  Search,
  Filter,
  Calendar,
  Flag,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  AlertCircle,
  Timer,
  ListTodo,
  LayoutGrid,
  ChevronDown,
  Paperclip,
  MessageSquare,
  Trash2,
  Edit3,
  Eye,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type TaskStatus = "completed" | "in-progress" | "pending" | "overdue"
type TaskPriority = "high" | "medium" | "low"

interface Task {
  id: string
  title: string
  description: string
  assignee: {
    name: string
    avatar: string
    initials: string
  }
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  category: string
  attachments: number
  comments: number
  progress: number
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Yangi xodimlar uchun trening dasturi",
    description: "IT bo'limi uchun 5 kunlik trening dasturini tuzish",
    assignee: { name: "Dilnoza Azimova", avatar: "", initials: "DA" },
    status: "in-progress",
    priority: "high",
    dueDate: "2024-12-12",
    category: "HR",
    attachments: 3,
    comments: 8,
    progress: 65,
  },
  {
    id: "2",
    title: "Oylik hisobotni tayyorlash",
    description: "Dekabr oyi uchun moliyaviy hisobotni tayyorlash",
    assignee: { name: "Jahongir Usmonov", avatar: "", initials: "JU" },
    status: "pending",
    priority: "high",
    dueDate: "2024-12-15",
    category: "Moliya",
    attachments: 1,
    comments: 2,
    progress: 0,
  },
  {
    id: "3",
    title: "Mijozlar bilan uchrashuv",
    description: "TechCorp kompaniyasi bilan shartnoma muhokamasi",
    assignee: { name: "Nodira Karimova", avatar: "", initials: "NK" },
    status: "completed",
    priority: "medium",
    dueDate: "2024-12-08",
    category: "Savdo",
    attachments: 5,
    comments: 12,
    progress: 100,
  },
  {
    id: "4",
    title: "Server xavfsizligini yangilash",
    description: "Barcha serverlar uchun xavfsizlik yangilanishlarini o'rnatish",
    assignee: { name: "Bobur Rahimov", avatar: "", initials: "BR" },
    status: "overdue",
    priority: "high",
    dueDate: "2024-12-05",
    category: "IT",
    attachments: 2,
    comments: 15,
    progress: 40,
  },
  {
    id: "5",
    title: "Marketing kampaniyasi",
    description: "Yangi yil uchun marketing strategiyasini ishlab chiqish",
    assignee: { name: "Malika Saidova", avatar: "", initials: "MS" },
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-12-20",
    category: "Marketing",
    attachments: 7,
    comments: 5,
    progress: 35,
  },
  {
    id: "6",
    title: "Ofis jihozlarini sotib olish",
    description: "Yangi kompyuterlar va stol-stullar uchun buyurtma",
    assignee: { name: "Sardor Aliyev", avatar: "", initials: "SA" },
    status: "pending",
    priority: "low",
    dueDate: "2024-12-25",
    category: "Xaridlar",
    attachments: 0,
    comments: 3,
    progress: 0,
  },
]

const statusConfig = {
  completed: {
    label: "Bajarildi",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    borderColor: "border-chart-2/30",
    icon: CheckCircle2,
  },
  "in-progress": {
    label: "Jarayonda",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    icon: Timer,
  },
  pending: {
    label: "Kutilmoqda",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/30",
    icon: Circle,
  },
  overdue: {
    label: "Muddati o'tgan",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    icon: AlertCircle,
  },
}

const priorityConfig = {
  high: { label: "Yuqori", color: "text-destructive", bgColor: "bg-destructive/10" },
  medium: { label: "O'rta", color: "text-chart-4", bgColor: "bg-chart-4/10" },
  low: { label: "Past", color: "text-chart-2", bgColor: "bg-chart-2/10" },
}

const stats = [
  { label: "Jami vazifalar", value: "48", icon: ListTodo, color: "from-primary to-primary/70" },
  { label: "Bajarilgan", value: "32", icon: CheckCircle2, color: "from-chart-2 to-chart-2/70" },
  { label: "Jarayonda", value: "12", icon: Timer, color: "from-chart-4 to-chart-4/70" },
  { label: "Muddati o'tgan", value: "4", icon: AlertCircle, color: "from-destructive to-destructive/70" },
]

export function TasksSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"board" | "list">("board")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const groupedTasks = {
    pending: filteredTasks.filter((t) => t.status === "pending"),
    "in-progress": filteredTasks.filter((t) => t.status === "in-progress"),
    completed: filteredTasks.filter((t) => t.status === "completed"),
    overdue: filteredTasks.filter((t) => t.status === "overdue"),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Vazifalar</h1>
          <p className="mt-1 text-muted-foreground">Barcha vazifalarni boshqarish va kuzatish</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
          <Plus className="h-4 w-4" />
          Yangi vazifa
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                  stat.color,
                )}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Vazifa qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border/50 bg-background/50">
                <Filter className="h-4 w-4" />
                Holat
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>Barchasi</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Kutilmoqda</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("in-progress")}>Jarayonda</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("completed")}>Bajarildi</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("overdue")}>Muddati o'tgan</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border/50 bg-background/50">
                <Flag className="h-4 w-4" />
                Muhimlik
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setFilterPriority("all")}>Barchasi</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterPriority("high")}>Yuqori</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority("medium")}>O'rta</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority("low")}>Past</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 p-1">
          <Button
            variant={viewMode === "board" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("board")}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            Doska
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2"
          >
            <ListTodo className="h-4 w-4" />
            Ro'yxat
          </Button>
        </div>
      </div>

      {/* Board View */}
      {viewMode === "board" && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {(["pending", "in-progress", "completed", "overdue"] as TaskStatus[]).map((status) => {
            const config = statusConfig[status]
            const StatusIcon = config.icon
            return (
              <div key={status} className="space-y-3">
                {/* Column Header */}
                <div
                  className={cn("flex items-center gap-2 rounded-xl border p-3", config.bgColor, config.borderColor)}
                >
                  <StatusIcon className={cn("h-5 w-5", config.color)} />
                  <span className={cn("font-semibold", config.color)}>{config.label}</span>
                  <span
                    className={cn("ml-auto rounded-full px-2 py-0.5 text-xs font-medium", config.bgColor, config.color)}
                  >
                    {groupedTasks[status].length}
                  </span>
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                  {groupedTasks[status].map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {groupedTasks[status].length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-8 text-center">
                      <Circle className="h-8 w-8 text-muted-foreground/30" />
                      <p className="mt-2 text-sm text-muted-foreground">Vazifa yo'q</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Vazifa
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Mas'ul
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Holat
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Muhimlik
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Muddat
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Jarayon
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredTasks.map((task) => {
                  const statusConf = statusConfig[task.status]
                  const priorityConf = priorityConfig[task.priority]
                  const StatusIcon = statusConf.icon
                  return (
                    <tr key={task.id} className="group transition-colors hover:bg-muted/20">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn("flex h-8 w-8 items-center justify-center rounded-lg", statusConf.bgColor)}
                          >
                            <StatusIcon className={cn("h-4 w-4", statusConf.color)} />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{task.title}</p>
                            <p className="text-xs text-muted-foreground">{task.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-xs font-medium text-primary-foreground">
                            {task.assignee.initials}
                          </div>
                          <span className="text-sm text-foreground">{task.assignee.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                            statusConf.bgColor,
                            statusConf.color,
                          )}
                        >
                          {statusConf.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                            priorityConf.bgColor,
                            priorityConf.color,
                          )}
                        >
                          <Flag className="h-3 w-3" />
                          {priorityConf.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(task.dueDate).toLocaleDateString("uz-UZ")}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all",
                                task.progress === 100 ? "bg-chart-2" : "bg-primary",
                              )}
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{task.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function TaskCard({ task }: { task: Task }) {
  const priorityConf = priorityConfig[task.priority]

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/10 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium",
              priorityConf.bgColor,
              priorityConf.color,
            )}
          >
            <Flag className="h-3 w-3" />
            {priorityConf.label}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Ko'rish
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit3 className="mr-2 h-4 w-4" />
                Tahrirlash
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                O'chirish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2">{task.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{task.description}</p>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Jarayon</span>
            <span className="font-medium text-foreground">{task.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full transition-all", task.progress === 100 ? "bg-chart-2" : "bg-primary")}
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>

        {/* Category Badge */}
        <div className="inline-flex items-center gap-1 rounded-md bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
          {task.category}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/50 pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-[10px] font-medium text-primary-foreground">
              {task.assignee.initials}
            </div>
            <span className="text-xs text-muted-foreground">{task.assignee.name.split(" ")[0]}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1 text-xs">
              <Paperclip className="h-3.5 w-3.5" />
              {task.attachments}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3.5 w-3.5" />
              {task.comments}
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div
          className={cn(
            "flex items-center gap-1.5 text-xs",
            task.status === "overdue" ? "text-destructive" : "text-muted-foreground",
          )}
        >
          <Calendar className="h-3.5 w-3.5" />
          {new Date(task.dueDate).toLocaleDateString("uz-UZ")}
          {task.status === "overdue" && <AlertCircle className="h-3.5 w-3.5" />}
        </div>
      </div>
    </div>
  )
}
