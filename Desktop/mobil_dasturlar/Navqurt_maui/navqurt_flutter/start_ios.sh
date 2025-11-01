#!/bin/bash
# NavQurut iOS'da ishga tushirish scripti
# Eslatma: iOS development uchun macOS va Xcode kerak!

set -e

echo "🍎 NavQurut iOS'da ishga tushirilmoqda..."
echo ""
echo "⚠️  Eslatma: Bu script macOS'da ishlaydi!"
echo "   iOS development uchun Xcode va CocoaPods kerak."
echo ""

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

# iOS papkasi mavjudligini tekshirish
if [ ! -d "ios" ]; then
    echo "❌ Xato: ios papkasi topilmadi!"
    echo "   Flutter create --platforms=ios . buyrug'ini ishlating."
    exit 1
fi

echo "✅ iOS papkasi topildi"

# Xcode mavjudligini tekshirish
if ! command -v xcodebuild &> /dev/null; then
    echo "⚠️  Xcode topilmadi!"
    echo "   App Store'dan Xcode'ni o'rnating."
    exit 1
fi

echo "✅ Xcode topildi"

# CocoaPods mavjudligini tekshirish
if ! command -v pod &> /dev/null; then
    echo "⚠️  CocoaPods topilmadi!"
    echo "   Quyidagi buyruqni ishlating:"
    echo "   sudo gem install cocoapods"
    exit 1
fi

echo "✅ CocoaPods topildi"

# CocoaPods dependencies ni o'rnatish
echo ""
echo "📦 CocoaPods dependencies o'rnatilmoqda..."
cd ios
pod install
cd ..

echo ""
echo "📱 Mavjud iOS simulatorlar:"
xcrun simctl list devices available | grep -E "iPhone|iPad" | head -10

# iOS simulator'ni tanlash
SIMULATOR="${1:-iPhone 15 Pro}"
echo ""
echo "📱 Tanlangan simulator: $SIMULATOR"

# Flutter dependencies ni tekshirish
echo ""
echo "📦 Flutter dependencies tekshirilmoqda..."
flutter pub get

# Flutter ilovasini ishga tushirish
echo ""
echo "🎯 Flutter ilovasi iOS simulator'da ishga tushirilmoqda..."
echo ""

# iOS simulator'ni ishga tushirish
if ! xcrun simctl list devices | grep -q "$SIMULATOR"; then
    echo "⚠️  Simulator topilmadi: $SIMULATOR"
    echo "   Mavjud simulatorlarni ko'rish: xcrun simctl list devices"
    SIMULATOR=$(xcrun simctl list devices available | grep -i "iphone" | head -1 | awk -F'[()]' '{print $1}' | xargs)
    echo "   Tanlangan: $SIMULATOR"
fi

flutter run -d ios

