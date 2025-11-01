# NavQurut Flutter Mini App

NavQurut mahsulotlari uchun Flutter mobil ilovasi - **Arch Linux'da to'liq ishlaydi!** 🎉

## 🎯 Xususiyatlar

- 📦 **Mahsulotlar ro'yxati** - Barcha NavQurut mahsulotlari
- 🖼️ **Mahsulot rasmlari** - Har bir mahsulot uchun rasm
- 💰 **Narxlar** - To'g'ri formatlangan narxlar
- 🛒 **Buyurtma tugmasi** - Bir bosishda buyurtma berish
- 🌐 **i18n** - O'zbek, Rus, Ingliz tillar qo'llab-quvvatlash
- 📱 **Responsive dizayn** - Barcha ekran o'lchamlari uchun
- 🎨 **Zamonaviy UI** - Material Design 3

## 🧱 Tuzilishi

```
navqurt_flutter/
├── lib/
│   ├── main.dart                 # Asosiy fayl
│   ├── models/                   # Data modellar
│   │   └── product.dart
│   ├── screens/                 # Ekranlar
│   │   └── product_list_screen.dart
│   ├── widgets/                 # Reusable widget'lar
│   │   └── product_card.dart
│   ├── services/                # API, Data servislar
│   │   └── product_service.dart
│   └── providers/               # State management
│       └── language_provider.dart
├── assets/
│   ├── images/
│   └── fonts/
└── test/
```

## 🚀 Ishga tushirish

### Variant 1: Script orqali (Tavsiya etiladi)

**Linux Desktop:**
```bash
cd /home/damir/Desktop/mobil_dasturlar/Navqurt_maui/navqurt_flutter
./start_linux.sh
```

**Android:**
```bash
cd /home/damir/Desktop/mobil_dasturlar/Navqurt_maui/navqurt_flutter
./start_android.sh [AVD_NAME]
# Masalan:
./start_android.sh MAUI_Pixel5_API34
# yoki
./start_android.sh flutter_android_34
```

### Variant 2: Qo'lda

**Linux Desktop:**
```bash
cd /home/damir/Desktop/mobil_dasturlar/Navqurt_maui/navqurt_flutter
export PATH="$HOME/flutter/bin:$PATH"
flutter run -d linux
```

**Android:**
```bash
# Emulyatorni ishga tushirish
export ANDROID_AVD_HOME=$HOME/.config/.android/avd
$ANDROID_HOME/emulator/emulator -avd MAUI_Pixel5_API34 &

# Emulyator yuklanishini kutish
adb wait-for-device
sleep 5

# Flutter ilovasini ishga tushirish
cd /home/damir/Desktop/mobil_dasturlar/Navqurt_maui/navqurt_flutter
export PATH="$HOME/flutter/bin:$PATH"
flutter run -d android
```

**Batafsil yo'riqnoma:** `RUN_GUIDE.md` faylini o'qing.

## 📱 Platforma qo'llab-quvvatlash

| Platform | Status |
|----------|--------|
| Linux Desktop | ✅ To'liq |
| Android | ✅ To'liq |
| Android Emulator | ✅ To'liq |

## 🛠️ Texnologiyalar

- **Flutter:** 3.35.7
- **Dart:** 3.9.2
- **Provider:** State management
- **Material Design:** 3
- **intl:** Internationalization

## 🌐 Til o'zgartirish

Ilova ichida AppBar'dagi 🌐 ikonka orqali tilni o'zgartirishingiz mumkin:
- 🇺🇿 O'zbek
- 🇷🇺 Русский
- 🇬🇧 English

## 📦 Mahsulotlar

Hozirgi vaqtda 4 ta mahsulot mavjud:

1. **NavQurut Classic** - 25,000 so'm
2. **NavQurut Premium** - 35,000 so'm
3. **NavQurut Mini** - 15,000 so'm
4. **NavQurut Family** - 50,000 so'm

Mahsulotlar `lib/services/product_service.dart` faylida mock data sifatida saqlangan.

## 🔧 O'zgartirishlar

### Yangi mahsulot qo'shish

`lib/services/product_service.dart` fayliga yangi `Product` qo'shing:

```dart
Product(
  id: '5',
  name: 'Yangi mahsulot',
  nameRu: 'Новый продукт',
  nameEn: 'New Product',
  // ...
)
```

### Dizaynni o'zgartirish

- **Ranglar:** `lib/main.dart` da `ColorScheme` o'zgartiring
- **Fontlar:** `pubspec.yaml` ga font qo'shing
- **Widget'lar:** `lib/widgets/` papkasida

## 📊 Build

### Android APK yaratish

```bash
flutter build apk --release
```

### Linux App yaratish

```bash
flutter build linux --release
```

## 🧪 Test qilish

```bash
flutter test
flutter analyze
```

## 📝 Keyingi qadamlar

- [ ] Real API integratsiyasi
- [ ] Savat (Cart) funksiyasi
- [ ] Mahsulot detallari ekrani
- [ ] Foydalanuvchi profili
- [ ] Buyurtmalar tarixi
- [ ] Push notification'lar
- [ ] Local storage (SharedPreferences)

## 🎉 Natija

NavQurut mini app **to'liq tayyor** va Arch Linux'da ishlaydi!
