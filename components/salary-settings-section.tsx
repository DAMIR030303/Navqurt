"use client"

import {
  DollarSign,
  Percent,
  Settings,
  Plus,
} from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { logger } from "@/lib/logger"

interface SalarySetting {
  id: number
  position_id: number
  base_salary: number
  kpi_percentage: number
  bonus_rules_json: string
  penalty_rules_json: string
}

export function SalarySettingsSection() {
  const [settingsList, setSettingsList] = useState<SalarySetting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/salary-settings')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.error) {
          logger.error("Error fetching salary settings", result.error, { source: "salary-settings-section" })
          setSettingsList([])
        } else if (result.salary_settings && result.salary_settings.length > 0) {
          setSettingsList(result.salary_settings)
        } else {
          setSettingsList([])
        }
      } catch (err) {
        logger.error("Unexpected error while fetching salary settings", err, { source: "salary-settings-section" })
        setSettingsList([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Maosh Sozlamalari</h1>
          <p className="mt-1 text-muted-foreground">Lavozimlar bo'yicha maosh va bonus sozlamalarini boshqaring</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi sozlama
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            label: "O'rtacha asosiy maosh",
            value: "5 000 000",
            unit: "so'm",
            icon: DollarSign,
            color: "from-primary to-primary/70",
          },
          {
            label: "O'rtacha KPI foizi",
            value: "15",
            unit: "%",
            icon: Percent,
            color: "from-chart-2 to-chart-2/70",
          },
          {
            label: "Sozlamalar soni",
            value: settingsList.length.toString(),
            unit: "ta",
            icon: Settings,
            color: "from-chart-4 to-chart-4/70",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-foreground">
                  {stat.value} <span className="text-lg text-muted-foreground">{stat.unit}</span>
                </p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/50">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Sozlamalar yuklanmoqda...</p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <p className="text-sm text-muted-foreground">
              Maosh sozlamalari tizimi hozircha ishlab chiqilmoqda. Tez orada to'liq funksionallik qo'shiladi.
            </p>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Yangi maosh sozlama</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Bu funksiya hozircha ishlab chiqilmoqda. Tez orada qo'shiladi.
            </p>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="w-full">
              Yopish
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

