"use client"

import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  Calendar,
  Upload,
  Camera,
  CheckCircle2,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const departments = ["IT bo'limi", "Dizayn bo'limi", "HR bo'limi", "Marketing", "Moliya", "Boshqaruv"]

const roles = [
  "Frontend dasturchi",
  "Backend dasturchi",
  "UI/UX dizayner",
  "Loyiha menejeri",
  "HR mutaxassisi",
  "DevOps muhandisi",
  "Marketing menejeri",
  "Moliyaviy tahlilchi",
  "Bosh direktor",
  "Yordamchi",
]

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (employee: any) => void
}

export function AddEmployeeModal({ isOpen, onClose, onAdd }: AddEmployeeModalProps) {
  const [step, setStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    department: "",
    role: "",
    joinDate: "",
    salary: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    const newEmployee = {
      id: Date.now(),
      ...formData,
      status: "active",
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      performance: 85,
      isTopPerformer: false,
    }
    setIsSuccess(true)
    setTimeout(() => {
      onAdd(newEmployee)
      setIsSuccess(false)
      setStep(1)
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        department: "",
        role: "",
        joinDate: "",
        salary: "",
      })
      onClose()
    }, 1500)
  }

  const isStep1Valid = formData.name && formData.email && formData.phone && formData.location
  const isStep2Valid = formData.department && formData.role && formData.joinDate

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Modalni yopish"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl">
        {/* Header gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-chart-4 to-chart-2" />

        {/* Success state */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-chart-2/20 animate-in zoom-in duration-300">
              <CheckCircle2 className="h-10 w-10 text-chart-2" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-foreground">Muvaffaqiyatli qo'shildi!</h3>
            <p className="mt-2 text-center text-muted-foreground">Yangi xodim tizimga muvaffaqiyatli qo'shildi</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 p-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Yangi xodim qo'shish</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step === 1 ? "Shaxsiy ma'lumotlar" : "Ish ma'lumotlari"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress */}
            <div className="flex gap-2 px-6 pt-4">
              <div className={cn("h-1.5 flex-1 rounded-full transition-all", step >= 1 ? "bg-primary" : "bg-muted")} />
              <div className={cn("h-1.5 flex-1 rounded-full transition-all", step >= 2 ? "bg-primary" : "bg-muted")} />
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 1 ? (
                <div className="space-y-4">
                  {/* Avatar upload */}
                  <div className="flex justify-center">
                    <div className="group relative">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-2xl font-bold text-white shadow-lg shadow-primary/25">
                        {formData.name ? (
                          formData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        ) : (
                          <User className="h-10 w-10" />
                        )}
                      </div>
                      <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border shadow-lg hover:bg-muted transition-colors">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="employee-name" className="text-sm font-medium text-foreground">To'liq ism</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="employee-name"
                        placeholder="Ism va familiya"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="employee-email" className="text-sm font-medium text-foreground">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="employee-email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="employee-phone" className="text-sm font-medium text-foreground">Telefon raqam</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="employee-phone"
                        placeholder="+998 90 123 45 67"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label htmlFor="employee-location" className="text-sm font-medium text-foreground">Joylashuv</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="employee-location"
                        placeholder="Toshkent"
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Department */}
                  <div className="space-y-2">
                    <label htmlFor="employee-department" className="text-sm font-medium text-foreground">Bo'lim</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <select
                        id="employee-department"
                        value={formData.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-md border border-border/50 bg-background/50 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      >
                        <option value="">Bo'limni tanlang</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <label htmlFor="employee-role" className="text-sm font-medium text-foreground">Lavozim</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <select
                        id="employee-role"
                        value={formData.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-md border border-border/50 bg-background/50 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      >
                        <option value="">Lavozimni tanlang</option>
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="space-y-2">
                    <label htmlFor="employee-join-date" className="text-sm font-medium text-foreground">Ishga kirish sanasi</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="employee-join-date"
                        type="date"
                        value={formData.joinDate}
                        onChange={(e) => handleChange("joinDate", e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="space-y-2">
                    <label htmlFor="employee-salary" className="text-sm font-medium text-foreground">Oylik maosh (ixtiyoriy)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input
                        id="employee-salary"
                        type="number"
                        placeholder="0.00"
                        value={formData.salary}
                        onChange={(e) => handleChange("salary", e.target.value)}
                        className="pl-8 bg-background/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  {/* Document upload */}
                  <div className="space-y-2">
                    <label htmlFor="employee-documents" className="text-sm font-medium text-foreground">Hujjatlar (ixtiyoriy)</label>
                    <div id="employee-documents" className="flex items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-muted/20 p-6 hover:border-primary/30 hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Fayllarni bu yerga tashlang yoki <span className="text-primary">tanlang</span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">PDF, DOC 10MB gacha</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border/50 p-6">
              {step === 1 ? (
                <>
                  <Button variant="ghost" onClick={onClose}>
                    Bekor qilish
                  </Button>
                  <Button
                    disabled={!isStep1Valid}
                    onClick={() => setStep(2)}
                    className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40"
                  >
                    Davom etish
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    Orqaga
                  </Button>
                  <Button
                    disabled={!isStep2Valid}
                    onClick={handleSubmit}
                    className="gap-2 bg-gradient-to-r from-chart-2 to-chart-2/80 shadow-lg shadow-chart-2/25 hover:shadow-chart-2/40"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Qo'shish
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
