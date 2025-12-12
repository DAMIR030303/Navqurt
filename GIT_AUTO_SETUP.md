# Git Avtomatik Push Setup Guide

## 🚀 Avtomatik Yuklash Usullari

Loyiha **GitHub'ga avtomatik yuklash** uchun ikkita usul bilan sozlangan:

### 1️⃣ **GitHub Actions (Cloud)**

Har qachon siz `main` branch'ga push qilsangiz, GitHub Actions avtomatik ravishda:
- ✅ Kodni tekshiradi (lint, type check)
- ✅ Testlarni ishlantiradi
- ✅ Build qiladi
- ✅ Deployment tayorlaydi

**Fayl**: `.github/workflows/`
- `ci-cd.yml` - Barcha test va build
- `auto-push.yml` - Avtomatik push

**Sozlash:**
```bash
# GitHub'da repo settings'ga o'ting
# Actions → General → Read and write permissions
```

### 2️⃣ **Git Hooks (Local)**

Sizning kompyuteringizda har qachon commit qilsangiz:
- ✅ Pre-commit: Linter, TypeScript check, testlar ishladi
- ✅ Post-commit: Main branch'ga avtomatik push

**Fayl**: `.git/hooks/`
- `pre-commit` - Commit oldin tekshiruv
- `post-commit` - Commit'dan keyingi push

**Avtomatik setup:**
```bash
# Hooks'lar allaqachon install qilingan!
chmod +x .git/hooks/pre-commit .git/hooks/post-commit
```

## 📋 Foydalanish

### Birinchi marta setup:
```bash
# Barcha o'rnatish'larni tekshiring
cd /home/damir/Cursor/Ai_Boshqaruv
git status
```

### Har kuni:
```bash
# O'zgarishlari qo'shish
git add .

# Commit qilish (avtomatik test + push)
git commit -m "feat: new feature"

# Post-commit hook avtomatik push qiladi
```

### Push vaqtida serverdan error bo'lsa:
```bash
# Qo'lda push qiling
git push origin main

# Yoki pull-push:
git pull origin main
git push origin main
```

## ✅ Status Check

```bash
# Git hooks status
ls -la .git/hooks/

# GitHub Actions workflows
ls -la .github/workflows/

# Log ko'rish
git log --oneline -5
```

## 🔧 Customize qilish

### Pre-commit script'ni o'zgartirish:
```bash
nano .git/hooks/pre-commit
```

### GitHub Actions workflow'ni o'zgartirish:
```bash
nano .github/workflows/ci-cd.yml
```

---

**Yaraqlandi!** 🎉 Endi har qachon commit qilsangiz, avtomatik:
1. Testlar ishlaydi
2. Build qiladi
3. GitHub'ga push qiladi
