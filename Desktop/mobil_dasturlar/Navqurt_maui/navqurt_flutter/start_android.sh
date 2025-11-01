#!/bin/bash
# NavQurut Android'da ishga tushirish scripti

set -e

echo "🚀 NavQurut Android'da ishga tushirilmoqda..."

# PATH ni o'rnatish
export PATH="$HOME/flutter/bin:$PATH"
export ANDROID_AVD_HOME=$HOME/.config/.android/avd

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

# Mavjud AVD'larni ko'rsatish
echo ""
echo "📱 Mavjud Android emulyatorlar:"
$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager list avd | grep "Name:" | sed 's/.*Name: //'

# AVD nomini tanlash
AVD_NAME="${1:-MAUI_Pixel5_API34}"
echo ""
echo "📱 Tanlangan AVD: $AVD_NAME"

# Emulyator allaqachon ishlayaptimi?
if adb devices | grep -q "emulator"; then
    echo "✅ Emulyator allaqachon ishlayapti"
else
    echo "🔄 Emulyator ishga tushirilmoqda..."
    $ANDROID_HOME/emulator/emulator -avd "$AVD_NAME" > /dev/null 2>&1 &
    EMULATOR_PID=$!
    
    # Emulyator yuklanishini kutish
    echo "⏳ Emulyator yuklanishi kutilmoqda..."
    timeout=60
    elapsed=0
    while [ $elapsed -lt $timeout ]; do
        if adb devices | grep -q "device$"; then
            echo "✅ Emulyator tayyor!"
            break
        fi
        sleep 2
        elapsed=$((elapsed + 2))
        echo "   ... kutilyapti ($elapsed/$timeout soniya)"
    done
    
    if [ $elapsed -ge $timeout ]; then
        echo "⚠️  Emulyator yuklanishi uzoq davom etdi. Davom etamiz..."
    fi
fi

# Bir necha soniya qo'shimcha kutish
sleep 3

# Flutter ilovasini ishga tushirish
echo ""
echo "🎯 Flutter ilovasi ishga tushirilmoqda..."
echo ""

flutter run -d android

