# NavQurut - Ishga tushirish yo'riqnomasi

## ✅ Mavjud Android Emulyatorlar

Quyidagi AVD'lar mavjud:
- `MAUI_Pixel5_API34`
- `flutter_android_34`

## 🚀 Linux Desktop'da ishga tushirish (Eng oson)

```bash
cd /home/damir/Desktop/mobil_dasturlar/Navqurt_maui/navqurt_flutter
export PATH="$HOME/flutter/bin:$PATH"
flutter run -d linux
```

## 📱 Android'da ishga tushirish

### Variant 1: Flutter orqali avtomatik

```bash
cd /home/damir/Desktop/mobil_dasturlar/Navqurt_maui/navqurt_flutter
export PATH="$HOME/flutter/bin:$PATH"

# Emulyator ro'yxatini ko'rish
$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager list avd

# Emulyatorni to'g'ri papkadan ishga tushirish
$ANDROID_HOME/emulator/emulator -avd MAUI_Pixel5_API34 &
# Yoki
$ANDROID_HOME/emulator/emulator -avd flutter_android_34 &

# Bir necha soniya kutish (emulyator yuklanishini kutish)
sleep 10

# Flutter ilovasini ishga tushirish
flutter run -d android
```

### Variant 2: To'g'ri AVD papkasidan

AVD papkasi: `/home/damir/.config/.android/avd/`

```bash
# Emulyatorni to'liq yo'l bilan ishga tushirish
$ANDROID_HOME/emulator/emulator \
  -avd @MAUI_Pixel5_API34 \
  -avd-path /home/damir/.config/.android/avd &
```

### Variant 3: ANDROID_AVD_HOME o'zgartirish

```bash
# Environment variable o'rnatish
export ANDROID_AVD_HOME=$HOME/.config/.android/avd

# Keyin emulyatorni ishga tushirish
$ANDROID_HOME/emulator/emulator -avd MAUI_Pixel5_API34 &

# Flutter ilovasini ishga tushirish
cd /home/damir/Desktop/mobil_dasturlar/Navqurt_maui/navqurt_flutter
export PATH="$HOME/flutter/bin:$PATH"
flutter run -d android
```

## 🔍 Qurilmalarni tekshirish

```bash
# Flutter qurilmalarini ko'rish
flutter devices

# ADB qurilmalarini ko'rish
adb devices

# Emulyatorlarni ko'rish
flutter emulators
```

## ⚠️ Muammolar va yechimlar

### Muammo: "Unknown AVD name"

**Yechim 1:** To'liq yo'l bilan:
```bash
$ANDROID_HOME/emulator/emulator \
  -avd @MAUI_Pixel5_API34 \
  -avd-path $HOME/.config/.android/avd
```

**Yechim 2:** ANDROID_AVD_HOME o'rnatish:
```bash
export ANDROID_AVD_HOME=$HOME/.config/.android/avd
```

### Muammo: "No pubspec.yaml file found"

**Yechim:** To'g'ri papkada ekanligingizni tekshiring:
```bash
cd /home/damir/Desktop/mobil_dasturlar/Navqurt_maui/navqurt_flutter
pwd  # Papka yo'lini ko'rish
ls pubspec.yaml  # Fayl mavjudligini tekshirish
```

### Muammo: "No supported devices found"

**Yechim 1:** Emulyator ishlab turganini tekshiring:
```bash
adb devices
```

**Yechim 2:** Emulyatorni qayta ishga tushiring va kutib turing:
```bash
$ANDROID_HOME/emulator/emulator -avd MAUI_Pixel5_API34 &
adb wait-for-device
flutter devices
```

## 📝 Tezkor start script

Quyidagi script yaratishingiz mumkin:

```bash
#!/bin/bash
# start_navqurt.sh

cd /home/damir/Desktop/mobil_dasturlar/Navqurt_maui/navqurt_flutter
export PATH="$HOME/flutter/bin:$PATH"

# Android emulyatorni ishga tushirish
export ANDROID_AVD_HOME=$HOME/.config/.android/avd
$ANDROID_HOME/emulator/emulator -avd MAUI_Pixel5_API34 &

# Emulyator yuklanishini kutish
echo "Emulyator yuklanmoqda..."
adb wait-for-device
sleep 5

# Flutter ilovasini ishga tushirish
flutter run -d android
```

## 🎯 Tavsiya

**Linux Desktop** ishlatish eng oson va tez:
```bash
flutter run -d linux
```

Android'da test qilish uchun yuqoridagi yo'riqnomalarni qo'llang.

