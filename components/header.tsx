"use client"

import { Bell, Search, Menu, Sun, Moon, Command, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  onMenuClick: () => void
  isDark: boolean
  onThemeToggle: () => void
}

export function Header({ onMenuClick, isDark, onThemeToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden hover:bg-secondary" 
          onClick={onMenuClick}
          aria-label="Menyuni ochish"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menyuni ochish</span>
        </Button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Qidirish..."
            className="w-64 rounded-xl border-border/50 bg-secondary/50 pl-10 pr-20 transition-all focus:w-80 focus:bg-secondary focus-visible:ring-1 focus-visible:ring-primary/50 lg:w-72"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md bg-muted/80 px-1.5 py-0.5">
            <Command className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">K</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1.5">
        {/* Mobile search */}
        <Button variant="ghost" size="icon" className="md:hidden rounded-xl hover:bg-secondary">
          <Search className="h-5 w-5" />
          <span className="sr-only">Qidirish</span>
        </Button>

        {/* AI Assistant button */}
        <Button variant="ghost" size="icon" className="hidden rounded-xl hover:bg-secondary sm:flex">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="sr-only">AI yordamchi</span>
        </Button>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={onThemeToggle} className="rounded-xl hover:bg-secondary">
          {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Mavzuni almashtirish</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-secondary">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
              <span className="sr-only">Bildirishnomalar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl p-0 overflow-hidden">
            <DropdownMenuLabel className="bg-secondary/50 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Bildirishnomalar</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">3 yangi</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="m-0" />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="flex items-start gap-3 px-4 py-3 cursor-pointer focus:bg-secondary/50">
                <div className="mt-0.5 h-9 w-9 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📋</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">Yangi ta'til so'rovi</p>
                  <p className="text-xs text-muted-foreground">Sarvar 20-22 dekabr kunlari ta'til so'radi</p>
                  <p className="text-[10px] text-muted-foreground">2 daqiqa oldin</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-start gap-3 px-4 py-3 cursor-pointer focus:bg-secondary/50">
                <div className="mt-0.5 h-9 w-9 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✅</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">Vazifa bajarildi</p>
                  <p className="text-xs text-muted-foreground">Oylik hisobot topshirildi</p>
                  <p className="text-[10px] text-muted-foreground">15 daqiqa oldin</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-start gap-3 px-4 py-3 cursor-pointer focus:bg-secondary/50">
                <div className="mt-0.5 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📅</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">Smena eslatmasi</p>
                  <p className="text-xs text-muted-foreground">Ertaga ertalabki smenada 5 xodim</p>
                  <p className="text-[10px] text-muted-foreground">1 soat oldin</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="m-0" />
            <div className="p-2">
              <Button variant="ghost" className="w-full rounded-lg text-primary hover:text-primary hover:bg-primary/10">
                Barcha bildirishnomalarni ko'rish
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 rounded-xl px-2 hover:bg-secondary">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md shadow-primary/20">
                  <span className="text-xs font-bold text-primary-foreground">AK</span>
                </div>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium">Alisher</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Alisher Karimov</p>
                <p className="text-xs text-muted-foreground">alisher@ishoqimi.uz</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg cursor-pointer">Profil</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer">Sozlamalar</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer">Yordam</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
              Chiqish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
