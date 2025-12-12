"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { AttendanceSection } from "@/components/attendance-section"
import { ContractsSection } from "@/components/contracts-section"
import { DailyTasksSection } from "@/components/daily-tasks-section"
import { EmployeesSection } from "@/components/employees-section"
import { FinanceSection } from "@/components/finance-section"
import { Header } from "@/components/header"
import { KPIManagementSection } from "@/components/kpi-management-section"
import { LoginPage } from "@/components/login-page"
import { PositionsSection } from "@/components/positions-section"
import { SalarySettingsSection } from "@/components/salary-settings-section"

interface User {
  id: number
  email: string
  name: string
  role: string
  company_id: number
}

const NAVOIYDA_BUGUN_COMPANY_ID = 1 // "Navoiyda Bugun" kanali company_id

// Helper function to get initial state from localStorage
function getInitialState() {
  if (typeof window === 'undefined') {
    return {
      isDark: true,
      isAuthenticated: false,
      user: null,
    }
  }
  
  const savedTheme = localStorage.getItem("theme")
  const savedAuth = localStorage.getItem("isAuthenticated")
  const savedUser = localStorage.getItem("user")
  
  let user: User | null = null
  if (savedUser) {
    try {
      user = JSON.parse(savedUser)
    } catch {
      // Ignore parse errors
    }
  }
  
  return {
    isDark: savedTheme ? savedTheme === "dark" : true,
    isAuthenticated: savedAuth === "true",
    user,
  }
}

export default function NavoiydaBugunDashboard() {
  const router = useRouter()
  const initialState = getInitialState()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDark, setIsDark] = useState(initialState.isDark)
  const [activePage, setActivePage] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(initialState.user)

  useEffect(() => {
    // Check authentication and company
    if (typeof window !== 'undefined') {
      if (user && user.company_id !== NAVOIYDA_BUGUN_COMPANY_ID) {
        // Redirect to main dashboard if not Navoiyda Bugun user
        router.push('/')
        return
      }
      
      setIsLoading(false)
    }
  }, [router, user])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle("dark", isDark)
      localStorage.setItem("theme", isDark ? "dark" : "light")
    }
  }, [isDark])

  const handleLogin = () => {
    // After login, check company_id and redirect accordingly
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          if (userData.company_id === NAVOIYDA_BUGUN_COMPANY_ID) {
            setIsAuthenticated(true)
            setUser(userData)
            localStorage.setItem("isAuthenticated", "true")
          } else {
            // Redirect to main dashboard
            router.push('/')
          }
        } catch (err) {
          console.error('Failed to parse user data', err)
        }
      }
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("user")
      localStorage.removeItem("auth_token")
      router.push('/')
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user || user.company_id !== NAVOIYDA_BUGUN_COMPANY_ID) {
    return <LoginPage onLogin={handleLogin} />
  }

  // Navoiyda Bugun kanali uchun sidebar items (faqat kerakli bo'limlar)
  const navoiydaNavItems = [
    { id: "dashboard", label: "Boshqaruv paneli" },
    { id: "employees", label: "Xodimlar" },
    { id: "positions", label: "Lavozimlar" },
    { id: "contracts", label: "Shartnomalar" },
    { id: "salary-settings", label: "Maosh Sozlamalari" },
    { id: "daily-tasks", label: "Kundalik Vazifalar" },
    { id: "attendance", label: "Davomat" },
    { id: "kpi", label: "KPI Boshqaruvi" },
    { id: "finance", label: "Moliya" },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Simple Sidebar for Navoiyda Bugun */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
              <span className="text-lg font-bold text-primary-foreground">NB</span>
            </div>
            <div>
              <span className="text-lg font-bold text-sidebar-foreground">Navoiyda Bugun</span>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Kanal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navoiydaNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                activePage === item.id
                  ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/80"
              }`}
            >
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 p-3 rounded-xl bg-sidebar-accent/80">
            <p className="text-sm font-semibold text-sidebar-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive/80 hover:bg-destructive/10 transition-all"
          >
            <span>Chiqish</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSidebarOpen(false)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Sidebar yopish"
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
        <main className="flex-1 overflow-auto">
          <div className="relative min-h-full">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-chart-4/10 blur-3xl" />
            </div>
            <div className="relative p-4 md:p-6 lg:p-8">
              <div className="mx-auto max-w-7xl space-y-8">
                {activePage === "dashboard" && (
                  <>
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">Xush kelibsiz</p>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
                          Navoiyda Bugun - Boshqaruv paneli
                        </h1>
                        <p className="mt-1 text-muted-foreground">Bugun {new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
                      </div>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                      <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold mb-4">Lavozimlar</h3>
                        <p className="text-3xl font-bold text-primary">12</p>
                        <p className="text-sm text-muted-foreground mt-2">Jami lavozimlar</p>
                      </div>
                      <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold mb-4">Xodimlar</h3>
                        <p className="text-3xl font-bold text-chart-2">45</p>
                        <p className="text-sm text-muted-foreground mt-2">Faol xodimlar</p>
                      </div>
                      <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold mb-4">KPI</h3>
                        <p className="text-3xl font-bold text-chart-4">87%</p>
                        <p className="text-sm text-muted-foreground mt-2">O'rtacha samaradorlik</p>
                      </div>
                    </div>
                  </>
                )}
                {activePage === "employees" && <EmployeesSection />}
                {activePage === "positions" && <PositionsSection />}
                {activePage === "contracts" && <ContractsSection />}
                {activePage === "salary-settings" && <SalarySettingsSection />}
                {activePage === "daily-tasks" && <DailyTasksSection />}
                {activePage === "attendance" && <AttendanceSection />}
                {activePage === "kpi" && <KPIManagementSection />}
                {activePage === "finance" && <FinanceSection />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

