"use client"

import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Briefcase,
  Users,
  Building2,
  Edit,
  Trash2,
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

interface Position {
  id: number
  company_id: number
  name: string
  description: string
  department: string
  max_employees: number
  created_at: string
  updated_at: string
}

const departments = [
  "Barcha bo'limlar",
  "IT bo'limi",
  "Dizayn bo'limi",
  "HR bo'limi",
  "Marketing",
  "Moliya",
  "Boshqaruv",
  "Sotuvlar",
  "Kreativ",
]

export function PositionsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("Barcha bo'limlar")
  const [positionsList, setPositionsList] = useState<Position[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage] = useState(1) // setCurrentPage kelajakda pagination uchun ishlatiladi
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Fetch positions from API
  useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/positions?company_id=1&page=${currentPage}&page_size=20&search=${searchQuery}&department=${selectedDepartment !== "Barcha bo'limlar" ? selectedDepartment : ''}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.error) {
          logger.error("Error fetching positions", result.error, { source: "positions-section" })
          setPositionsList([])
        } else if (result.positions && result.positions.length > 0) {
          setPositionsList(result.positions)
        } else {
          setPositionsList([])
        }
      } catch (err) {
        logger.error("Unexpected error while fetching positions", err, { source: "positions-section" })
        setPositionsList([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPositions()
  }, [currentPage, searchQuery, selectedDepartment])

  const handleAddPosition = async (newPosition: Partial<Position>) => {
    try {
      const response = await fetch('/api/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: 1,
          name: newPosition.name,
          description: newPosition.description,
          department: newPosition.department,
          max_employees: newPosition.max_employees || 1,
        }),
      })

      if (response.ok) {
        const created = await response.json()
        setPositionsList((prev) => [created, ...prev])
        setIsAddModalOpen(false)
      }
    } catch (err) {
      logger.error("Failed to create position", err, { source: "positions-section" })
    }
  }

  const filteredPositions = positionsList.filter((pos) => {
    const matchesSearch = pos.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pos.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "Barcha bo'limlar" || pos.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Lavozimlar</h1>
          <p className="mt-1 text-muted-foreground">Korxonadagi barcha lavozimlarni boshqaring</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi lavozim
        </Button>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Lavozim izlash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border/50 bg-background/50">
                <Filter className="h-4 w-4" />
                {selectedDepartment}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {departments.map((dept) => (
                <DropdownMenuItem key={dept} onClick={() => setSelectedDepartment(dept)}>
                  {dept}
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
            <p className="text-sm text-muted-foreground">Lavozimlar yuklanmoqda...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPositions.map((position) => (
            <div
              key={position.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary via-chart-4 to-chart-2" />

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 font-bold text-white shadow-lg">
                      <Briefcase className="h-6 w-6" />
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
                  <h3 className="font-semibold text-foreground">{position.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{position.description || "Tavsif yo'q"}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" />
                      {position.department || "Bo'limsiz"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      Max: {position.max_employees}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredPositions.length === 0 && !isLoading && (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/50">
          <div className="flex flex-col items-center gap-2">
            <Briefcase className="h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Lavozimlar topilmadi</p>
          </div>
        </div>
      )}

      {/* Simple Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Yangi lavozim qo'shish</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleAddPosition({
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                  department: formData.get('department') as string,
                  max_employees: parseInt(formData.get('max_employees') as string) || 1,
                })
              }}
              className="space-y-4"
            >
              <Input name="name" placeholder="Lavozim nomi" required />
              <Input name="description" placeholder="Tavsif" />
              <Input name="department" placeholder="Bo'lim" />
              <Input name="max_employees" type="number" placeholder="Max xodimlar soni" defaultValue="1" />
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

