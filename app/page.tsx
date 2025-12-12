"use client"

import { useState, useEffect } from "react"

import { ActivityFeed } from "@/components/activity-feed"
import { AnalyticsSection } from "@/components/analytics-section"
import { AttendanceSection } from "@/components/attendance-section"
import { AuditLogSection } from "@/components/audit-log-section"
import { BonusPenaltySection } from "@/components/bonus-penalty-section"
import { CalendarSection } from "@/components/calendar-section"
import { ClientsSection } from "@/components/clients-section"
import { ContentCalendarSection } from "@/components/content-calendar-section"
import { ContractsSection } from "@/components/contracts-section"
import { CRMSection } from "@/components/crm-section"
import { DailyTasksSection } from "@/components/daily-tasks-section"
import { DocumentsSection } from "@/components/documents-section"
import { EmployeesSection } from "@/components/employees-section"
import { FinanceSection } from "@/components/finance-section"
import { Header } from "@/components/header"
import { KPICards } from "@/components/kpi-cards"
import { KPIManagementSection } from "@/components/kpi-management-section"
import { LoginPage } from "@/components/login-page"
import { MessagesSection } from "@/components/messages-section"
import { NotificationsSection } from "@/components/notifications-section"
import { PositionsSection } from "@/components/positions-section"
import { ProjectsSection } from "@/components/projects-section"
import { QuickActions } from "@/components/quick-actions"
import { ReportsSection } from "@/components/reports-section"
import { RolesSection } from "@/components/roles-section"
import { SalarySettingsSection } from "@/components/salary-settings-section"
import { SettingsSection } from "@/components/settings-section"
import { ShiftsSection } from "@/components/shifts-section"
import { Sidebar } from "@/components/sidebar"
import { StatsOverview } from "@/components/stats-overview"
import { SuperAdminSection } from "@/components/super-admin-section"
import { TasksSection } from "@/components/tasks-section"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [activePage, setActivePage] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize state from localStorage
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") : null
    const savedAuth = typeof window !== 'undefined' ? localStorage.getItem("isAuthenticated") : null
    
    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => {
      setIsDark(savedTheme ? savedTheme === "dark" : true)
      setIsAuthenticated(savedAuth === "true")
      setIsLoading(false)
    }, 0)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle("dark", isDark)
      localStorage.setItem("theme", isDark ? "dark" : "light")
    }
  }, [isDark])

  useEffect(() => {
    // Check if user is Navoiyda Bugun and redirect
    if (typeof window !== 'undefined' && isAuthenticated) {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          const NAVOIYDA_BUGUN_COMPANY_ID = 1
          if (userData.company_id === NAVOIYDA_BUGUN_COMPANY_ID) {
            window.location.href = '/navoiyda-bugun'
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem("isAuthenticated", "true")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
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

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onPageChange={setActivePage}
        onLogout={handleLogout}
        isSuperAdmin={true}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
        <main className="flex-1 overflow-auto">
          <div className="relative min-h-full">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-chart-4/10 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-chart-2/10 blur-3xl" />
            </div>
            <div className="relative p-4 md:p-6 lg:p-8">
              <div className="mx-auto max-w-7xl space-y-8">
                {activePage === "super-admin" && <SuperAdminSection />}

                {activePage === "dashboard" && (
                  <>
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">Xush kelibsiz</p>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
                          Boshqaruv paneli
                        </h1>
                        <p className="mt-1 text-muted-foreground">Bugun 2024-yil, 9-dekabr, dushanba</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-card/50 px-4 py-2 backdrop-blur-sm border border-border/50">
                        <div className="h-2 w-2 rounded-full bg-chart-2 animate-pulse" />
                        <span className="text-sm text-muted-foreground">Barcha tizimlar ishlayapti</span>
                      </div>
                    </div>
                    <KPICards />
                    <StatsOverview />
                    <div className="grid gap-6 lg:grid-cols-2">
                      <QuickActions />
                      <ActivityFeed />
                    </div>
                  </>
                )}
                {activePage === "employees" && <EmployeesSection />}
                {activePage === "shifts" && <ShiftsSection />}
                {activePage === "tasks" && <TasksSection />}
                {activePage === "attendance" && <AttendanceSection />}
                {activePage === "projects" && <ProjectsSection />}
                {activePage === "clients" && <ClientsSection />}
                {activePage === "crm" && <CRMSection />}
                {activePage === "finance" && <FinanceSection />}
                {activePage === "content" && <ContentCalendarSection />}
                {activePage === "documents" && <DocumentsSection />}
                {activePage === "analytics" && <AnalyticsSection />}
                {activePage === "kpi" && <KPIManagementSection />}
                {activePage === "bonus-penalty" && <BonusPenaltySection />}
                {activePage === "reports" && <ReportsSection />}
                {activePage === "settings" && <SettingsSection />}
                {activePage === "messages" && <MessagesSection />}
                {activePage === "calendar" && <CalendarSection />}
                {activePage === "notifications" && <NotificationsSection />}
                {activePage === "audit-log" && <AuditLogSection />}
                {activePage === "roles" && <RolesSection />}
                {activePage === "positions" && <PositionsSection />}
                {activePage === "contracts" && <ContractsSection />}
                {activePage === "salary-settings" && <SalarySettingsSection />}
                {activePage === "daily-tasks" && <DailyTasksSection />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
