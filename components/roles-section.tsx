"use client"

import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Users,
  Eye,
  Lock,
  Unlock,
  Check,
  X,
  ChevronRight,
  Crown,
  Settings,
  FileText,
  DollarSign,
  BarChart3,
  FolderKanban,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Permission {
  id: string
  name: string
  description: string
  module: string
}

interface Role {
  id: number
  name: string
  description: string
  color: string
  usersCount: number
  permissions: string[]
  isSystem: boolean
  createdAt: string
}

const allPermissions: Permission[] = [
  // Dashboard
  {
    id: "dashboard.view",
    name: "Boshqaruv panelini ko'rish",
    description: "Asosiy sahifani ko'rish",
    module: "Boshqaruv paneli",
  },

  // Xodimlar
  { id: "employees.view", name: "Xodimlarni ko'rish", description: "Xodimlar ro'yxatini ko'rish", module: "Xodimlar" },
  { id: "employees.create", name: "Xodim qo'shish", description: "Yangi xodim qo'shish", module: "Xodimlar" },
  {
    id: "employees.edit",
    name: "Xodimni tahrirlash",
    description: "Xodim ma'lumotlarini o'zgartirish",
    module: "Xodimlar",
  },
  { id: "employees.delete", name: "Xodimni o'chirish", description: "Xodimni tizimdan o'chirish", module: "Xodimlar" },

  // Loyihalar
  {
    id: "projects.view",
    name: "Loyihalarni ko'rish",
    description: "Loyihalar ro'yxatini ko'rish",
    module: "Loyihalar",
  },
  { id: "projects.create", name: "Loyiha yaratish", description: "Yangi loyiha yaratish", module: "Loyihalar" },
  {
    id: "projects.edit",
    name: "Loyihani tahrirlash",
    description: "Loyiha ma'lumotlarini o'zgartirish",
    module: "Loyihalar",
  },
  { id: "projects.delete", name: "Loyihani o'chirish", description: "Loyihani o'chirish", module: "Loyihalar" },

  // Moliya
  { id: "finance.view", name: "Moliyani ko'rish", description: "Moliyaviy ma'lumotlarni ko'rish", module: "Moliya" },
  { id: "finance.create", name: "Tranzaksiya yaratish", description: "Yangi tranzaksiya kiritish", module: "Moliya" },
  { id: "finance.edit", name: "Tranzaksiyani tahrirlash", description: "Tranzaksiyani o'zgartirish", module: "Moliya" },
  { id: "finance.delete", name: "Tranzaksiyani o'chirish", description: "Tranzaksiyani o'chirish", module: "Moliya" },
  {
    id: "finance.export",
    name: "Moliya eksport",
    description: "Moliyaviy hisobotlarni yuklab olish",
    module: "Moliya",
  },

  // Hisobotlar
  { id: "reports.view", name: "Hisobotlarni ko'rish", description: "Hisobotlarni ko'rish", module: "Hisobotlar" },
  { id: "reports.create", name: "Hisobot yaratish", description: "Yangi hisobot yaratish", module: "Hisobotlar" },
  { id: "reports.export", name: "Hisobot eksport", description: "Hisobotlarni yuklab olish", module: "Hisobotlar" },

  // Sozlamalar
  {
    id: "settings.view",
    name: "Sozlamalarni ko'rish",
    description: "Tizim sozlamalarini ko'rish",
    module: "Sozlamalar",
  },
  {
    id: "settings.edit",
    name: "Sozlamalarni o'zgartirish",
    description: "Tizim sozlamalarini tahrirlash",
    module: "Sozlamalar",
  },

  // Foydalanuvchilar
  {
    id: "users.view",
    name: "Foydalanuvchilarni ko'rish",
    description: "Foydalanuvchilar ro'yxatini ko'rish",
    module: "Foydalanuvchilar",
  },
  {
    id: "users.create",
    name: "Foydalanuvchi qo'shish",
    description: "Yangi foydalanuvchi qo'shish",
    module: "Foydalanuvchilar",
  },
  {
    id: "users.edit",
    name: "Foydalanuvchini tahrirlash",
    description: "Foydalanuvchi ma'lumotlarini o'zgartirish",
    module: "Foydalanuvchilar",
  },
  {
    id: "users.delete",
    name: "Foydalanuvchini o'chirish",
    description: "Foydalanuvchini o'chirish",
    module: "Foydalanuvchilar",
  },
  {
    id: "users.roles",
    name: "Rollarni boshqarish",
    description: "Foydalanuvchi rollarini o'zgartirish",
    module: "Foydalanuvchilar",
  },
]

const roles: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    description: "Tizimdagi barcha huquqlarga ega",
    color: "from-amber-500 to-amber-600",
    usersCount: 1,
    permissions: allPermissions.map((p) => p.id),
    isSystem: true,
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Administrator",
    description: "Korxona boshqaruvchisi",
    color: "from-blue-500 to-blue-600",
    usersCount: 3,
    permissions: allPermissions
      .filter((p) => !p.id.includes("users.roles") && !p.id.includes("settings.edit"))
      .map((p) => p.id),
    isSystem: true,
    createdAt: "2024-01-01",
  },
  {
    id: 3,
    name: "Menejer",
    description: "Bo'lim rahbari",
    color: "from-green-500 to-green-600",
    usersCount: 8,
    permissions: [
      "dashboard.view",
      "employees.view",
      "employees.edit",
      "projects.view",
      "projects.create",
      "projects.edit",
      "finance.view",
      "reports.view",
      "reports.create",
    ],
    isSystem: false,
    createdAt: "2024-03-15",
  },
  {
    id: 4,
    name: "HR mutaxassisi",
    description: "Xodimlar bo'limi",
    color: "from-purple-500 to-purple-600",
    usersCount: 4,
    permissions: ["dashboard.view", "employees.view", "employees.create", "employees.edit", "reports.view"],
    isSystem: false,
    createdAt: "2024-04-20",
  },
  {
    id: 5,
    name: "Buxgalter",
    description: "Moliya bo'limi",
    color: "from-teal-500 to-teal-600",
    usersCount: 2,
    permissions: [
      "dashboard.view",
      "finance.view",
      "finance.create",
      "finance.edit",
      "finance.export",
      "reports.view",
      "reports.export",
    ],
    isSystem: false,
    createdAt: "2024-05-10",
  },
  {
    id: 6,
    name: "Xodim",
    description: "Oddiy xodim",
    color: "from-gray-500 to-gray-600",
    usersCount: 45,
    permissions: ["dashboard.view", "projects.view"],
    isSystem: true,
    createdAt: "2024-01-01",
  },
]

const moduleIcons: Record<string, typeof Shield> = {
  "Boshqaruv paneli": BarChart3,
  Xodimlar: Users,
  Loyihalar: FolderKanban,
  Moliya: DollarSign,
  Hisobotlar: FileText,
  Sozlamalar: Settings,
  Foydalanuvchilar: Users,
}

export function RolesSection() {
  const [rolesList, setRolesList] = useState(roles)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [showAddRole, setShowAddRole] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [newRole, setNewRole] = useState({ name: "", description: "", permissions: [] as string[] })

  const modules = [...new Set(allPermissions.map((p) => p.module))]

  const getPermissionsByModule = (module: string) => {
    return allPermissions.filter((p) => p.module === module)
  }

  const togglePermission = (permId: string) => {
    if (editingRole) {
      const newPerms = editingRole.permissions.includes(permId)
        ? editingRole.permissions.filter((p) => p !== permId)
        : [...editingRole.permissions, permId]
      setEditingRole({ ...editingRole, permissions: newPerms })
    } else if (showAddRole) {
      const newPerms = newRole.permissions.includes(permId)
        ? newRole.permissions.filter((p) => p !== permId)
        : [...newRole.permissions, permId]
      setNewRole({ ...newRole, permissions: newPerms })
    }
  }

  const saveRole = () => {
    if (editingRole) {
      setRolesList((prev) => prev.map((r) => (r.id === editingRole.id ? editingRole : r)))
      setEditingRole(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Rol va huquqlar</h1>
          <p className="mt-1 text-muted-foreground">Foydalanuvchi rollarini va huquqlarini boshqaring</p>
        </div>
        <Button
          onClick={() => setShowAddRole(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25"
        >
          <Plus className="h-4 w-4" />
          Yangi rol
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Jami rollar",
            value: rolesList.length.toString(),
            icon: Shield,
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "Tizim rollari",
            value: rolesList.filter((r) => r.isSystem).length.toString(),
            icon: Lock,
            color: "from-amber-500 to-amber-600",
          },
          {
            label: "Maxsus rollar",
            value: rolesList.filter((r) => !r.isSystem).length.toString(),
            icon: Unlock,
            color: "from-green-500 to-green-600",
          },
          {
            label: "Jami huquqlar",
            value: allPermissions.length.toString(),
            icon: Eye,
            color: "from-purple-500 to-purple-600",
          },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                  stat.color,
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <h3 className="font-semibold text-foreground">Rollar ro'yxati</h3>
          </div>
          <div className="divide-y divide-border/30">
            {rolesList.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role)
                  setEditingRole(null)
                }}
                className={cn(
                  "w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-all text-left",
                  selectedRole?.id === role.id && "bg-primary/10 border-l-2 border-l-primary",
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                    role.color,
                  )}
                >
                  {role.isSystem ? <Crown className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{role.name}</h4>
                    {role.isSystem && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 text-[10px] font-medium">
                        Tizim
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{role.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{role.usersCount} foydalanuvchi</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Role Details */}
        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
          {selectedRole ? (
            <>
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                      selectedRole.color,
                    )}
                  >
                    {selectedRole.isSystem ? <Crown className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedRole.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedRole.description}</p>
                  </div>
                </div>
                {!selectedRole.isSystem && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 bg-transparent"
                      onClick={() => setEditingRole(selectedRole)}
                    >
                      <Edit className="h-4 w-4" />
                      Tahrirlash
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
                {editingRole ? (
                  <>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">Huquqlarni tahrirlash</h4>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingRole(null)}>
                          Bekor qilish
                        </Button>
                        <Button size="sm" onClick={saveRole}>
                          Saqlash
                        </Button>
                      </div>
                    </div>
                    {modules.map((module) => {
                      const ModuleIcon = moduleIcons[module] || Shield
                      const perms = getPermissionsByModule(module)
                      return (
                        <div key={module} className="rounded-xl border border-border/30 overflow-hidden">
                          <div className="flex items-center gap-2 p-3 bg-muted/30">
                            <ModuleIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground text-sm">{module}</span>
                          </div>
                          <div className="p-3 space-y-2">
                            {perms.map((perm) => (
                              <label
                                key={perm.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={editingRole.permissions.includes(perm.id)}
                                  onChange={() => togglePermission(perm.id)}
                                  className="h-4 w-4 rounded border-input"
                                  aria-label={perm.name}
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{perm.name}</p>
                                  <p className="text-xs text-muted-foreground">{perm.description}</p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">Huquqlar ({selectedRole.permissions.length})</h4>
                    </div>
                    {modules.map((module) => {
                      const ModuleIcon = moduleIcons[module] || Shield
                      const perms = getPermissionsByModule(module)
                      const grantedPerms = perms.filter((p) => selectedRole.permissions.includes(p.id))
                      if (grantedPerms.length === 0) return null

                      return (
                        <div key={module} className="rounded-xl border border-border/30 overflow-hidden">
                          <div className="flex items-center justify-between p-3 bg-muted/30">
                            <div className="flex items-center gap-2">
                              <ModuleIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-foreground text-sm">{module}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {grantedPerms.length}/{perms.length}
                            </span>
                          </div>
                          <div className="p-3 flex flex-wrap gap-2">
                            {grantedPerms.map((perm) => (
                              <span
                                key={perm.id}
                                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs"
                              >
                                <Check className="h-3 w-3" />
                                {perm.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
                <Shield className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Rolni tanlang</h3>
              <p className="text-sm text-muted-foreground mt-1">Huquqlarni ko'rish uchun chapdan rol tanlang</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Role Modal */}
      {showAddRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-card shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-card z-10">
              <h2 className="text-lg font-semibold">Yangi rol yaratish</h2>
              <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setShowAddRole(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="role-name" className="text-sm font-medium text-foreground">Rol nomi</label>
                <Input
                  id="role-name"
                  placeholder="Masalan: Kontent menejer"
                  className="mt-1.5"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="role-desc" className="text-sm font-medium text-foreground">Tavsif</label>
                <Input
                  id="role-desc"
                  placeholder="Qisqa tavsif"
                  className="mt-1.5"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-3 block">Huquqlar</p>
                {modules.map((module) => {
                  const ModuleIcon = moduleIcons[module] || Shield
                  const perms = getPermissionsByModule(module)
                  return (
                    <div key={module} className="rounded-xl border border-border/30 overflow-hidden mb-3">
                      <div className="flex items-center gap-2 p-3 bg-muted/30">
                        <ModuleIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground text-sm">{module}</span>
                      </div>
                      <div className="p-3 space-y-2">
                        {perms.map((perm) => (
                          <label
                            key={perm.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={newRole.permissions.includes(perm.id)}
                              onChange={() => togglePermission(perm.id)}
                              className="h-4 w-4 rounded border-input"
                              aria-label={perm.name}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{perm.name}</p>
                              <p className="text-xs text-muted-foreground">{perm.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-border/50 sticky bottom-0 bg-card">
              <Button variant="outline" onClick={() => setShowAddRole(false)}>
                Bekor qilish
              </Button>
              <Button className="bg-gradient-to-r from-primary to-primary/80">Yaratish</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
