#!/bin/bash
# NavQurut Linux Desktop'da ishga tushirish scripti

set -e

echo "🚀 NavQurut Linux Desktop'da ishga tushirilmoqda..."

# PATH ni o'rnatish
export PATH="$HOME/flutter/bin:$PATH"

# Loyiha papkasiga o'tish
cd "$(dirname "$0")"
echo "📁 Papka: $(pwd)"

# pubspec.yaml mavjudligini tekshirish
if [ ! -f "pubspec.yaml" ]; then
    echo "❌ Xato: pubspec.yaml topilmadi!"
    echo "   To'g'ri papkada ekanligingizni tekshiring."
    exit 1
fi

echo "✅ pubspec.yaml topildi"

# Flutter ilovasini ishga tushirish
echo ""
echo "🎯 Flutter ilovasi ishga tushirilmoqda..."
echo ""

flutter run -d linux

