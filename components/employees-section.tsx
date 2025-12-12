"use client"

import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Mail,
  MapPin,
  TrendingUp,
  UserCheck,
  UserX,
  Clock,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Download,
  Star,
  BadgeCheck,
} from "lucide-react"
import { useState, useEffect } from "react"

import { AddEmployeeModal } from "./add-employee-modal"
import { EmployeeProfileModal } from "./employee-profile-modal"

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

interface Employee {
  id: number
  first_name?: string
  last_name?: string
  name: string // Derived from first_name + last_name
  avatar: string // Derived initials
  role?: string
  department?: string
  email?: string
  phone?: string
  location?: string
  joinDate?: string
  status?: string
  performance?: number
  isTopPerformer?: boolean
  position?: string
  avatar_url?: string
  join_date?: string
  is_top_performer?: boolean
}

const staticEmployees = [
  {
    id: 1,
    name: "Aziza Rahimova",
    role: "Frontend dasturchi",
    department: "IT bo'limi",
    email: "aziza@ishoqumi.uz",
    phone: "+998 90 123 45 67",
    location: "Toshkent",
    joinDate: "2023-03-15",
    status: "active",
    avatar: "AR",
    performance: 95,
    isTopPerformer: true,
  },
  // ... keep other static employees as fallback if needed, or remove
]

const departments = [
  "Barcha bo'limlar",
  "IT bo'limi",
  "Dizayn bo'limi",
  "HR bo'limi",
  "Marketing",
  "Moliya",
  "Boshqaruv",
]
const statuses = ["Barcha holatlar", "Faol", "Ta'tilda", "Nofaol"]

export function EmployeesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("Barcha bo'limlar")
  const [selectedStatus, setSelectedStatus] = useState("Barcha holatlar")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [employeesList, setEmployeesList] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // Fetch employees from gRPC backend via API route
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/employees?page=1&page_size=100')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.error) {
          logger.error("Error fetching employees", result.error, { source: "employees-section" })
          // Fallback to static data if API fails
          setEmployeesList(staticEmployees)
        } else if (result.employees && result.employees.length > 0) {
          const formattedData = result.employees.map((emp: Employee) => ({
            ...emp,
            name: `${emp.first_name || ''} ${emp.last_name || ''}`.trim(),
            role: emp.position || "Noma'lum",
            joinDate: emp.join_date || "",
            avatar: emp.avatar_url || `${emp.first_name?.[0] || ""}${emp.last_name?.[0] || ""}`,
            // Default values for missing fields in DB vs UI
            performance: emp.performance || 0,
            isTopPerformer: emp.is_top_performer || false,
            department: emp.department || "Bo'limsiz",
            location: emp.location || "Noma'lum",
            phone: emp.phone || "",
            email: emp.email || ""
          }))
          setEmployeesList(formattedData)
        } else {
          // No employees in database, use static data
          setEmployeesList(staticEmployees)
        }
      } catch (err) {
        logger.error("Unexpected error while fetching employees", err, { source: "employees-section" })
        setEmployeesList(staticEmployees)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployees()
  }, [])


  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployeesList((prev) => [newEmployee, ...prev])
  }

  const handleOpenProfile = (employee: (typeof employeesList)[0]) => {
    setSelectedEmployee(employee)
    setIsProfileModalOpen(true)
  }

  const filteredEmployees = employeesList.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.role?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "Barcha bo'limlar" || emp.department === selectedDepartment
    const matchesStatus =
      selectedStatus === "Barcha holatlar" ||
      (selectedStatus === "Faol" && emp.status === "active") ||
      (selectedStatus === "Ta'tilda" && emp.status === "vacation") ||
      (selectedStatus === "Nofaol" && emp.status === "inactive")
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30"
      case "vacation":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      case "inactive":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Faol"
      case "vacation":
        return "Ta'tilda"
      case "inactive":
        return "Nofaol"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddEmployee} />
      <EmployeeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        employee={selectedEmployee}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Xodimlar</h1>
          <p className="mt-1 text-muted-foreground">Barcha xodimlarni boshqaring va kuzating</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi xodim
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Jami xodimlar",
            value: "128",
            change: "+12",
            icon: UserCheck,
            color: "from-primary to-primary/70",
          },
          {
            label: "Faol xodimlar",
            value: "115",
            change: "+8",
            icon: TrendingUp,
            color: "from-chart-2 to-chart-2/70",
          },
          {
            label: "Ta'tilda",
            value: "8",
            change: "+2",
            icon: Clock,
            color: "from-chart-4 to-chart-4/70",
          },
          {
            label: "Nofaol",
            value: "5",
            change: "-3",
            icon: UserX,
            color: "from-destructive to-destructive/70",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-primary/5 group-hover:to-transparent transition-all" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                <p
                  className={cn(
                    "mt-1 text-xs font-medium",
                    stat.change.startsWith("+") ? "text-chart-2" : "text-destructive",
                  )}
                >
                  {stat.change} bu oy
                </p>
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

      <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Xodim izlash..."
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border/50 bg-background/50">
                {selectedStatus}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {statuses.map((status) => (
                <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)}>
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="border-border/50 bg-background/50">
            <Download className="h-4 w-4" />
          </Button>
          <div className="flex rounded-lg border border-border/50 bg-background/50 p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/50">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Xodimlar yuklanmoqda...</p>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => handleOpenProfile(employee)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenProfile(employee)
                }
              }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary via-chart-4 to-chart-2" />

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-xl font-bold text-white shadow-lg",
                        employee.isTopPerformer
                          ? "bg-gradient-to-br from-chart-4 to-chart-1"
                          : "bg-gradient-to-br from-primary to-primary/70",
                      )}
                    >
                      {employee.avatar}
                    </div>
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card",
                        employee.status === "active"
                          ? "bg-chart-2"
                          : employee.status === "vacation"
                            ? "bg-chart-4"
                            : "bg-destructive",
                      )}
                    />
                    {employee.isTopPerformer && (
                      <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-chart-4 shadow-lg">
                        <Star className="h-3 w-3 text-white fill-white" />
                      </div>
                    )}
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
                      <DropdownMenuItem>Profilni ko'rish</DropdownMenuItem>
                      <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">O'chirish</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{employee.name}</h3>
                    {employee.isTopPerformer && <BadgeCheck className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                  <span
                    className={cn(
                      "mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      getStatusColor(employee.status || 'active'),
                    )}
                  >
                    {getStatusText(employee.status || 'active')}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Samaradorlik</span>
                    <span className="font-medium text-foreground">{employee.performance}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        (employee.performance || 0) >= 90
                          ? "bg-gradient-to-r from-chart-2 to-chart-2/70"
                          : (employee.performance || 0) >= 80
                            ? "bg-gradient-to-r from-primary to-primary/70"
                            : "bg-gradient-to-r from-chart-4 to-chart-4/70",
                      )}
                      style={{ width: `${employee.performance || 0}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-border/50 pt-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{employee.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Xodim
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Bo'lim
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Holat
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Samaradorlik
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Joylashuv
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    onClick={() => handleOpenProfile(employee)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleOpenProfile(employee)
                      }
                    }}
                    className="transition-colors hover:bg-muted/20 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-white text-sm",
                              employee.isTopPerformer
                                ? "bg-gradient-to-br from-chart-4 to-chart-1"
                                : "bg-gradient-to-br from-primary to-primary/70",
                            )}
                          >
                            {employee.avatar}
                          </div>
                          <div
                            className={cn(
                              "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                              employee.status === "active"
                                ? "bg-chart-2"
                                : employee.status === "vacation"
                                  ? "bg-chart-4"
                                  : "bg-destructive",
                            )}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-foreground">{employee.name}</p>
                            {employee.isTopPerformer && <Star className="h-3.5 w-3.5 text-chart-4 fill-chart-4" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground">{employee.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          getStatusColor(employee.status || 'active'),
                        )}
                      >
                        {getStatusText(employee.status || 'active')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              (employee.performance || 0) >= 90
                                ? "bg-chart-2"
                                : (employee.performance || 0) >= 80
                                  ? "bg-primary"
                                  : "bg-chart-4",
                            )}
                            style={{ width: `${employee.performance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">{employee.performance}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {employee.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Profilni ko'rish</DropdownMenuItem>
                          <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">O'chirish</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Jami <span className="font-medium text-foreground">{filteredEmployees.length}</span> ta xodimdan{" "}
          <span className="font-medium text-foreground">1-8</span> ko'rsatilmoqda
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1 border-border/50 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
            Oldingi
          </Button>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={cn("h-8 w-8 p-0", currentPage !== page && "border-border/50")}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1 border-border/50 bg-transparent">
            Keyingi
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
