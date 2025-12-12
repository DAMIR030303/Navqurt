# Hissa Qo'shish Qo'llanmasi

AI Boshqaruv loyihasiga hissa qo'shganingiz uchun tashakkur! Bu qo'llanma sizga loyihaga qanday hissa qo'shishni ko'rsatadi.

## Kod Yozish Standartlari

### TypeScript

- Barcha fayllar TypeScript'da yozilishi kerak
- `strict` mode yoqilgan
- Har bir funksiya va komponent uchun type'lar aniqlashtirilishi kerak
- `any` type'dan foydalanishdan qoching

### ESLint Qoidalari

- Barcha kod ESLint qoidalariga mos kelishi kerak
- Import tartibi: React → Next.js → Component'lar (alfavit tartibida)
- Unused variables ishlatilmasligi kerak
- Accessibility (a11y) qoidalariga rioya qilish kerak

### Kod Formatlash

- Prettier ishlatiladi (avtomatik formatlash)
- 2 space indent
- Single quotes
- Semicolon ishlatilmaydi

## Branch Strategiyasi

1. **Main branch** - Production-ready kod
2. **Develop branch** - Development kod
3. **Feature branches** - `feature/nomi` formatida
4. **Bugfix branches** - `bugfix/nomi` formatida
5. **Hotfix branches** - `hotfix/nomi` formatida

## Commit Message Formatlari

Conventional Commits formatidan foydalaning:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type'lar:

- `feat`: Yangi funksiya
- `fix`: Bug fix
- `docs`: Dokumentatsiya o'zgarishlari
- `style`: Formatlash (kod o'zgartirmasdan)
- `refactor`: Kod refactoring
- `test`: Test qo'shish
- `chore`: Build jarayonlari yoki utility o'zgarishlari

### Misollar:

```
feat(employees): xodimlar ro'yxatiga qidiruv qo'shish

Xodimlar bo'limiga real-time qidiruv funksiyasi qo'shildi.
Filtrlar va sortlash imkoniyatlari ham qo'shildi.

Closes #123
```

```
fix(auth): login sahifasidagi xatoni tuzatish

Login sahifasida company_id tekshiruvi to'g'ri ishlamayotgan edi.
Bu xato tuzatildi.

Fixes #456
```

## Pull Request Jarayoni

1. **Fork qiling** - GitHub'da loyihani fork qiling
2. **Branch yarating** - `feature/yangi-funksiya` formatida
3. **Kod yozing** - Barcha standartlarga rioya qiling
4. **Test qiling** - `pnpm test` va `pnpm lint` ishga tushiring
5. **Commit qiling** - Conventional Commits formatida
6. **Push qiling** - Branch'ni GitHub'ga push qiling
7. **PR oching** - Pull Request oching va tavsif yozing

### PR Tavsifi

Har bir PR quyidagilarni o'z ichiga olishi kerak:

- **Nima qo'shildi/o'zgartirildi?** - Qisqa tavsif
- **Nima uchun?** - Muammo yoki ehtiyoj
- **Qanday test qilindi?** - Test qadamlari
- **Screenshots** (agar UI o'zgargan bo'lsa)
- **Related issues** - `Closes #123` formatida

## Test Qo'llanmasi

### Unit Testlar

```bash
pnpm test
```

### E2E Testlar

```bash
pnpm test:e2e
```

### Lint Tekshiruvi

```bash
pnpm lint
```

### Type Check

```bash
pnpm typecheck
```

## Kod Review Jarayoni

1. Barcha PR'lar review qilinadi
2. Kamida 1 ta approval kerak
3. CI/CD testlar o'tishi kerak
4. Code coverage 80% dan yuqori bo'lishi kerak

## Savollar?

Agar savollaringiz bo'lsa:

- GitHub Issues oching
- Telegram: [@ai_boshqaruv](https://t.me/ai_boshqaruv)
- Email: support@ai-boshqaruv.uz

## Kod Yozish Misollari

### Komponent Yaratish

```typescript
"use client"

import { useState } from "react"

interface MyComponentProps {
  title: string
  onAction: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction} disabled={isLoading}>
        Amalni bajarish
      </button>
    </div>
  )
}
```

### API Route Yaratish

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Logic here
    return NextResponse.json({ data: [] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Xato yuz berdi' },
      { status: 500 }
    )
  }
}
```

## Yana bir bor tashakkur!

Sizning hissangiz loyihani yanada yaxshilaydi. Keling, birgalikda AI Boshqaruv'ni eng yaxshi xodimlar boshqaruvi tizimiga aylantiramiz!
