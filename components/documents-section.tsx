"use client"

import {
  Search,
  LayoutGrid,
  List,
  Folder,
  FileText,
  ImageIcon,
  Video,
  File,
  Download,
  Share2,
  MoreHorizontal,
  Upload,
  FolderPlus,
  Star,
  Clock,
  X,
  HardDrive,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

const folders = [
  { id: 1, name: "Shartnomalar", files: 24, size: "156 MB", color: "bg-chart-1" },
  { id: 2, name: "Loyiha hujjatlari", files: 48, size: "312 MB", color: "bg-chart-2" },
  { id: 3, name: "Marketing materiallari", files: 86, size: "1.2 GB", color: "bg-chart-4" },
  { id: 4, name: "Moliyaviy hisobotlar", files: 32, size: "89 MB", color: "bg-primary" },
  { id: 5, name: "HR hujjatlari", files: 56, size: "245 MB", color: "bg-chart-3" },
  { id: 6, name: "Arxiv", files: 120, size: "2.1 GB", color: "bg-muted-foreground" },
]

const recentFiles = [
  {
    id: 1,
    name: "TechCorp_shartnoma_2024.pdf",
    type: "pdf",
    size: "2.4 MB",
    modified: "2024-12-09",
    folder: "Shartnomalar",
    starred: true,
  },
  {
    id: 2,
    name: "Marketing_prezentatsiya.pptx",
    type: "pptx",
    size: "15.6 MB",
    modified: "2024-12-08",
    folder: "Marketing materiallari",
    starred: false,
  },
  {
    id: 3,
    name: "Moliyaviy_hisobot_Q4.xlsx",
    type: "xlsx",
    size: "1.2 MB",
    modified: "2024-12-07",
    folder: "Moliyaviy hisobotlar",
    starred: true,
  },
  {
    id: 4,
    name: "Loyiha_taklifi.docx",
    type: "docx",
    size: "856 KB",
    modified: "2024-12-06",
    folder: "Loyiha hujjatlari",
    starred: false,
  },
  {
    id: 5,
    name: "Brend_guidelines.pdf",
    type: "pdf",
    size: "8.9 MB",
    modified: "2024-12-05",
    folder: "Marketing materiallari",
    starred: true,
  },
  {
    id: 6,
    name: "Xodim_anketa.pdf",
    type: "pdf",
    size: "124 KB",
    modified: "2024-12-04",
    folder: "HR hujjatlari",
    starred: false,
  },
  {
    id: 7,
    name: "Promo_video.mp4",
    type: "video",
    size: "256 MB",
    modified: "2024-12-03",
    folder: "Marketing materiallari",
    starred: false,
  },
  {
    id: 8,
    name: "Mahsulot_rasmlari.zip",
    type: "zip",
    size: "89 MB",
    modified: "2024-12-02",
    folder: "Marketing materiallari",
    starred: false,
  },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
    case "docx":
    case "pptx":
    case "xlsx":
      return FileText
    case "video":
    case "mp4":
      return Video
    case "image":
    case "jpg":
    case "png":
      return ImageIcon
    default:
      return File
  }
}

const getFileColor = (type: string) => {
  switch (type) {
    case "pdf":
      return "bg-red-500/10 text-red-500"
    case "docx":
      return "bg-blue-500/10 text-blue-500"
    case "pptx":
      return "bg-orange-500/10 text-orange-500"
    case "xlsx":
      return "bg-green-500/10 text-green-500"
    case "video":
    case "mp4":
      return "bg-purple-500/10 text-purple-500"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function DocumentsSection() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showUpload, setShowUpload] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "recent" | "starred">("all")

  const totalStorage = 5 // GB
  const usedStorage = 3.2 // GB
  const storagePercent = (usedStorage / totalStorage) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Hujjatlar</h1>
          <p className="mt-1 text-muted-foreground">Barcha fayl va hujjatlarni boshqaring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <FolderPlus className="h-4 w-4" />
            Yangi papka
          </Button>
          <Button
            onClick={() => setShowUpload(true)}
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25"
          >
            <Upload className="h-4 w-4" />
            Yuklash
          </Button>
        </div>
      </div>

      {/* Storage info */}
      <div className="rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <HardDrive className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Xotira hajmi</span>
              <span className="text-sm text-muted-foreground">
                {usedStorage} GB / {totalStorage} GB
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${storagePercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          {[
            { id: "all", label: "Barchasi", icon: Folder },
            { id: "recent", label: "So'nggi", icon: Clock },
            { id: "starred", label: "Sevimlilar", icon: Star },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Fayl qidirish..."
              className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
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

      {activeTab === "all" && (
        <>
          {/* Folders */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Papkalar</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="group cursor-pointer rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-xl transition-all hover:shadow-xl hover:border-primary/30"
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${folder.color}`}>
                      <Folder className="h-6 w-6 text-white" />
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 rounded-lg p-1.5 hover:bg-muted transition-all">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{folder.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {folder.files} ta fayl • {folder.size}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent files */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">So'nggi fayllar</h2>
            {view === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {recentFiles.slice(0, 8).map((file) => {
                  const FileIcon = getFileIcon(file.type)
                  return (
                    <div
                      key={file.id}
                      className="group cursor-pointer rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl transition-all hover:shadow-xl hover:border-primary/30"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${getFileColor(file.type)}`}
                        >
                          <FileIcon className="h-5 w-5" />
                        </div>
                        <button
                          className={`rounded-lg p-1.5 ${file.starred ? "text-chart-4" : "text-muted-foreground opacity-0 group-hover:opacity-100"} hover:bg-muted transition-all`}
                        >
                          <Star className={`h-4 w-4 ${file.starred ? "fill-current" : ""}`} />
                        </button>
                      </div>
                      <h4 className="font-medium text-foreground text-sm truncate">{file.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{file.size}</p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
                <div className="divide-y divide-border">
                  {recentFiles.map((file) => {
                    const FileIcon = getFileIcon(file.type)
                    return (
                      <div key={file.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${getFileColor(file.type)}`}
                        >
                          <FileIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.folder}</p>
                        </div>
                        <div className="hidden md:block text-sm text-muted-foreground">{file.size}</div>
                        <div className="hidden md:block text-sm text-muted-foreground">
                          {new Date(file.modified).toLocaleDateString("uz-UZ")}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            className={`rounded-lg p-2 ${file.starred ? "text-chart-4" : "text-muted-foreground"} hover:bg-muted`}
                          >
                            <Star className={`h-4 w-4 ${file.starred ? "fill-current" : ""}`} />
                          </button>
                          <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "recent" && (
        <div className="space-y-3">
          {recentFiles.map((file) => {
            const FileIcon = getFileIcon(file.type)
            return (
              <div
                key={file.id}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${getFileColor(file.type)}`}>
                  <FileIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {file.folder} • {file.size}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(file.modified).toLocaleDateString("uz-UZ")}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === "starred" && (
        <div className="space-y-3">
          {recentFiles
            .filter((f) => f.starred)
            .map((file) => {
              const FileIcon = getFileIcon(file.type)
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${getFileColor(file.type)}`}>
                    <FileIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {file.folder} • {file.size}
                    </p>
                  </div>
                  <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                </div>
              )
            })}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Fayl yuklash</h2>
              <button onClick={() => setShowUpload(false)} className="rounded-lg p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="font-medium text-foreground">Fayllarni shu yerga tashlang</p>
              <p className="text-sm text-muted-foreground mt-1">yoki kompyuterdan tanlang</p>
              <Button variant="outline" className="mt-4 bg-transparent">
                Fayl tanlash
              </Button>
            </div>
            <div className="mt-4">
              <label htmlFor="folder-select" className="text-sm font-medium">Papka tanlash</label>
              <select id="folder-select" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm">
                {folders.map((folder) => (
                  <option key={folder.id}>{folder.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
