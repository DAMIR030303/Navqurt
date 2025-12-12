"use client"

import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Mail,
  Phone,
  MapPin,
  Star,
  FolderKanban,
  DollarSign,
  X,
  User,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

const clients = [
  {
    id: 1,
    name: "TechCorp LLC",
    contact: "Jamshid Alimov",
    email: "info@techcorp.uz",
    phone: "+998 90 123 45 67",
    address: "Toshkent, Mirzo Ulug'bek tumani",
    type: "Kompaniya",
    status: "active",
    rating: 5,
    projects: 8,
    totalRevenue: 125000000,
    lastContact: "2024-12-08",
    avatar: "TC",
  },
  {
    id: 2,
    name: "Global Trade",
    contact: "Sardor Karimov",
    email: "sardor@globaltrade.com",
    phone: "+998 91 234 56 78",
    address: "Toshkent, Yunusobod tumani",
    type: "Kompaniya",
    status: "active",
    rating: 4,
    projects: 5,
    totalRevenue: 85000000,
    lastContact: "2024-12-07",
    avatar: "GT",
  },
  {
    id: 3,
    name: "Mega Bank",
    contact: "Nodira Ismoilova",
    email: "n.ismoilova@megabank.uz",
    phone: "+998 93 345 67 89",
    address: "Toshkent, Shayxontohur tumani",
    type: "Bank",
    status: "active",
    rating: 5,
    projects: 3,
    totalRevenue: 200000000,
    lastContact: "2024-12-09",
    avatar: "MB",
  },
  {
    id: 4,
    name: "StartUp Inc",
    contact: "Bekzod Rahimov",
    email: "bekzod@startup.io",
    phone: "+998 94 456 78 90",
    address: "Toshkent, IT Park",
    type: "StartUp",
    status: "active",
    rating: 4,
    projects: 2,
    totalRevenue: 35000000,
    lastContact: "2024-12-05",
    avatar: "SI",
  },
  {
    id: 5,
    name: "Local Market",
    contact: "Dilshod Nazarov",
    email: "info@localmarket.uz",
    phone: "+998 95 567 89 01",
    address: "Samarqand shahri",
    type: "Kompaniya",
    status: "inactive",
    rating: 3,
    projects: 1,
    totalRevenue: 15000000,
    lastContact: "2024-11-20",
    avatar: "LM",
  },
  {
    id: 6,
    name: "Akmal Toshmatov",
    contact: "Akmal Toshmatov",
    email: "akmal.t@gmail.com",
    phone: "+998 99 678 90 12",
    address: "Toshkent",
    type: "Jismoniy shaxs",
    status: "active",
    rating: 5,
    projects: 4,
    totalRevenue: 45000000,
    lastContact: "2024-12-06",
    avatar: "AT",
  },
]

export function ClientsSection() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showNewClient, setShowNewClient] = useState(false)
  const [selectedClient, setSelectedClient] = useState<(typeof clients)[0] | null>(null)

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm"
  }

  const stats = [
    { label: "Jami mijozlar", value: clients.length, icon: User, color: "from-primary/20 to-primary/5" },
    {
      label: "Faol mijozlar",
      value: clients.filter((c) => c.status === "active").length,
      icon: Star,
      color: "from-chart-2/20 to-chart-2/5",
    },
    {
      label: "Jami loyihalar",
      value: clients.reduce((a, b) => a + b.projects, 0),
      icon: FolderKanban,
      color: "from-chart-4/20 to-chart-4/5",
    },
    {
      label: "Umumiy daromad",
      value: formatMoney(clients.reduce((a, b) => a + b.totalRevenue, 0)),
      icon: DollarSign,
      color: "from-chart-1/20 to-chart-1/5",
      isLarge: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Mijozlar</h1>
          <p className="mt-1 text-muted-foreground">Mijozlar bazasini boshqaring</p>
        </div>
        <Button
          onClick={() => setShowNewClient(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi mijoz
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${stat.color} p-5 backdrop-blur-xl`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`mt-1 font-bold text-foreground ${stat.isLarge ? "text-lg" : "text-2xl"}`}>
                  {stat.value}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/50">
                <stat.icon className="h-6 w-6 text-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Mijoz qidirish..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border p-1">
            <button
              onClick={() => setView("grid")}
              className={`rounded-md p-1.5 ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-md p-1.5 ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className={view === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
        {clients.map((client) =>
          view === "grid" ? (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedClient(client)
                }
              }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-xl transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
                    {client.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{client.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < client.rating ? "fill-chart-4 text-chart-4" : "text-muted"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{client.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{client.projects}</p>
                  <p className="text-xs text-muted-foreground">Loyihalar</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">{formatMoney(client.totalRevenue)}</p>
                  <p className="text-xs text-muted-foreground">Daromad</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${client.status === "active" ? "bg-chart-2/10 text-chart-2" : "bg-muted text-muted-foreground"
                    }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${client.status === "active" ? "bg-chart-2" : "bg-muted-foreground"}`}
                  />
                  {client.status === "active" ? "Faol" : "Nofaol"}
                </span>
                <span className="text-xs text-muted-foreground">
                  So'nggi: {new Date(client.lastContact).toLocaleDateString("uz-UZ")}
                </span>
              </div>
            </div>
          ) : (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedClient(client)
                }
              }}
              className="group cursor-pointer flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl transition-all hover:shadow-lg hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-lg font-bold text-primary-foreground">
                {client.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{client.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {client.contact} | {client.type}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">{client.projects}</p>
                  <p className="text-xs text-muted-foreground">Loyiha</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">{formatMoney(client.totalRevenue)}</p>
                  <p className="text-xs text-muted-foreground">Daromad</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < client.rating ? "fill-chart-4 text-chart-4" : "text-muted"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      {/* New Client Modal */}
      {showNewClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Yangi mijoz</h2>
              <button onClick={() => setShowNewClient(false)} className="rounded-lg p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label htmlFor="client-name" className="text-sm font-medium">Kompaniya/Ism</label>
                  <input id="client-name" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label htmlFor="client-contact" className="text-sm font-medium">Aloqa shaxsi</label>
                  <input id="client-contact" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label htmlFor="client-type" className="text-sm font-medium">Turi</label>
                  <select id="client-type" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Kompaniya</option>
                    <option>Jismoniy shaxs</option>
                    <option>StartUp</option>
                    <option>Bank</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="client-email" className="text-sm font-medium">Email</label>
                  <input
                    id="client-email"
                    type="email"
                    className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="client-phone" className="text-sm font-medium">Telefon</label>
                  <input
                    id="client-phone"
                    type="tel"
                    className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="client-address" className="text-sm font-medium">Manzil</label>
                  <input id="client-address" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => setShowNewClient(false)}>
                Mijozni qo'shish
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Client Profile Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh] overflow-auto">
            <div className="relative h-32 bg-gradient-to-r from-primary to-primary/70">
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-4 right-4 rounded-lg p-2 bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 pb-6">
              <div className="-mt-12 flex items-end gap-4 mb-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-3xl font-bold text-primary-foreground border-4 border-card shadow-xl">
                  {selectedClient.avatar}
                </div>
                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-foreground">{selectedClient.name}</h2>
                  <p className="text-muted-foreground">{selectedClient.type}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Kontakt ma'lumotlari</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient.contact}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Statistika</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-muted/50 p-4 text-center">
                      <p className="text-2xl font-bold text-foreground">{selectedClient.projects}</p>
                      <p className="text-xs text-muted-foreground">Loyihalar</p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-4 text-center">
                      <p className="text-lg font-bold text-foreground">{formatMoney(selectedClient.totalRevenue)}</p>
                      <p className="text-xs text-muted-foreground">Umumiy daromad</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Reyting:</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < selectedClient.rating ? "fill-chart-4 text-chart-4" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="flex-1 gap-2">
                  <Mail className="h-4 w-4" />
                  Email yuborish
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Phone className="h-4 w-4" />
                  Qo'ng'iroq qilish
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
