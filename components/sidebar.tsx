"use client"

import {
  LayoutDashboard,
  Users,
  Calendar,
  CheckSquare,
  Clock,
  BarChart3,
  Settings,
  X,
  Building2,
  ChevronRight,
  LogOut,
  FolderKanban,
  UserCircle,
  Wallet,
  CalendarDays,
  FileText,
  TrendingUp,
  Crown,
  Target,
  Gift,
  Handshake,
  MessageSquare,
  Bell,
  Shield,
  History,
  Briefcase,
  ClipboardList,
  DollarSign,
  ListTodo,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activePage: string
  onPageChange: (page: string) => void
  onLogout?: () => void
  isSuperAdmin?: boolean
}

const mainNavItems = [
  { icon: LayoutDashboard, label: "Boshqaruv paneli", id: "dashboard" },
  { icon: Users, label: "Xodimlar", id: "employees", badge: "128" },
  { icon: Calendar, label: "Smenalar", id: "shifts" },
  { icon: CheckSquare, label: "Vazifalar", id: "tasks", badge: "12" },
  { icon: Clock, label: "Davomat", id: "attendance" },
]

const businessNavItems = [
  { icon: FolderKanban, label: "Loyihalar", id: "projects", badge: "8" },
  { icon: UserCircle, label: "Mijozlar", id: "clients", badge: "45" },
  { icon: Handshake, label: "CRM", id: "crm", badge: "156" },
  { icon: Wallet, label: "Moliya", id: "finance" },
  { icon: CalendarDays, label: "Kontent kalendari", id: "content" },
  { icon: FileText, label: "Hujjatlar", id: "documents" },
  { icon: TrendingUp, label: "Analitika", id: "analytics" },
]

const hrNavItems = [
  { icon: Target, label: "KPI Boshqaruvi", id: "kpi" },
  { icon: Gift, label: "Bonus va Jarimalar", id: "bonus-penalty" },
  { icon: Briefcase, label: "Lavozimlar", id: "positions" },
  { icon: ClipboardList, label: "Shartnomalar", id: "contracts" },
  { icon: DollarSign, label: "Maosh Sozlamalari", id: "salary-settings" },
  { icon: ListTodo, label: "Kundalik Vazifalar", id: "daily-tasks" },
]

const communicationNavItems = [
  { icon: MessageSquare, label: "Xabarlar", id: "messages", badge: "9" },
  { icon: CalendarDays, label: "Kalendar", id: "calendar" },
  { icon: Bell, label: "Bildirishnomalar", id: "notifications", badge: "3" },
]

const systemNavItems = [
  { icon: BarChart3, label: "Hisobotlar", id: "reports" },
  { icon: History, label: "Audit Log", id: "audit-log" },
  { icon: Shield, label: "Rol va huquqlar", id: "roles" },
  { icon: Settings, label: "Sozlamalar", id: "settings" },
]

const superAdminNavItems = [{ icon: Crown, label: "Korxonalar boshqaruvi", id: "super-admin" }]

export function Sidebar({ isOpen, onClose, activePage, onPageChange, onLogout, isSuperAdmin = true }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const renderNavItem = (item: (typeof mainNavItems)[0]) => {
    const isActive = activePage === item.id
    return (
      <button
        key={item.label}
        onClick={() => {
          onPageChange(item.id)
          onClose()
        }}
        onMouseEnter={() => setHoveredItem(item.label)}
        onMouseLeave={() => setHoveredItem(null)}
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-sm"
            : "text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground",
        )}
      >
        {isActive && <div className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-primary" />}

        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg transition-all",
            isActive
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
              : "bg-sidebar-accent/50 text-muted-foreground group-hover:bg-sidebar-accent group-hover:text-sidebar-accent-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
        </div>

        <span className="flex-1 text-left">{item.label}</span>

        {"badge" in item && item.badge && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold",
              isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
            )}
          >
            {item.badge}
          </span>
        )}

        <ChevronRight
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            hoveredItem === item.label && "translate-x-0.5",
          )}
        />
      </button>
    )
  }

  const renderSuperAdminItem = (item: (typeof superAdminNavItems)[0]) => {
    const isActive = activePage === item.id
    return (
      <button
        key={item.label}
        onClick={() => {
          onPageChange(item.id)
          onClose()
        }}
        onMouseEnter={() => setHoveredItem(item.label)}
        onMouseLeave={() => setHoveredItem(null)}
        className={cn(
          "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-500 shadow-sm"
            : "text-amber-500/80 hover:bg-amber-500/10 hover:text-amber-500",
        )}
      >
        {isActive && <div className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-amber-500" />}

        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg transition-all",
            isActive
              ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/30"
              : "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20",
          )}
        >
          <item.icon className="h-4 w-4" />
        </div>

        <span className="flex-1 text-left">{item.label}</span>

        <ChevronRight
          className={cn(
            "h-4 w-4 text-amber-500/50 transition-transform duration-200",
            hoveredItem === item.label && "translate-x-0.5",
          )}
        />
      </button>
    )
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onClose()
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Menyuni yopish"
        />
      )}

      <aside
        aria-label="Asosiy navigatsiya"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-all duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
              <Building2 className="h-5 w-5 text-primary-foreground" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary to-primary/70 opacity-50 blur-sm" />
            </div>
            <div>
              <span className="text-lg font-bold text-sidebar-foreground">AI Boshqaruv</span>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Universal</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden hover:bg-sidebar-accent" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav role="navigation" aria-label="Asosiy menyu" className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {isSuperAdmin && (
            <>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-amber-500">Super Admin</p>
              {superAdminNavItems.map(renderSuperAdminItem)}
              <div className="my-4 border-t border-border/50" />
            </>
          )}

          {/* Asosiy menyu */}
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Asosiy</p>
          {mainNavItems.map(renderNavItem)}

          {/* Biznes modullari */}
          <p className="mb-2 mt-4 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Biznes
          </p>
          {businessNavItems.map(renderNavItem)}

          {/* HR modullari */}
          <p className="mb-2 mt-4 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            HR & KPI
          </p>
          {hrNavItems.map(renderNavItem)}

          <p className="mb-2 mt-4 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Aloqa
          </p>
          {communicationNavItems.map(renderNavItem)}

          {/* Tizim */}
          <p className="mb-2 mt-4 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Tizim
          </p>
          {systemNavItems.map(renderNavItem)}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4 space-y-3">
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-sidebar-accent/80 to-sidebar-accent/40 p-3 transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-sm font-bold text-primary-foreground">AK</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sidebar bg-chart-2" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-sidebar-foreground">Alisher Karimov</p>
                  {isSuperAdmin && <Crown className="h-3.5 w-3.5 text-amber-500" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {isSuperAdmin ? "Super Administrator" : "Administrator"}
                </p>
              </div>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                <LogOut className="h-4 w-4" />
              </div>
              <span>Chiqish</span>
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
