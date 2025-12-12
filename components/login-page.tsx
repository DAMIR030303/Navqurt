"use client"

import { Eye, EyeOff, Lock, Mail, Sparkles, Shield, Users, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react"
import React, { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginPageProps {
  onLogin: () => void
  redirectPath?: string
}

export function LoginPage({ onLogin, redirectPath }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Load remembered email on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('remember_email')
      if (rememberedEmail) {
        setEmail(rememberedEmail)
        setRememberMe(true)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !password) {
      setError("Iltimos, email va parolni kiriting")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      let data
      try {
        data = await response.json()
      } catch (parseErr) {
        setError('Server javobini o\'qib bo\'lmadi')
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        setError(data.error || 'Login xatosi')
        setIsLoading(false)
        return
      }

      // Save token and user info
      if (typeof window !== 'undefined') {
        if (data.token) {
          localStorage.setItem('auth_token', data.token)
        }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
          
          // Check company_id and redirect accordingly
          const NAVOIYDA_BUGUN_COMPANY_ID = 1
          if (data.user.company_id === NAVOIYDA_BUGUN_COMPANY_ID) {
            // Redirect to Navoiyda Bugun dashboard
            if (rememberMe) {
              localStorage.setItem('remember_email', email)
            }
            window.location.href = '/navoiyda-bugun'
            return
          }
        }
        if (rememberMe) {
          localStorage.setItem('remember_email', email)
        }
      }

      // Success - call onLogin callback (for non-Navoiyda Bugun users)
      onLogin()
    } catch (err) {
      // Network error - try to use demo mode
      console.error('Login error:', err)
      // For Navoiyda Bugun, allow demo login
      if (email === 'navoiyda@bugun.uz') {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', 'demo-token')
          localStorage.setItem('user', JSON.stringify({
            id: 1,
            email: 'navoiyda@bugun.uz',
            name: 'Navoiyda Bugun Admin',
            role: 'admin',
            company_id: 1,
          }))
          window.location.href = '/navoiyda-bugun'
          return
        }
      }
      setError('Server bilan bog\'lanishda xato yuz berdi. Iltimos, qayta urinib ko\'ring.')
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: Users,
      title: "Xodimlarni boshqarish",
      description: "Barcha xodimlarni bir joydan nazorat qiling",
    },
    {
      icon: BarChart3,
      title: "Hisobotlar va tahlil",
      description: "Real vaqtda statistika va tahlillar",
    },
    {
      icon: Shield,
      title: "Xavfsiz platforma",
      description: "Ma'lumotlaringiz ishonchli himoyada",
    },
  ]

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 relative">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-chart-4/10 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/30">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Boshqaruv</h1>
              <p className="text-xs text-muted-foreground">Xodimlarni boshqarish tizimi</p>
            </div>
          </div>

          {/* Welcome text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Xush kelibsiz!</h2>
            <p className="mt-2 text-muted-foreground">Davom etish uchun hisobingizga kiring</p>
            <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Navoiyda Bugun kanali uchun:</p>
              <p className="text-sm font-medium text-foreground">Email: navoiyda@bugun.uz</p>
              <p className="text-sm font-medium text-foreground">Parol: navoiyda2024</p>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email manzil
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="sizning@email.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-card border-border/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Parol
                </Label>
                <button type="button" aria-label="Parolni tiklash" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Parolni unutdingizmi?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Parolingizni kiriting"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-card border-border/50 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Meni eslab qol
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-base font-medium"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Kirish...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Kirish
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">yoki</span>
            </div>
          </div>

          {/* Demo access */}
          <Button
            type="button"
            variant="outline"
            onClick={onLogin}
            className="w-full h-12 border-border/50 hover:bg-card hover:border-primary/50 transition-all bg-transparent"
          >
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            Demo rejimida kirish
          </Button>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Hisobingiz yo'qmi?{" "}
            <button aria-label="Ro'yxatdan o'tish" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Ro'yxatdan o'ting
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Features showcase */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary/10 via-background to-chart-4/10 p-12 xl:p-16 items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-chart-4/20 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-chart-2/10 blur-3xl animate-pulse delay-500" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-lg">
          {/* Main illustration card */}
          <div className="relative mb-8">
            <div className="glass-card rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-chart-4 shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">AI Boshqaruv</h3>
                  <p className="text-muted-foreground">Zamonaviy boshqaruv tizimi</p>
                </div>
              </div>

              {/* Stats preview */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-xl bg-background/50">
                  <p className="text-2xl font-bold text-primary">250+</p>
                  <p className="text-xs text-muted-foreground">Xodimlar</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/50">
                  <p className="text-2xl font-bold text-chart-2">95%</p>
                  <p className="text-xs text-muted-foreground">Davomat</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/50">
                  <p className="text-2xl font-bold text-chart-3">120</p>
                  <p className="text-xs text-muted-foreground">Vazifalar</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Oylik samaradorlik</span>
                  <span className="text-foreground font-medium">87%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-background/50 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full transition-all duration-1000"
                    style={{ width: "87%" }}
                  />
                </div>
              </div>
            </div>

            {/* Floating notification card */}
            <div className="absolute -right-4 -bottom-4 glass-card rounded-xl p-4 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-chart-2/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Yangi xodim qo'shildi</p>
                  <p className="text-xs text-muted-foreground">Hozirgina</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-background/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>256-bit SSL shifrlash bilan himoyalangan</span>
          </div>
        </div>
      </div>
    </div>
  )
}
