"use client"

import {
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Target,
} from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { logger } from "@/lib/logger"
import { cn } from "@/lib/utils"

interface DailyTask {
  id: number
  position_id: number
  name: string
  description: string
  frequency: string
  priority: string
  kpi_weight: number
  created_at: string
  updated_at: string
}

const frequencies = {
  daily: "Kundalik",
  weekly: "Haftalik",
  monthly: "Oylik",
  as_needed: "Kerak bo'lganda",
}

const priorities = {
  high: "Yuqori",
  medium: "O'rtacha",
  low: "Past",
}

const priorityColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
}

export function DailyTasksSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFrequency, setSelectedFrequency] = useState("Barchasi")
  const [tasksList, setTasksList] = useState<DailyTask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/tasks?page=1&page_size=100&frequency=${selectedFrequency !== "Barchasi" ? selectedFrequency : ''}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.error) {
          logger.error("Error fetching tasks", result.error, { source: "daily-tasks-section" })
          setTasksList([])
        } else if (result.tasks && result.tasks.length > 0) {
          setTasksList(result.tasks)
        } else {
          setTasksList([])
        }
      } catch (err) {
        logger.error("Unexpected error while fetching tasks", err, { source: "daily-tasks-section" })
        setTasksList([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [selectedFrequency])

  const handleAddTask = async (newTask: Partial<DailyTask>) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          position_id: newTask.position_id,
          name: newTask.name,
          description: newTask.description,
          frequency: newTask.frequency || 'daily',
          priority: newTask.priority || 'medium',
          kpi_weight: newTask.kpi_weight || 0,
        }),
      })

      if (response.ok) {
        const created = await response.json()
        setTasksList((prev) => [created, ...prev])
        setIsAddModalOpen(false)
      }
    } catch (err) {
      logger.error("Failed to create task", err, { source: "daily-tasks-section" })
    }
  }

  const filteredTasks = tasksList.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    const matchesFrequency = selectedFrequency === "Barchasi" || task.frequency === selectedFrequency.toLowerCase()
    return matchesSearch && matchesFrequency
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Kundalik Vazifalar</h1>
          <p className="mt-1 text-muted-foreground">Har bir lavozim uchun kundalik vazifalarni boshqaring</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi vazifa
        </Button>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Vazifa izlash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border/50 bg-background/50">
                <Filter className="h-4 w-4" />
                {selectedFrequency}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {["Barchasi", ...Object.values(frequencies)].map((freq) => (
                <DropdownMenuItem key={freq} onClick={() => setSelectedFrequency(freq)}>
                  {freq}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/50">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Vazifalar yuklanmoqda...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary via-chart-4 to-chart-2" />

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 font-bold text-white shadow-lg">
                      <Target className="h-6 w-6" />
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Tahrirlash
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        O'chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-foreground">{task.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description || "Tavsif yo'q"}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.medium
                    )}>
                      {priorities[task.priority as keyof typeof priorities] || task.priority}
                    </span>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
                      {frequencies[task.frequency as keyof typeof frequencies] || task.frequency}
                    </span>
                    {task.kpi_weight > 0 && (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-primary/20 text-primary">
                        KPI: {task.kpi_weight}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredTasks.length === 0 && !isLoading && (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/50">
          <div className="flex flex-col items-center gap-2">
            <Target className="h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Vazifalar topilmadi</p>
          </div>
        </div>
      )}

      {/* Simple Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Yangi vazifa qo'shish</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleAddTask({
                  position_id: parseInt(formData.get('position_id') as string),
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                  frequency: formData.get('frequency') as string,
                  priority: formData.get('priority') as string,
                  kpi_weight: parseFloat(formData.get('kpi_weight') as string) || 0,
                })
              }}
              className="space-y-4"
            >
              <Input name="position_id" type="number" placeholder="Lavozim ID" required />
              <Input name="name" placeholder="Vazifa nomi" required />
              <Input name="description" placeholder="Tavsif" />
              <select name="frequency" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                <option value="daily">Kundalik</option>
                <option value="weekly">Haftalik</option>
                <option value="monthly">Oylik</option>
                <option value="as_needed">Kerak bo'lganda</option>
              </select>
              <select name="priority" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                <option value="high">Yuqori</option>
                <option value="medium">O'rtacha</option>
                <option value="low">Past</option>
              </select>
              <Input name="kpi_weight" type="number" step="0.1" placeholder="KPI vazni (%)" defaultValue="0" />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Qo'shish</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Bekor qilish</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

