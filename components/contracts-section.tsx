"use client"

import {
  Search,
  Plus,
  FileText,
  Calendar,
  User,
  Briefcase,
  Clock,
  MoreHorizontal,
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
import { cn } from "@/lib/utils"

interface Contract {
  id: number
  employee_id: number
  position_id: number
  contract_type: string
  start_date: string
  end_date: string | null
  probation_period_days: number
  terms_json: string
  created_at: string
  updated_at: string
}

const contractTypes = {
  full_time: "To'liq stavka",
  part_time: "Yarim stavka",
  contractor: "Shartnoma asosida",
  intern: "Stajyor",
}

export function ContractsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contractsList, setContractsList] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    const fetchContracts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/contracts?page=1&page_size=100')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.error) {
          logger.error("Error fetching contracts", result.error, { source: "contracts-section" })
          setContractsList([])
        } else if (result.contracts && result.contracts.length > 0) {
          setContractsList(result.contracts)
        } else {
          setContractsList([])
        }
      } catch (err) {
        logger.error("Unexpected error while fetching contracts", err, { source: "contracts-section" })
        setContractsList([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchContracts()
  }, [])

  const handleAddContract = async (newContract: Partial<Contract>) => {
    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: newContract.employee_id,
          position_id: newContract.position_id,
          contract_type: newContract.contract_type || 'full_time',
          start_date: newContract.start_date,
          end_date: newContract.end_date || '',
          probation_period_days: newContract.probation_period_days || 0,
          terms_json: newContract.terms_json || '{}',
        }),
      })

      if (response.ok) {
        const created = await response.json()
        setContractsList((prev) => [created, ...prev])
        setIsAddModalOpen(false)
      }
    } catch (err) {
      logger.error("Failed to create contract", err, { source: "contracts-section" })
    }
  }

  const filteredContracts = contractsList.filter((contract) => {
    return contract.contract_type.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Shartnomalar</h1>
          <p className="mt-1 text-muted-foreground">Ish shartnomalarini boshqaring</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi shartnoma
        </Button>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Shartnoma izlash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/50">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Shartnomalar yuklanmoqda...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContracts.map((contract) => (
            <div
              key={contract.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary via-chart-4 to-chart-2" />

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 font-bold text-white shadow-lg">
                      <FileText className="h-6 w-6" />
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
                  <h3 className="font-semibold text-foreground">
                    {contractTypes[contract.contract_type as keyof typeof contractTypes] || contract.contract_type}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      Xodim ID: {contract.employee_id}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" />
                      Lavozim ID: {contract.position_id}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {contract.start_date}
                    </div>
                    {contract.probation_period_days > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        Sinov muddati: {contract.probation_period_days} kun
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredContracts.length === 0 && !isLoading && (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/50">
          <div className="flex flex-col items-center gap-2">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Shartnomalar topilmadi</p>
          </div>
        </div>
      )}

      {/* Simple Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Yangi shartnoma yaratish</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleAddContract({
                  employee_id: parseInt(formData.get('employee_id') as string),
                  position_id: parseInt(formData.get('position_id') as string),
                  contract_type: formData.get('contract_type') as string,
                  start_date: formData.get('start_date') as string,
                  end_date: formData.get('end_date') as string || '',
                  probation_period_days: parseInt(formData.get('probation_period_days') as string) || 0,
                  terms_json: '{}',
                })
              }}
              className="space-y-4"
            >
              <Input name="employee_id" type="number" placeholder="Xodim ID" required />
              <Input name="position_id" type="number" placeholder="Lavozim ID" required />
              <select name="contract_type" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                <option value="full_time">To'liq stavka</option>
                <option value="part_time">Yarim stavka</option>
                <option value="contractor">Shartnoma asosida</option>
                <option value="intern">Stajyor</option>
              </select>
              <Input name="start_date" type="date" placeholder="Boshlanish sanasi" required />
              <Input name="end_date" type="date" placeholder="Tugash sanasi (ixtiyoriy)" />
              <Input name="probation_period_days" type="number" placeholder="Sinov muddati (kun)" defaultValue="0" />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Yaratish</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Bekor qilish</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

