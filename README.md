# AI Boshqaruv - Xodimlarni Boshqarish Tizimi

![AI Boshqaruv](https://img.shields.io/badge/Version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38bdf8)

**AI Boshqaruv** - bu zamonaviy korxonalar uchun to'liq xodimlar boshqaruvi, KPI monitoring, moliya va biznes jarayonlarini avtomatlashtirish tizimi.

## 📋 Mundarija

- [Umumiy ma'lumot](#umumiy-malumot)
- [Asosiy xususiyatlar](#asosiy-xususiyatlar)
- [Texnologiyalar](#texnologiyalar)
- [O'rnatish](#ornatish)
- [Ishga tushirish](#ishga-tushirish)
- [Loyiha strukturasi](#loyiha-strukturasi)
- [Modullar](#modullar)
- [Foydalanuvchi rollari](#foydalanuvchi-rollari)
- [Tarif rejalari](#tarif-rejalari)
- [Hissa qo'shish](#hissa-qoshish)
- [Litsenziya](#litsenziya)

---

## 🎯 Umumiy ma'lumot

AI Boshqaruv - bu barcha turdagi korxonalar (Marketing, Media, Advokatura, SMM, Jurnalistika, IT va boshqalar) uchun mo'ljallangan SaaS (Software as a Service) platformasi. Tizim xodimlarni boshqarish, vazifalarni taqsimlash, moliyaviy hisobotlar, KPI monitoring va boshqa ko'plab biznes jarayonlarini bir joyda boshqarishga imkon beradi.

### Maqsadli auditoriya

- **Marketing agentliklari** - mijozlar, kampaniyalar va jamoani boshqarish
- **Media kompaniyalari** - kontent rejalashtirish, muharrirlar boshqaruvi
- **Yuridik firmalar** - ishlar, mijozlar va hujjatlar boshqaruvi
- **SMM agentliklari** - kontent kalendari, ijtimoiy tarmoqlar analitikasi
- **IT kompaniyalar** - loyihalar, sprint, task management
- **Jurnalistika** - maqolalar, muharrirlar, nashr jadvali

---

## ✨ Asosiy xususiyatlar

### 🏢 Xodimlar boshqaruvi
- ✅ Xodimlarni qo'shish, tahrirlash, o'chirish
- ✅ Lavozim va bo'limlar boshqaruvi
- ✅ Profillar va shaxsiy ma'lumotlar
- ✅ Filtrlar va qidiruv tizimi

### 📊 KPI va Performance
- ✅ Shaxsiy va jamoa KPI monitoring
- ✅ Realtime progress tracking
- ✅ Metrikalar va maqsadlar belgilash
- ✅ Sohalar bo'yicha KPI shablonlari
- ✅ Bonus hisoblash avtomatikasi

### 💰 Moliya va Buxgalteriya
- ✅ Daromad va xarajatlar kuzatuvi
- ✅ Ish haqi hisoblash (asosiy + KPI + davomat)
- ✅ Tranzaksiyalar tarixi
- ✅ Moliyaviy hisobotlar va grafiklar

### 📅 Davomat va Smenalar
- ✅ Kirish-chiqish vaqtini qayd qilish
- ✅ Haftalik/kunlik ish jadvali
- ✅ Smena shablonlari
- ✅ Kechikish va qo'shimcha ishlar statistikasi

### 🎯 Vazifalar va Loyihalar
- ✅ Kanban doska (drag & drop)
- ✅ Vazifalar statuslari
- ✅ Muddat va mas'ullar
- ✅ Loyihalar bosqichlari
- ✅ Byudjet va progress tracking

### 👥 Mijozlar va CRM
- ✅ Mijozlar bazasi
- ✅ Kontaktlar va tarix
- ✅ Lead pipeline
- ✅ Faoliyatlar va follow-up

### 📈 Analitika va Hisobotlar
- ✅ Interaktiv grafiklar (Recharts)
- ✅ Daromad dinamikasi
- ✅ Top xodimlar reytingi
- ✅ Eksport (PDF, Excel)

### 💬 Kommunikatsiya
- ✅ Ichki chat (shaxsiy/guruh)
- ✅ Bildirishnomalar
- ✅ Kalendar va uchrashuvlar
- ✅ Fayl almashish

### 🔐 Xavfsizlik va Audit
- ✅ Rol asosida kirish huquqlari
- ✅ Audit Log (barcha harakatlar)
- ✅ IP va qurilma tracking
- ✅ Parol xavfsizligi

---

## 🚀 Texnologiyalar

| Texnologiya | Versiya | Tavsif |
|-------------|---------|--------|
| **Next.js** | 16.0.7 | React framework (App Router) |
| **React** | 19.2.0 | UI library |
| **TypeScript** | 5.0.2 | Type safety |
| **Tailwind CSS** | 4.1.9 | Utility-first CSS |
| **Radix UI** | Latest | Headless UI components |
| **shadcn/ui** | Latest | UI component library |
| **Lucide React** | 0.454.0 | Icon library |
| **Recharts** | 2.15.4 | Grafik kutubxonasi |
| **React Hook Form** | 7.60.0 | Form management |
| **Zod** | 3.25.76 | Schema validation |
| **next-themes** | Latest | Dark/Light mode |

---

## 📦 O'rnatish

### Talablar

- Node.js 22.x yoki yuqori
- pnpm 10.x yoki npm 10.x
- Git

### Qadamlar

1. **Repozitoriyani klonlash**

```bash
git clone https://github.com/yourusername/ai-boshqaruv.git
cd ai-boshqaruv
```

2. **Dependencies o'rnatish**

```bash
pnpm install
# yoki
npm install
```

3. **Environment o'zgaruvchilarini sozlash**

Frontend uchun:
```bash
cp .env.example .env.local
# Keyin .env.local faylini tahrirlang va kerakli qiymatlarni kiriting
```

Backend uchun:
```bash
cd backend
cp .env.example .env
# Keyin .env faylini tahrirlang va kerakli qiymatlarni kiriting
```

4. **Database o'rnatish**

PostgreSQL ishga tushirish (Docker orqali):
```bash
cd backend
docker-compose up -d postgres
```

Migration'larni ishga tushirish:
```bash
cd backend
# Migration fayllarni PostgreSQL'ga yuklash
psql -U postgres -d ai_boshqaruv -f migrations/001_initial_schema.sql
psql -U postgres -d ai_boshqaruv -f migrations/002_create_companies.sql
# ... va boshqa migration'lar
```

5. **Backend server ishga tushirish**

```bash
cd backend
go mod download
make proto  # Proto fayllarni generate qilish
go run cmd/server/main.go
```

Backend server `localhost:50051` portida ishga tushadi.

---

## 🎬 Ishga tushirish

### Development mode

```bash
pnpm dev
# yoki
npm run dev
```

Brauzerda ochish: [http://localhost:3000](http://localhost:3000)

### Production build

```bash
pnpm build
pnpm start
```

### Lint va Type checking

```bash
pnpm lint        # ESLint tekshiruvi
pnpm typecheck   # TypeScript type checking
pnpm test        # Unit testlar
pnpm test:e2e    # E2E testlar
```

### Backend Development

Backend server ishga tushirish:
```bash
cd backend
go run cmd/server/main.go
```

Proto fayllarni generate qilish:
```bash
cd backend
make proto
```

Backend testlar:
```bash
cd backend
go test ./...
```

---

## 📁 Loyiha strukturasi

```
ai-boshqaruv/
├── app/                          # Next.js 16 App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (Dashboard)
│
├── components/                   # React komponentlar
│   ├── ui/                      # shadcn/ui komponentlar
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   │
│   ├── sidebar.tsx              # Navigatsiya sidebar
│   ├── header.tsx               # Header va search
│   ├── kpi-cards.tsx            # KPI kartochkalar
│   ├── employees-section.tsx    # Xodimlar section
│   ├── tasks-section.tsx        # Vazifalar section
│   ├── finance-section.tsx      # Moliya section
│   ├── analytics-section.tsx    # Analitika section
│   ├── super-admin-section.tsx  # Super Admin panel
│   └── ...
│
├── lib/
│   └── utils.ts                 # Helper funksiyalar (cn)
│
├── public/                      # Static fayllar
│   └── ...
│
├── styles/
│   └── globals.css              # (Zarurati yo'q, app/globals.css ishlatiladi)
│
├── components.json              # shadcn/ui konfiguratsiya
├── next.config.mjs              # Next.js konfiguratsiya
├── package.json                 # Dependencies
├── postcss.config.mjs           # PostCSS konfiguratsiya
├── tsconfig.json                # TypeScript konfiguratsiya
└── README.md                    # Bu fayl
```

---

## 🧩 Modullar

### Asosiy modullar (5 ta)

| Modul | Tavsif | Funksiyalar |
|-------|--------|-------------|
| **Boshqaruv paneli** | Umumiy statistika | KPI, tezkor amallar, faoliyat lentasi |
| **Xodimlar** | Xodimlarni boshqarish | CRUD, profil, filtrlar |
| **Smenalar** | Ish jadvali | Haftalik/kunlik, shablonlar |
| **Vazifalar** | Task management | Kanban, muddat, mas'ullar |
| **Davomat** | Keldi-ketdi | Kirish/chiqish, statistika |

### Biznes modullar (7 ta)

- Loyihalar
- Mijozlar
- Moliya
- Kontent kalendari
- Hujjatlar
- Analitika
- CRM

### HR & KPI modullar (2 ta)

- KPI Boshqaruvi
- Bonus/Jarimalar

### Kommunikatsiya modullar (3 ta)

- Xabarlar
- Kalendar
- Bildirishnomalar

### Tizim modullar (4 ta)

- Hisobotlar
- Audit Log
- Rol va huquqlar
- Sozlamalar

---

## 👤 Foydalanuvchi rollari

| Rol | Huquqlar |
|-----|----------|
| **Super Admin** | Barcha korxonalarni boshqarish, tarif sozlash |
| **Korxona Admin** | O'z korxonasini to'liq boshqarish |
| **Menejer** | Bo'lim boshqaruvi, hisobotlar, vazifalar |
| **HR** | Xodimlar, davomat, bonus/jarima |
| **Buxgalter** | Moliya, ish haqi, hisobotlar |
| **Xodim** | Faqat o'z ma'lumotlari va vazifalari |

---

## 💳 Tarif rejalari

| Tarif | Narx (oylik) | Xodimlar | Modullar |
|-------|--------------|----------|----------|
| **Starter** | 500,000 so'm | 10 gacha | Asosiy 5 ta |
| **Professional** | 1,500,000 so'm | 50 gacha | 12 ta + CRM, KPI |
| **Premium** | 3,000,000 so'm | Cheksiz | Barcha + prioritet support |

---

## 🎨 UI/UX xususiyatlari

- ✅ **Dark/Light mode** - Tema almashtirish
- ✅ **Glassmorphism** - Zamonaviy shisha effektlar
- ✅ **Responsive** - Mobile-first dizayn
- ✅ **Animations** - CSS transitions va keyframes
- ✅ **Accessibility** - ARIA labels, keyboard navigation
- ✅ **Premium colors** - OKLCH rang tizimi

---

## 🧪 Maosh hisoblash formulasi

```
Jami maosh = Asosiy maosh + KPI bonus + Davomat bonus - Jarimalar

Misol:
- Asosiy maosh: 5,000,000 so'm
- KPI bonus (92% bajarildi): 5,000,000 × 15% = 750,000 so'm
- Davomat bonus (100%): 5,000,000 × 5% = 250,000 so'm
- Jarima (kechikish): -100,000 so'm
- JAMI: 5,900,000 so'm
```

---

## 🔧 Sozlamalar

### TypeScript

Loyihada TypeScript strict mode yoqilgan. Barcha komponentlar type-safe.

### Tailwind CSS 4

Yangi Tailwind CSS 4 versiyasi qo'llanilgan, PostCSS orqali ishlatiladi.

```css
@import "tailwindcss";
```

### Dark mode

Dark mode `next-themes` orqali boshqariladi. LocalStorage'da saqlanadi.

---

## 🤝 Hissa qo'shish

Hissa qo'shishni xohlaganlar uchun batafsil qo'llanma [CONTRIBUTING.md](CONTRIBUTING.md) faylida.

Qisqa qadamlar:

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. O'zgarishlarni qiling va commit qiling
4. Test qiling (`pnpm typecheck && pnpm lint && pnpm test`)
5. Push qiling (`git push origin feature/AmazingFeature`)
6. Pull Request oching

---

## 📝 Litsenziya

Bu loyiha GNU General Public License v3.0 (GPL-3.0) litsenziyasi ostida tarqatiladi.

Batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'ring.

---

## 📞 Aloqa

Savollar yoki takliflar bo'lsa:

- GitHub Issues: [Issues ochish](https://github.com/yourusername/ai-boshqaruv/issues)
- Email: support@ai-boshqaruv.uz
- Telegram: [@ai_boshqaruv](https://t.me/ai_boshqaruv)

## 📚 Qo'shimcha Ma'lumot

- [CHANGELOG.md](CHANGELOG.md) - O'zgarishlar tarixi
- [CONTRIBUTING.md](CONTRIBUTING.md) - Hissa qo'shish qo'llanmasi
- [backend/README.md](backend/README.md) - Backend dokumentatsiya

---

## 🎯 Roadmap (Kelajak rejalar)

### v1.1 (Q1 2025)
- [ ] Backend integratsiya (Supabase/Neon)
- [ ] Real-time updates (WebSocket)
- [ ] Email bildirishnomalar
- [ ] File upload tizimi

### v1.2 (Q2 2025)
- [ ] Mobil ilovalar (React Native)
- [ ] AI asistent (GPT integratsiya)
- [ ] Telegram bot
- [ ] WhatsApp integratsiya

### v2.0 (Q3 2025)
- [ ] Multi-language support
- [ ] Advanced analytics (ML)
- [ ] API uchun SDK
- [ ] White-label versiya

---

## ⭐ Star History

Agar loyiha foydali bo'lsa, GitHub'da star qo'yishni unutmang!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/ai-boshqaruv&type=Date)](https://star-history.com/#yourusername/ai-boshqaruv&Date)

---

**Ishlab chiqildi ❤️ bilan O'zbekiston uchun**
